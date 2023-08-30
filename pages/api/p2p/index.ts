import type { NextApiRequest, NextApiResponse } from "next";
import { getCLAdminCLient, getNameQuantityOrderItems } from "@/lib/services/commerce-layer.service";
import { createP2PRequest } from "@/lib/services/place-to-pay.service";
import { IP2PFields, IP2PPayment, IP2PPerson, IP2PRequest, P2PDisplayOnFields } from "@/lib/interfaces/p2p-cf-interface";
import { getOrderByAlly } from "@/lib/services/order-by-ally.service";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const client = await getCLAdminCLient();
    const data = JSON.parse(req.body);
    const order = (await getOrderByAlly(data.orderId)).data;
    const authorization = order.authorizations[0];
    const description = getNameQuantityOrderItems(order);

    await client.orders.update({
      id: order.id,
      _place: true,
    });

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

    await client.orders.update({
      id: order.id,
      _approve: true,
    });

    await client.authorizations.update({
      id: authorization.id,
      reference: response.requestId,
      reference_origin: 'p2p'
    });

    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message || 'CAPTURE_PAYMENT_ERROR',
    });
  }
};

export default handler;
