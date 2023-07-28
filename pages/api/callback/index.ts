import type { NextApiRequest, NextApiResponse } from 'next';
import reCaptchaService from '@/lib/services/re-captcha.service';
import createCallback from './create-callback';
import { CALLBACK_TYPES } from "./constants";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (!Object.keys(CALLBACK_TYPES).includes(req.body.type)) {
    res.status(400).json({
      result: {
        message: "Callback no valido.",
        success: false
      }
    });
    return;
  }
  if (!req.body.cellPhone) {
    res.status(400).json({
      result: {
        message: "El número de celular es obligatorio.",
        success: false,
        errors: ['cellPhone']
      }
    });
    return;
  }

  const { tokenReCaptcha } = req.body;
  const isValidReCaptcha = await reCaptchaService.validate(tokenReCaptcha);

  if (!isValidReCaptcha) {
    res.status(400).json({
      result: {
        message: "ReCaptcha validation error",
        success: false,
        errors: ['ReCaptcha']
      }
    });
  }

  const response = await createCallback(req.body);
  console.info(response);

  if (response.error) {
    res.status(400).json({
      result: {
        message: response.message,
        success: false,
        errors: ["client_credentials"]
      }
    });
  } else {
    res.status(200).json({
      result: {
        message: "Se ha creado el Callback con éxito.",
        success: true,
        response
      }
    });
  }
};

export default handler;
