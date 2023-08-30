import { IP2PFields, IP2PPayment, IP2PPerson, IP2PRequest, IP2PRequestInformation, P2PDisplayOnFields, P2PRequestStatus } from '@/lib/interfaces/p2p-cf-interface';
import { getCLAdminCLient, getNameQuantityOrderItems, isExternalPayment } from '@/lib/services/commerce-layer.service';
import { getOrderByAlly } from '@/lib/services/order-by-ally.service';
import { createP2PRequest, getP2PRequestInformation } from '@/lib/services/place-to-pay.service';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method !== "POST") return res.status(405).json({ status: 405, message: "Method not allowed" });
    try {
        const orderId = req.body.orderId;
        const type = req.body.type;
        const cl = await getCLAdminCLient();
        const order = (await getOrderByAlly(orderId)).data;
        const authorization = order.authorizations[0];
        const paymentSource = order.payment_source;
        const transactionToken = isExternalPayment(paymentSource) ? paymentSource.payment_source_token : null;

        if (type === 'create') {
            const description = getNameQuantityOrderItems(order);

            if (!paymentSource) {
                throw new Error("Tipo de pago no soportado");
            }

            console.info(order);
            console.info(transactionToken);
            console.info(description);
            console.info(authorization);

            const payment: IP2PPayment = {
                'reference': order.id,
                'description': description,
                'amount': {
                    'currency': 'COP',
                    'total': order.total_amount_float
                }
            };

            const extraFields: IP2PFields[] = [
                {
                    'keyword': 'Número de orden',
                    'value': order.number,
                    'displayOn': P2PDisplayOnFields.both
                }
            ];

            const buyer: IP2PPerson = {
                'email': order.customer_email
            };

            const ipAddress = req.socket.remoteAddress;
            const userAgent = req.headers['user-agent'];
            const response: IP2PRequest | string = await createP2PRequest(order.id, payment, ipAddress, userAgent, extraFields, buyer);

            if (typeof response === 'string') {
                throw new Error(response);
            }

            console.info(response);

            await cl.authorizations.update({
                id: authorization.id,
                reference: response.requestId,
                reference_origin: 'p2p'
            });

            return res.status(200).json({ status: 200, data: response });
        } else {
            const response: IP2PRequestInformation | string = await getP2PRequestInformation('2455861');
            console.info(response);

            if (typeof response === 'string') {
                throw new Error(response);
            }

            if (response.status.status === P2PRequestStatus.approved) {
                await cl.authorizations.update({
                    id: authorization.id,
                    _capture: true,
                    metadata: {
                        notificationInfo: response
                    }
                });
            } else if (response.status.status === P2PRequestStatus.failed || response.status.status === P2PRequestStatus.rejected) {
                await cl.authorizations.update({
                    id: authorization.id,
                    _void: true,
                    metadata: {
                        notificationInfo: response
                    }
                });
            }

            console.info(authorization);

            return res.status(200).json({ status: 200, data: response });
        }
    } catch (error) {
        console.error("An error occurred during the execution of the endpoint p2p-test:", error);
        return res.status(500).json({ status: 500, message: "A general error has occurred" });
    }
};

export default handler;
