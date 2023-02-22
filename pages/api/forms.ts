import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { type, contractAccount, identity, qrCode } = req.body;
  if (type === "Identidad") {
    if ((!identity || !qrCode)) {
      res.status(400).json({
        result: {
          message: "El documento de identidad y el código QR con obligatorios.",
          success: false,
          isAuthorized: false
        }
      });
    }
    else if (identity !== 12345) {
      res.status(200).json({
        result: {
          message: "El documento de identidad ingresado no está autorizado.",
          success: true,
          isAuthorized: false
        }
      });
    }
    else {
      res.status(200).json({
        result: {
          success: true,
          isAuthorized: true
        }
      });
    }
    return;
  }
  else if (type === "RPO") {
    if (contractAccount != "12345") {
      res.status(400).json({
        result: {
          message: "La cuenta contrato ingresada es erronea.",
          success: false
        }
      });
    }
    else {
      res.status(200).json({
        result: {
          success: true,
          date: "Marzo 2023",
          name: "Maria Flores",
          address: "Calle 1 A # 45-12"
        }
      });
    }
    return;
  }
  else if (type === "Vantilisto") {
    if (contractAccount != 12345) {
      res.status(400).json({
        result: {
          message: "La cuenta contrato ingresada es erronea.",
          success: false
        }
      });
    }
    else {
      res.status(200).json({
        result: {
          success: true,
          quota: "$ 3.000.000",
          name: "Maria Flores",
          address: "Calle 1 A # 45-12"
        }
      });
    }
    return;
  }

  res.status(400).json({
    result: {
      message: "Formulario no valido.",
      success: false,
      isAuthorized: false
    }
  });
};

export default handler;
