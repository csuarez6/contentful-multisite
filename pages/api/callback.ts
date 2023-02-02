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

  const { type, cuentaContrato, email, fullName, hour, cellPhone } = req.body;
  const typeName = getType(type);
  const data: any = {};
   data["body"] = [
    `Nuevo callback desde Marketplace: ${typeName}\n`,
    `${typeName}\n`
  ];
  if (cuentaContrato) data["body"].push(`Cuenta contrato: ${cuentaContrato}`);

  if (type === "rpo") {
    const newDate = new Date(req.body.date);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = newDate.toLocaleDateString('es-CO', options);

    [
      `Fecha: ${date}`,
      `Hora: ${hour}`,
      `Teléfono: ${cellPhone}`,
    ].forEach(element => data["body"].push(element));
  } else {
    if (fullName) data["body"].push(`Nombre: ${fullName}`);
    data["body"].push(`Teléfono: ${cellPhone}`);
    if (email) data["body"].push(`Correo electrónico: ${email}`);
  }

  const clientEmail = {
    to: "jperez@aplyca.com, evallejo@aplyca.com, msanchez@aplyca.com, dduarte@aplyca.com",
    subject: `Callback Marketplace: ${typeName}`,
    message: data.body.join('\n'),
    from: "Vanti Marketplace <marketplace@grupovanti.com>"
  }

  const isMailSended = await sendEmail(clientEmail.to, clientEmail.subject, clientEmail.message, clientEmail.from);

  res.status(200).json({
    result: {
      message: isMailSended ? "Envío de correo exitoso" : "Envío de correo fallido",
      success: isMailSended
    }
  });
};

export default handler;
