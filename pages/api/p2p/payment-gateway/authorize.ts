// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import paymentGatewayValidation from "@/lib/services/payment-gateway-validation.service";

type AuthorizationBody = {
  data: any;
  included: any[];
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  try {
    paymentGatewayValidation(req);

    const { data }: AuthorizationBody = req.body;

    // petición a P2P validando el estado y obteniendo la info

    res.json({
      success: true,
      data: {
        transaction_token: data.attributes.payment_source_token,
        metadata: {
          foo: "bar",
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default handler;
