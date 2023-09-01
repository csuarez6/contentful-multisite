import type { NextApiRequest, NextApiResponse } from 'next';
import { getCLAdminCLient, getOrderStatusCl, isExternalPayment } from '@/lib/services/commerce-layer.service';
import { getP2PRequestInformation } from '@/lib/services/place-to-pay.service';
import { sendAllyEmail, sendClientEmail, sendVantiEmail } from '@/lib/services/send-emails.service';
import { P2PRequestStatus } from '@/lib/interfaces/p2p-cf-interface';
import { getOrderByAlly } from '@/lib/services/order-by-ally.service';
import { DEFAULT_ORDER_PARAMS } from '@/lib/graphql/order.gql';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    // if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const resp = await getOrderStatusCl();
        const client = await getCLAdminCLient();
        const orderData = resp.data ?? [];
        let records = 0;
        orderData.forEach(async function (order) {
            const paymentSource = order.payment_source;
            const transactionToken = isExternalPayment(paymentSource) ? paymentSource.payment_source_token : null;
            if (!transactionToken) {
                throw new Error('Transaction token not found');
            }
            const infoP2P = await getP2PRequestInformation(transactionToken);
            console.info({ infoP2P });

            if (typeof infoP2P === 'string') {
                throw new Error(infoP2P);
            }

            const metadata = {
                medium: 'cron',
                paymentInfo: infoP2P
            };

            if (infoP2P.status.status === P2PRequestStatus.approved) {
                await client.orders.update({
                    id: order.id,
                    _approve: true,
                    _capture: true
                }, DEFAULT_ORDER_PARAMS
                ).then(async (orderUpdated) => {
                    const captures = orderUpdated.captures?.at(0);

                    await client.captures.update({
                        id: captures?.id,
                        metadata: metadata
                    });
                });
                records++;
            } else if (infoP2P.status.status === P2PRequestStatus.failed || infoP2P.status.status === P2PRequestStatus.rejected) {
                await client.orders.update({
                    id: order.id,
                    _cancel: true,
                }, DEFAULT_ORDER_PARAMS
                ).then(async (orderUpdated) => {
                    const voids = orderUpdated.voids?.at(0);

                    await client.voids.update({
                        id: voids?.id,
                        metadata: metadata
                    });
                });
                records++;
            }

            const orderByAlly = (await getOrderByAlly(order.id)).data;
            await sendClientEmail(orderByAlly);
            if (infoP2P.status.status === P2PRequestStatus.approved) {
                await sendVantiEmail(orderByAlly);
                await sendAllyEmail(orderByAlly);
            }
        });
        return res.status(200).json({ recordsNumber: orderData.length, crossRecords: records });
    } catch (e) {
        return res.status(500).json({ status: 'error', message: e.message });
    }
};

export default handler;