import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '@/lib/services/mailer.service';

const types: object = {
  "mantenimiento-y-reparacion": "Mantenimiento y reparación",
  "servihogar": "Servihogar",
  "nuevo-punto": "Nuevo Punto",
  "rpo": "Revisión Periódica Obligatoria",
  "producto": "Producto",
  "instalacion-gasodomésticos": "Instalación Gasodomésticos",
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

  const data: any = {};
  const { type, cuentaContrato, email, fullName, hour, cellPhone } = req.body;

  if (type === "rpo") {
    const newDate = new Date(req.body.date);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = newDate.toLocaleDateString('es-CO', options);

    data["body"] = [
      `Solicitud de servicio ¡Te llamamos! para ${getType(type)}\n`,
      "Datos personales:",
      `Cuenta contrato: ${cuentaContrato}`,
      `Fecha: ${date}`,
      `Hora: ${hour}`,
      `Teléfono: ${cellPhone}`,
    ];
  } else {
    data["body"] = [
      `Solicitud de servicio ¡Te llamamos! para ${getType(type)}\n`,
      "Datos personales:",
    ];
    if (cuentaContrato) data["body"].push(`Cuenta contrato: ${cuentaContrato}`);
    data["body"].push(`Nombre: ${fullName}`);
    data["body"].push(`Teléfono: ${cellPhone}`);
    data["body"].push(`Correo electrónico: ${email}`);
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
