import type { NextApiResponse } from 'next';
import type { NextRequest } from 'next/server';
import { getCLAdminCLient, getOrderStatusCl, isExternalPayment } from '@/lib/services/commerce-layer.service';
import { getP2PRequestInformation } from '@/lib/services/place-to-pay.service';
import { sendEmails } from '@/lib/services/send-emails.service';
import { P2PRequestStatus } from '@/lib/interfaces/p2p-cf-interface';
import { DEFAULT_ORDER_PARAMS } from '@/lib/graphql/order.gql';
import { Order } from '@commercelayer/sdk';

const handler = async (
    req: NextRequest,
    res: NextApiResponse<any>
) => {

    try {
        const resp = await getOrderStatusCl();
        const orderData = resp.data ?? [];
        let approved = 0, canceled = 0;
        const canceledOrders = [];
        const approvedOrders = [];
        const authHeader = req.headers.get('authorization');
        console.info("authHeader ", authHeader);
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return res.status(500).json({ status: 'error', message: "Error RequestAuth" });
        }
        const promises = orderData.map(async (order) => {
            // orderData.forEach(async function (order) {
            const paymentSource = order.payment_source;
            if (paymentSource) {
                const transactionToken = isExternalPayment(paymentSource) ? paymentSource.payment_source_token : null;
                if (!transactionToken) {
                    throw new Error('Transaction token not found');
                }
                const infoP2P = await getP2PRequestInformation(transactionToken);

                if (typeof infoP2P === 'string') {
                    throw new Error(infoP2P);
                }

                const metadata = {
                    medium: 'cron',
                    paymentInfo: infoP2P
                };

                if (infoP2P.status.status === P2PRequestStatus.approved) {
                    await approveOrder(order, metadata).then(() => {
                        approved++;
                        approvedOrders.push(order.number);
                    });
                } else if (infoP2P.status.status === P2PRequestStatus.failed || infoP2P.status.status === P2PRequestStatus.rejected) {
                    await cancelOrder(order, metadata).then(() => {
                        canceled++;
                        canceledOrders.push(order.number);
                    });
                }
                await sendEmails(order.id, false, infoP2P.status.status);
            } else {
                const metadata = {
                    medium: 'cron',
                    paymentInfo: 'no payment info'
                };

                await cancelOrder(order, metadata).then(() => {
                    canceled++;
                    canceledOrders.push(order.number);
                });
                await sendEmails(order.id);
            }
        });
        await Promise.all(promises).then(() => {
            console.info("recordsNumber: ", orderData.length, " approvedOrders: ", approved, " canceledOrders: ", canceled);
            console.info("Canceled orders: ", canceledOrders);
            console.info("Approved orders: ", approvedOrders);
        });
        return res.status(200).json({ recordsNumber: orderData.length, approvedOrders: approved, canceledOrders: canceled });
    } catch (e) {
        return res.status(500).json({ status: 'error', message: e.message });
    }
};

const approveOrder = async (order: Order, metadata: any) => {
    const client = await getCLAdminCLient();

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
};

const cancelOrder = async (order: Order, metadata: any) => {
    const client = await getCLAdminCLient();

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
};

export default handler;