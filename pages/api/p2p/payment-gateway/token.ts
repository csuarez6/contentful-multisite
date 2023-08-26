// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import paymentGatewayValidation from "@/lib/services/payment-gateway-validation.service";
import { getP2PRequestInformation } from "@/lib/services/place-to-pay.service";
import type { NextApiRequest, NextApiResponse } from "next";

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

    console.info('token');

    const { data }: AuthorizationBody = req.body;

    const paymentInfo = await getP2PRequestInformation(data.attributes.payment_source_token);

    if (typeof paymentInfo === 'string') {
      throw new Error(paymentInfo);
    }

    res.json({
      success: true,
      data: {
        payment_source_token: paymentInfo.requestId
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
