// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const { data } = req.body;

  res.json({
    success: true,
    data: {
      transaction_token: data.attributes.payment_source_token,
      metadata: {
        foo: "bar",
      },
    },
  });
}
