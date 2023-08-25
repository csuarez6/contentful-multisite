import type { NextApiRequest, NextApiResponse } from "next";
import { getCLAdminCLient } from "@/lib/services/commerce-layer.service";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const client = await getCLAdminCLient();

    const authorizations = await client.authorizations.list({
      filters: {
        token_eq: <string>req.query.token,
      },
      include: ['order'],
    });

    if (!authorizations.length) throw new Error('INVALID_TRANSACTION');

    const authorization = authorizations.at(0);

    await client.authorizations.update({
      id: authorization.id,
      _void: true,
    });

    res.json({
      success: true,
      data: {
        transaction_token: authorization.token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message || "VOID_PAYMENT_ERROR",
    });
  }
};

export default handler;
