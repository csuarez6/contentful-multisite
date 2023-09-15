import { getOrderByAlly } from '@/lib/services/order-by-ally.service';
import { sendEmails } from '@/lib/services/send-emails.service';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") return res.status(405).json({ status: 405, message: "Method not allowed" });

  const orderId = req.body.orderId;
  try {
    const response = await getOrderByAlly(orderId);
    const orderData = response.data;

    await sendEmails(orderId, true, null, (req.headers['x-forwarded-proto'] || 'http') + '://' + req.headers['host']);
    await sendEmails(orderId, false, orderData.status.toUpperCase());

    console.info("Emails sent");
    return res.status(200).json({ status: 200, message: "Emails sent" });
  } catch (error) {
    console.error("An error occurred during the execution of the endpoint email-test:", error);
    return res.status(500).json({ status: 500, message: "A general error has occurred" });
  }
};

export default handler;