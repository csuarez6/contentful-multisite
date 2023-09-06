// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import paymentGatewayValidation from "@/lib/services/payment-gateway-validation.service";
import { getP2PRequestInformation } from "@/lib/services/place-to-pay.service";
import { IExternalPaymentGWRequest } from "@/lib/interfaces/commercelayer-extend.interface";
import { getCLAdminCLient } from "@/lib/services/commerce-layer.service";
import uuid from "react-uuid";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { data, included }: IExternalPaymentGWRequest = req.body;
  const orderRequest = (included.find(item => item.type === "orders"));

  try {
    console.info('authorize', req.headers, { data }, { included });
    paymentGatewayValidation(req);
    const client = await getCLAdminCLient();
    const externalPayment = await client.external_payments.retrieve(data.id);
    const paymentInfo = await getP2PRequestInformation(externalPayment.payment_source_token);

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
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      "success": false,
      "data": {
        "transaction_token": uuid(),
        "amount_cents": orderRequest.attributes.total_amount_float,
        "error": {
          "code": "500",
          "message": error
        }
      }
    });
  }
};

export default handler;
