// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { P2PRequestStatus } from "@/lib/interfaces/p2p-cf-interface";
import { getCLAdminCLient, isExternalPayment } from "@/lib/services/commerce-layer.service";
import { getOrderByAlly } from "@/lib/services/order-by-ally.service";
import { getP2PRequestInformation } from "@/lib/services/place-to-pay.service";
import { sendAllyEmail, sendClientEmail, sendVantiEmail } from "@/lib/services/send-emails.service";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const data = req.query;
    const orderId = <string>data.id;

    try {
        const client = await getCLAdminCLient();
        console.info('payment_done');

        const order = (await getOrderByAlly(orderId)).data;
        if (!order) throw new Error("INVALID_ORDER");
        const authorization = order.authorizations?.at(0);
        if (!authorization) throw new Error("INVALID_TRANSACTION");

        if (authorization.captures || authorization.voids) {
            const paymentSource = order.payment_source;
            const transactionToken = isExternalPayment(paymentSource) ? paymentSource.payment_source_token : null;

            if (transactionToken) {
                const infoP2P = await getP2PRequestInformation(transactionToken);

                if (typeof infoP2P === 'string') {
                    throw new Error(infoP2P);
                }

                const metadata = authorization.metadata.p2pPaymentDone = infoP2P;

                if (infoP2P.status.status === P2PRequestStatus.approved) {
                    console.info('approved');

                    await client.orders.update({
                        id: order.id,
                        _approve: true,
                    });

                    await client.authorizations.update({
                        id: authorization.id,
                        _capture: true,
                        metadata: metadata
                    });
                } else if (infoP2P.status.status === P2PRequestStatus.failed || infoP2P.status.status === P2PRequestStatus.rejected) {
                    console.info('failed or rejected');

                    await client.orders.update({
                        id: order.id,
                        _cancel: true,
                    });

                    await client.authorizations.update({
                        id: authorization.id,
                        _void: true,
                        metadata: metadata
                    });
                }

                console.info('emails');
                await sendClientEmail(order);

                if (infoP2P.status.status === P2PRequestStatus.approved) {
                    await sendVantiEmail(order);
                    await sendAllyEmail(order);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }

    res.redirect(307, `/checkout/pse/purchase-order/?id=${orderId}`);
};

export default handler;
