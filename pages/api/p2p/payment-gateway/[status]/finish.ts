// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import hmacSHA256 from "crypto-js/hmac-sha256";

const paymentGWValidation = (
  req: NextApiRequest,
) => {
  if (req.method !== "POST") throw new Error("NOT_FOUND");

  const signature = req.headers["x-commercelayer-signature"];
  const rawBody = JSON.stringify(req.body);
  const hash = hmacSHA256(rawBody, process.env.CL_SHARED_SECRET);
  const encode = hash.toString(CryptoJS.enc.Base64);

  if (signature !== encode) throw new Error("INVALID_SIGNATURE");
};

type AuthorizationBody = {
  data: any;
  included: any[];
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  try {
    paymentGWValidation(req);

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
