// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IExternalPaymentGWRequest } from "@/lib/interfaces/commercelayer-extend.interface";
import paymentGatewayValidation from "@/lib/services/payment-gateway-validation.service";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { data }: IExternalPaymentGWRequest = req.body;

  try {
    console.info('token', req.headers, { data });
    console.info('included', { included });
    paymentGatewayValidation(req);

    res.json({
      success: true,
      data: {
        payment_source_token: data.attributes.payment_source_token
      }
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      data: {
        error: {
          code: 500,
          message: error
        }
      }
    });
  }
};

export default handler;
