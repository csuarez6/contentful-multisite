// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IP2PNotification } from "@/lib/interfaces/p2p-cf-interface";
import { getCLAdminCLient } from "@/lib/services/commerce-layer.service";
import { validateP2PSignature } from "@/lib/services/place-to-pay.service";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const client = await getCLAdminCLient();
    const data: IP2PNotification = req.body;
    let validation = false;

    validation = validateP2PSignature(data);

    if (validation) {
      //Buscar la orden en Commercelayer y actualizar su estado
      const authorizations = await client.authorizations.list({
        filters: {
          token_eq: <string>data.requestId,
        },
        include: ["order"],
      });
      if (!authorizations.length) throw new Error("INVALID_TRANSACTION");

      const authorization = authorizations.at(0);
      await client.authorizations.update({
        id: authorization.id,
        _capture: true,
      });

      return res.json({
        status: 'ok',
      });
    }

    res.json({
      status: validation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: error.message,
    });
  }
};

export default handler;
