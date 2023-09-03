import { PaymentStatus } from '@/lib/enum/EPaymentStatus.enum';
import { DEFAULT_ORDER_PARAMS } from '@/lib/graphql/order.gql';
import { IP2PFields, IP2PPayment, IP2PPerson, IP2PRequest, IP2PRequestInformation, P2PDisplayOnFields, P2PRequestStatus } from '@/lib/interfaces/p2p-cf-interface';
import { getCLAdminCLient, getNameQuantityOrderItems, isExternalPayment } from '@/lib/services/commerce-layer.service';
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
        const client = await getCLAdminCLient();
        const order = await client.orders.retrieve(orderId, DEFAULT_ORDER_PARAMS);

        if (type === 'create') {
            const description = getNameQuantityOrderItems(order);

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
            console.info(response);

            if (typeof response === 'string') {
                throw new Error(response);
            }

            const token = response.requestId;

            await client.external_payments.create({
                payment_source_token: token,
                order: {
                    id: order.id,
                    type: "orders",
                },
            });

            await client.orders.update({
                id: order.id,
                _place: true,
            });

            const authorization = (await client.orders.retrieve(order.id)).authorizations.at(0);
            const metadata = authorization.metadata.p2pRequestResponse = response;

            await client.authorizations.update({
                id: authorization.id,
                _capture: true,
                metadata: metadata
            });

            return res.status(200).json({ status: 200, data: response });
        } else if (type === 'search') {
            const authorization = order.authorizations.at(0);
            const paymentSource = order.payment_source;
            const transactionToken = isExternalPayment(paymentSource) ? paymentSource.payment_source_token : null;

            const response: IP2PRequestInformation | string = await getP2PRequestInformation(transactionToken);

            if (typeof response === 'string') {
                throw new Error(response);
            }

            console.info('autho', authorization);

            if (order.payment_status !== PaymentStatus.paid && order.payment_status !== PaymentStatus.voided) {
                const metadata = authorization.metadata.p2pNotificationResponse = response;
    
                if (response.status.status === P2PRequestStatus.approved) {
                    await client.orders.update({
                        id: order.id,
                        _approve: true,
                    });
    
                    await client.authorizations.update({
                        id: authorization.id,
                        _capture: true,
                        metadata: metadata
                    });
                } else if (response.status.status === P2PRequestStatus.failed || response.status.status === P2PRequestStatus.rejected) {
                    await client.orders.update({
                        id: order.id,
                        _approve: true,
                    });
    
                    await client.authorizations.update({
                        id: authorization.id,
                        _void: true,
                        metadata: metadata
                    });
                }
            }
            return res.status(200).json({ status: 200, data: response });
        } else if (type === 'approved') {
            await client.orders.update({
                id: order.id,
                _approve: true,
                _capture: true
            }, DEFAULT_ORDER_PARAMS
            ).then(async (orderUpdated) => {
                const captures = orderUpdated.captures.at(0);
                console.info(captures);

                await client.captures.update({
                    id: captures.id,
                    metadata: {
                        id: 123,
                        prueba: 'test'
                    }
                });
            });
            return res.status(200).json({ status: 200, data: order.transactions });
        } else if (type === 'failed') {
            await client.orders.update({
                id: order.id,
                _cancel: true,
            }, DEFAULT_ORDER_PARAMS
            ).then(async (orderUpdated) => {
                const voids = orderUpdated.voids.at(0);
                console.info(voids);

                await client.voids.update({
                    id: voids.id,
                    metadata: {
                        id: 123,
                        prueba: 'test'
                    }
                });
            });
            return res.status(200).json({ status: 200, data: order.transactions });
        }

        console.info(order.captures.at(0)?.metadata);

        return res.status(200).json({ status: 200, data: 'ok' });
    } catch (error) {
        console.error("An error occurred during the execution of the endpoint p2p-test:", error);
        return res.status(500).json({ status: 500, message: "A general error has occurred" });
    }
};

export default handler;
