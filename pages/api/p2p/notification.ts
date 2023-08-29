// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IAllyResponse } from "@/lib/interfaces/ally-collection.interface";
import { IP2PNotification, P2PRequestStatus } from "@/lib/interfaces/p2p-cf-interface";
import { getCLAdminCLient } from "@/lib/services/commerce-layer.service";
import { getOrderByAlly } from "@/lib/services/order-by-ally.service";
import { validateP2PSignature } from "@/lib/services/place-to-pay.service";
import { sendAllyEmail, sendClientEmail, sendVantiEmail } from "@/lib/services/send-emails.service";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const client = await getCLAdminCLient();
    const data: IP2PNotification = req.body;
    const validation = validateP2PSignature(data);

    console.info('notification');

    if (validation) {
      console.info('ok validation');
      //Buscar la orden en Commercelayer y actualizar su estado
      const order = await client.orders.retrieve(data.requestId);
      if (!order) throw new Error("INVALID_TRANSACTION");
      const authorization = order.authorizations.at(0);

      console.info('ok order search');

      if (data.status.status === P2PRequestStatus.approved) {
        console.info('approved');
        await client.authorizations.update({
          id: authorization.id,
          _capture: true,
          metadata: {
            notificationInfo: data
          }
        });
      }

      console.info('emails');
      const orderByAlly: IAllyResponse = await getOrderByAlly(authorization.order.id);
      if (orderByAlly.status === 200) {
        await sendClientEmail(orderByAlly.data);

        if (data.status.status === P2PRequestStatus.approved) {
          await sendVantiEmail(orderByAlly.data);
          await sendAllyEmail(orderByAlly.data);
        }
      }

      return res.json({
        status: 'ok',
      });
    }

    res.json({
      status: validation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: error.message,
    });
  }
};

export default handler;
