import type { NextApiRequest, NextApiResponse } from 'next';
import reCaptchaService from '@/lib/services/re-captcha.service';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
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
    return;
  }

  res.status(200).json({
    result: {
      message: "El token de ReCaptcha es válido",
      success: true
    }
  });
  return;
};

export default handler;
