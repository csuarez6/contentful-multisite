import { IAllyResponse} from '@/lib/interfaces/ally-collection.interface';
import { getOrderByAlly } from '@/lib/services/order-by-ally.service';
import { sendAllyEmail, sendClientEmail, sendVantiEmail } from '@/lib/services/send-emails.service';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<IAllyResponse>
) => {
  if (req.method !== "POST")
    return res.status(405).json({ status: 405, message: "Method not allowed" });

    const orderId = req.body.orderId;
    const resp: IAllyResponse = await getOrderByAlly(orderId);

    if (resp.status === 200) {
      sendClientEmail(resp.data);
      if (resp.data?.status === "approved") {
        sendVantiEmail(resp.data);
        sendAllyEmail(resp.data);
      }
    }

    return res.status(200).json({ status: 200, data: resp?.data });
};

export default handler;
