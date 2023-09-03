// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.json({
    success: true,
    data: {
      transaction_token: "your-external-transaction-token",
      amount_cents: 12900,
      metadata: {
        methood: "void",
      },
    },
  });
}
