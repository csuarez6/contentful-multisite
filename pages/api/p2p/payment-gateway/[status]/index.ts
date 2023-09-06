// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DEFAULT_ORDER_PARAMS } from "@/lib/graphql/order.gql";
import { IExternalPaymentGWRequest } from "@/lib/interfaces/commercelayer-extend.interface";
import { getCLAdminCLient, isExternalPayment } from "@/lib/services/commerce-layer.service";
import paymentGatewayValidation from "@/lib/services/payment-gateway-validation.service";
import { getP2PRequestInformation } from "@/lib/services/place-to-pay.service";
import type { NextApiRequest, NextApiResponse } from "next";
import uuid from "react-uuid";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { data, included }: IExternalPaymentGWRequest = req.body;
  const orderRequest = (included.find(item => item.type === "orders"));

  try {
    console.info('capture/void', req.headers, { data }, { included });
    paymentGatewayValidation(req);
    const status = req.query.status.toString();
    const client = await getCLAdminCLient();
    const order = await client.orders.retrieve(orderRequest.id, DEFAULT_ORDER_PARAMS);
    const paymentSource = order.payment_source;
    const transactionToken = isExternalPayment(paymentSource) ? paymentSource.payment_source_token : null;
    const paymentInfo = await getP2PRequestInformation(transactionToken);

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
