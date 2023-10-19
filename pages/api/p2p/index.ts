import type { NextApiRequest, NextApiResponse } from "next";
import { getCLAdminCLient, getNameQuantityOrderItems } from "@/lib/services/commerce-layer.service";
import { createP2PRequest, getP2PIdentificationType } from "@/lib/services/place-to-pay.service";
import { IP2PFields, IP2PPayment, IP2PPerson, IP2PRequest, P2PDisplayOnFields } from "@/lib/interfaces/p2p-cf-interface";
import { DEFAULT_ORDER_PARAMS } from "@/lib/graphql/order.gql";
import { sendEmails } from "@/lib/services/send-emails.service";
import { NEXT_STEP_ERROR_MSG } from "@/constants/checkout.constants";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const client = await getCLAdminCLient();
    const data = JSON.parse(req.body);
    const order = await client.orders.retrieve(data.orderId, DEFAULT_ORDER_PARAMS);
    const description = getNameQuantityOrderItems(order);

    console.info('p2p create_request', req.body);

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

    const documentType = getP2PIdentificationType(order.metadata?.documentType);

    const buyer: IP2PPerson = {
      'name': order.metadata?.name,
      'surname': order.metadata?.lastName,
      'documentType': documentType,
      'document': order.metadata?.documentNumber,
      'mobile': order.metadata?.cellPhone,
      'email': order.customer_email
    };
    const ipAddress = req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const response: IP2PRequest | string = await createP2PRequest(order.id, payment, ipAddress, userAgent, extraFields, buyer);
    
    if (typeof response === 'string') throw new Error(response);
    
    if (!response.requestId || !response.processUrl) {
      throw new Error('createP2PRequest error: ' + JSON.stringify(response));
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
      _place: true
    }, DEFAULT_ORDER_PARAMS
    ).then(async (orderUpdated) => {
      console.info('p2p create_request placed orderId: ' + order.id);
      const authorization = orderUpdated.authorizations?.at(0);
      client.authorizations.update({
        id: authorization?.id,
        metadata: response
      });
      await sendEmails(order.id, true, null, (req.headers['x-forwarded-proto'] || 'http') + '://' + req.headers['host']);
    });

    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error(error, req.body);
    return res.status(500).json(NEXT_STEP_ERROR_MSG);
  }
};

export default handler;
