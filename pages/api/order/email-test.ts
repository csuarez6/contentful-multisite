import { IAllyResponse } from '@/lib/interfaces/ally-collection.interface';
import { IP2PFields, IP2PPayment, IP2PRequest, IP2PRequestInformation, P2PDisplayOnFields } from '@/lib/interfaces/p2p-cf-interface';
import { getNameQuantityOrderItems } from '@/lib/services/commerce-layer.service';
import { getOrderByAlly } from '@/lib/services/order-by-ally.service';
import { createP2PRequest, getP2PRequestInformation } from '@/lib/services/place-to-pay.service';
import { sendAllyEmail, sendClientEmail, sendVantiEmail } from '@/lib/services/send-emails.service';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IAllyResponse>
) => {
  if (req.method !== "POST") return res.status(405).json({ status: 405, message: "Method not allowed" });

  const orderId = req.body.orderId;
  const resp: IAllyResponse = await getOrderByAlly(orderId);

  try {
    let count = 0;

    if (resp.status === 200) {
      const order = resp.data;
      const description = getNameQuantityOrderItems(order);

      console.info(description);

      console.info(order);

      const payment: IP2PPayment = {
        'reference': order.id,
        'description': description,
        'amount': {
          'currency': 'COP',
          'total': 100000 // order.total_amount_float
        }
      };

      const extraFields: IP2PFields[] = [
        {
          'keyword': 'Número de orden',
          'value': order.number,
          'displayOn': P2PDisplayOnFields.both
        },
        {
          'keyword': 'Descripción',
          'value': description,
          'displayOn': P2PDisplayOnFields.both
        }
      ];

      const ipAddress = req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'];
      const response: IP2PRequest | string = await createP2PRequest(payment, ipAddress, userAgent, extraFields);

      console.info(response);

      /* const response: IP2PRequestInformation | string = await getP2PRequestInformation('2392457');
      console.info(response); */

      /* count += await sendClientEmail(order);

      if (order?.status === "approved") {
        count += await sendVantiEmail(order);
        count += await sendAllyEmail(order);
      } */
    }

    console.info(count + " emails sent");
    return res.status(200).json({ status: 200, message: count + " emails sent", data: resp?.data });
  } catch (error) {
    console.error("An error occurred during the execution of the endpoint email-test:", error);
    return res.status(500).json({ status: 500, message: "A general error has occurred" });
  }
};

export default handler;
