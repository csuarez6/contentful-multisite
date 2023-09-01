// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PaymentStatus } from "@/lib/enum/EPaymentStatus.enum";
import { DEFAULT_ORDER_PARAMS } from "@/lib/graphql/order.gql";
import { IAllyResponse } from "@/lib/interfaces/ally-collection.interface";
import { IP2PNotification, P2PRequestStatus } from "@/lib/interfaces/p2p-cf-interface";
import { getCLAdminCLient, isExternalPayment } from "@/lib/services/commerce-layer.service";
import { getOrderByAlly } from "@/lib/services/order-by-ally.service";
import { getP2PRequestInformation, validateP2PSignature } from "@/lib/services/place-to-pay.service";
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
      const order = await client.orders.retrieve(data.requestId, DEFAULT_ORDER_PARAMS);
      if (!order) throw new Error("INVALID_ORDER");

      if (order.payment_status === PaymentStatus.paid || order.payment_status === PaymentStatus.voided) {
        throw new Error("ORDER_ALREADY_CAPTURED_OR_VOIDED");
      }

      const paymentSource = order.payment_source;
      const transactionToken = isExternalPayment(paymentSource) ? paymentSource.payment_source_token : null;
      const infoP2P = await getP2PRequestInformation(transactionToken);

      const metadata = {
        medium: 'payment_done',
        data: data,
        paymentInfo: infoP2P
      };

      console.info('ok order search');

      if (data.status.status === P2PRequestStatus.approved) {
        console.info('approved');

        await client.orders.update({
          id: order.id,
          _approve: true,
          _capture: true,
        }).then(async () => {
          const captures = (await client.captures.list({
            filters: {
              order_id_eq: order.id,
            }
          })).at(0);

          await client.captures.update({
            id: captures.id,
            metadata: metadata
          });
        });
      } else if (data.status.status === P2PRequestStatus.failed || data.status.status === P2PRequestStatus.rejected) {
        console.info('failed or rejected');

        await client.orders.update({
          id: order.id,
          _cancel: true,
        }).then(async () => {
          const voids = (await client.voids.list({
            filters: {
              order_id_eq: order.id,
            }
          })).at(0);

          await client.voids.update({
            id: voids.id,
            metadata: metadata
          });
        });
      }
      
      const orderByAlly: IAllyResponse = await getOrderByAlly(order.id);
      await sendClientEmail(orderByAlly.data);

      if (data.status.status === P2PRequestStatus.approved) {
        await sendVantiEmail(orderByAlly.data);
        await sendAllyEmail(orderByAlly.data);
      }
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
