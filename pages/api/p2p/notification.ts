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
      if (!order) throw new Error("INVALID_ORDER");
      const authorization = order.authorizations.at(0);
      if (!authorization) throw new Error("INVALID_TRANSACTION");

      if (authorization.captures || authorization.voids) {
        throw new Error("ORDER_ALREADY_CAPTURED_OR_VOIDED");
      }

      console.info('ok order search');

      if (data.status.status === P2PRequestStatus.approved) {
        console.info('approved');

        await client.orders.update({
          id: order.id,
          _approve: true,
        });

        await client.authorizations.update({
          id: authorization.id,
          _capture: true,
          metadata: {
            notificationInfo: data
          }
        });
      } else if (data.status.status === P2PRequestStatus.failed || data.status.status === P2PRequestStatus.rejected) {
        console.info('failed or rejected');

        await client.orders.update({
          id: order.id,
          _cancel: true,
        });

        const metadata = authorization.metadata.push(data);
        await client.authorizations.update({
          id: authorization.id,
          _void: true,
          metadata: metadata
        });
      }
      
      console.info('emails');
      const orderByAlly: IAllyResponse = await getOrderByAlly(order.id);
      if (orderByAlly.status === 200) {
        await sendClientEmail(orderByAlly.data);

        if (data.status.status === P2PRequestStatus.approved) {
          await sendVantiEmail(orderByAlly.data);
          await sendAllyEmail(orderByAlly.data);
        }
      }

      return res.json({
        status: 200,
        messsage: validation
      });
    }

    res.json({
      status: 200,
      message: validation
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export default handler;
