import { IAllyResponse } from '@/lib/interfaces/ally-collection.interface';
import { getOrderByAlly } from '@/lib/services/order-by-ally.service';
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
      const orderData = resp.data;
      count += await sendClientEmail(orderData);

      if (orderData?.status === "approved") {
        count += await sendVantiEmail(orderData);
        count += await sendAllyEmail(orderData);
      }
    }

    console.info(count + " emails sent");
    return res.status(200).json({ status: 200, message: count + " emails sent", data: resp?.data });
  } catch (error) {
    console.error("An error occurred during the execution of the endpoint email-test:", error);
    return res.status(500).json({ status: 500, message: "A general error has occurred" });
  }
};

export default handler;
