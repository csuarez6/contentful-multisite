// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import paymentGatewayValidation from "@/lib/services/payment-gateway-validation.service";
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

    if (status == 'capture') {
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
    } else if (status == 'void') {
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
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default handler;
