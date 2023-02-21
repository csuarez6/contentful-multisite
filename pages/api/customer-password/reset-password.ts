import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { string, object } from 'yup';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
import { updateCustomerResetPwd } from '@/lib/services/commerce-layer.service';
import { sendEmail } from '@/lib/services/mailer.service';

const schema = object({
    tID: string(),
    resetT: string(),
    password: string(),
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
        const resp = await updateCustomerResetPwd(req.body.tID, req.body.password, req.body.resetT);
        let templateEmail = `\nHola ${resp.data.customer_email} Gracias por utilizar los servicios Vanti.\n\nSu contraseña ha sido recuperada.\n\n`;
        const clientEmail = {
            to: resp.data.customer_email,
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