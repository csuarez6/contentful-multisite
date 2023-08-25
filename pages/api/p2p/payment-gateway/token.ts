// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  res.json({
    success: true,
    data: {
      customer_token: "your-external-customer-token",
      payment_source_token: "your-external-payment-source-token",
    },
  });
}
