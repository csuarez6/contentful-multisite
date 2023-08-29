// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import paymentGatewayValidation from "@/lib/services/payment-gateway-validation.service";
import { getP2PRequestInformation } from "@/lib/services/place-to-pay.service";

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

    console.info('authorize');

    const { data }: AuthorizationBody = req.body;

    const paymentInfo = await getP2PRequestInformation(data.attributes.payment_source_token);

    if (typeof paymentInfo === 'string') {
      throw new Error(paymentInfo);
    }

    res.json({
      success: true,
      data: {
        transaction_token: paymentInfo.requestId,
        amount_cents: paymentInfo.request.payment.amount.total,
        metadata: {
          paymentInfo: paymentInfo
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
