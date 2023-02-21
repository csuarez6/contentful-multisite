import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { string, object } from 'yup';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
import { createCustomerResetPwd } from '@/lib/services/commerce-layer.service';
import { sendEmail } from '@/lib/services/mailer.service';

const schema = object({
    email: string().email("Email no válido").required("Dato Requerido"),
});

const validate = (
    schema: OptionalObjectSchema<ObjectShape>,
    handler: NextApiHandler
) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (['POST'].includes(req.method)) {
            try {
                req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
            } catch (error) {
                return res.status(400).json(error);
            }
        } else {
            return res.status(400).json({ error: "Método no existe." });
        }
        await handler(req, res);
    };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const resp = await createCustomerResetPwd(req.body.email);
        let templateEmail = `\nHola ${req.body.email} Gracias por utilizar los servicios Vanti.\n\nRecibimos tu solicitud de recuperación de contraseña. Para continuar, ingresa al siguiente link:\n\n`;
        templateEmail += req.headers.origin + '/resetpassword/' + resp.data.id;
        templateEmail += "\n\nTen en cuenta que si no completas éste proceso dentro de las próximas 24 horas, el link anterior no será valido. \n\n Si no solicitaste el cambio, omite este correo.";
        const clientEmail = {
            to: req.body.email,
            subject: "Recuperar Contraseña - Vanti",
            message: templateEmail,
            from: "Vanti Soporte <dev@aplyca.com>"
        };

        const isMailSended = await sendEmail(clientEmail.to, clientEmail.subject, clientEmail.message, clientEmail.from);
        if (isMailSended) {
            res.status(201).json({ ...resp, method: req.method });
        } else {
            res.status(402).json({ error: "Error al enviar correo de restauración." });
        }
    } catch (error) {
        res.status(402).json(error);
    }
};

export default validate(schema, handler);