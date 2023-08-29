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

    const { data }: AuthorizationBody = req.body;
    const status = <string> req.query.status;

    console.info('finish', status);

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
          status: status,
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
