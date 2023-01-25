import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '@/lib/services/mailer.service';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const data: any = {
    type: req.body.type
  };

  if (data.type === "exequiales") {
    data["email"] = req.body.email;
    data["fullName"] = req.body.fullName;
    data["cellPhone"] = req.body.cellPhone;
    data["subject"] = data.type;
    data["servicioExequial"] = req.body.servicioExequial;
    data["body"] = `
      Nombre: ${data.fullName}\n
      Teléfono: ${data.cellPhone}\n
      Interés: ${data.type}\n
      Servicio Exequial: ${data.servicioExequial}
    `;
  };

  const isMailSended = await sendEmail("jperez@aplyca.com", data.type, data.body);
  res.status(200).json({
    result: {
      message: isMailSended ? "Envío de correo exitoso" : "Envío de correo fallido",
      success: isMailSended
    }
  });
};

export default handler;
