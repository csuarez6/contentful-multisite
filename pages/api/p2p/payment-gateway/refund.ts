// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import paymentGatewayValidation from "@/lib/services/payment-gateway-validation.service";
import { getP2PRequestInformation } from "@/lib/services/place-to-pay.service";
import { IExternalPaymentGWRequest } from "@/lib/interfaces/commercelayer-extend.interface";
import { getCLAdminCLient, isExternalPayment } from "@/lib/services/commerce-layer.service";
import { DEFAULT_ORDER_PARAMS } from "@/lib/graphql/order.gql";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {

  paymentGatewayValidation(req);
  const { data, included }: IExternalPaymentGWRequest = req.body;

  try {
    console.info('refund', req.headers, { data });
    console.info('included', { included });
    const client = await getCLAdminCLient();
    const authorization = await client.authorizations.retrieve(data.id);
    const order = await client.orders.retrieve(authorization.order.id, DEFAULT_ORDER_PARAMS);
    console.info('order', order);
    const paymentSource = order.payment_source;
    const transactionToken = isExternalPayment(paymentSource) ? paymentSource.payment_source_token : null;
    console.info('transactionToken', transactionToken);
    const paymentInfo = await getP2PRequestInformation(transactionToken);
    console.info('paymentInfo', paymentInfo);

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
      error: error.message,
    });
  }
};

export default handler;
