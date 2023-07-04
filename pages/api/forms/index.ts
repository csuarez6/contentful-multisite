import type { NextApiRequest, NextApiResponse } from 'next';
import consultQuotaVantilisto from './vantilisto';
import ReCaptchaService from '@/lib/services/re-captcha.service';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { type, contractAccount, identity, qrCode, tokenReCaptcha } = req.body;

  /* Validate ReCaptcha **/
  const isValidReCaptcha = await ReCaptchaService.validate(tokenReCaptcha);
  if (!isValidReCaptcha) {
    res.status(400).json({
      result: {
        message: "Error al validar el ReCaptcha.",
        success: false,
        errors: ['ReCaptcha']
      }
    });
  }

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
    try {
      const response = await consultQuotaVantilisto(req.body);

      if (response.result) {
        const { account, cupoAprobado, cupoUtilizado, cupoDisponible } = response.data;
        res.status(200).json({
          result: {
            success: true,
            quotaApproved: cupoAprobado,
            quotaUsed: cupoUtilizado,
            quotaAvailable: cupoDisponible,
            account,
          }
        });
      }
      else {
        res.status(400).json({
          result: {
            message: response.error ? response.message : "Ocurrió un error, intenta de nuevo o comunícate con atención al cliente.",
            success: false
          }
        });
      }
      return;
    } catch (error) {
      res.status(400).json({
        result: {
          message: "Ocurrió un error, intenta de nuevo o comunícate con atención al cliente.",
          success: false
        }
      });
    }
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
