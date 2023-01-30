import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '@/lib/services/mailer.service';

const types:object = {
  "exequiales": "Planes exequiales",
  "mantenimiento-y-reparacion": "Mantenimiento y reparación",
  "servihogar": "Servihogar",
  "nuevo-punto": "Nuevo Punto",
  "rpo": "Revisión Periódica Obligatoria",
};
const getType = (type: string) => types[type.toLocaleLowerCase()] ?? type;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (!Object.keys(types).includes(req.body.type)) {
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

  const data: any = {
    type: req.body.type
  };

  if (data.type === "rpo") {
    const newDate = new Date(req.body.date);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    data["cuenta_contrato"] = req.body.cuenta_contrato;
    data["date"] = newDate.toLocaleDateString('es-CO', options);
    data["hour"] = req.body.hour;
    data["cellPhone"] = req.body.cellPhone;
    data["body"] = [
      `Solicitud de servicio ¡Te llamamos! para ${getType(data.type)}\n`,
      "Datos personales:",
      `Cuenta contrato: ${data.cuenta_contrato ?? '----'}`,
      `Fecha: ${data.date ?? '----'}`,
      `Hora: ${data.hour ?? '----'}`,
      `Teléfono: ${data.cellPhone}`,
    ];
  } else {
    data["email"] = req.body.email;
    data["fullName"] = req.body.fullName;
    data["cellPhone"] = req.body.cellPhone;
    data["servicioExequial"] = req.body.servicioExequial;
    data["body"] = [
      `Solicitud de servicio ¡Te llamamos! para ${getType(data.type)}\n`,
      "Datos personales:",
      `Nombre: ${data.fullName ?? '----'}`,
      `Teléfono: ${data.cellPhone}`,
      `Correo electrónico: ${data.email ?? '----'}`,
    ];
    if (data.type === "exequiales") data["body"].push(`Servicio Exequial: ${data.servicioExequial ?? '----'}`);
  }

  const isMailSended = await sendEmail("jperez@aplyca.com, evallejo@aplyca.com, msanchez@aplyca.com, dduarte@aplyca.com", "Servicio ¡Te llamamos! Vanti Marketplace", data.body.join('\n'));
  res.status(200).json({
    result: {
      message: isMailSended ? "Envío de correo exitoso" : "Envío de correo fallido",
      success: isMailSended
    }
  });
};

export default handler;
