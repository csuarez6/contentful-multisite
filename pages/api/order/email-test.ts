import { getOrderByAlly } from '@/lib/services/order-by-ally.service';
import { sendEmails } from '@/lib/services/send-emails.service';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") return res.status(405).json({ status: 405, message: "Method not allowed" });

  const orderId = req.body.orderId;
  const response = await getOrderByAlly(orderId);
  const orderData = response.data;
  let count = 0;

  count += await sendEmails(orderId, true, null, (req.headers['x-forwarded-proto'] || 'http') + '://' + req.headers['host']);
  count += await sendEmails(orderId, false, orderData.status.toUpperCase());

  console.info(count + " emails sent");
  return res.status(200).json({ status: 200, message: count + " emails sent" });
};

export default handler;