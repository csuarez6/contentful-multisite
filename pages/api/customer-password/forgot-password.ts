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
        let templateEmail = `\nHola ${req.body.email} Gracias por utilizar los servicios Vanti.\n\nRecibimos tu solicitud de recuperación de contraseña. `;
        if (resp?.data?.id) {
            templateEmail += `Para continuar, ingresa al siguiente link:\n\n`;
            templateEmail += req.headers.origin + '/resetpassword/' + resp.data.id;
            templateEmail += "\n\nTen en cuenta que si no completas éste proceso en el rango de 15 minutos, el link anterior no será valido. \n\n Si no solicitaste el cambio, omite este correo.";
        } else {
            templateEmail += `Para continuar, comuniquese con el administrador. \n\nSi no realizó esta acción, omita este correo.`;
        }
        const clientEmail = {
            to: req.body.email,
            subject: "Recuperar Contraseña - Vanti",
            message: templateEmail,
            from: "Vanti Soporte <dev@aplyca.com>"
        };
        if (resp?.status === 200) sendEmail(clientEmail.to, clientEmail.subject, clientEmail.message, clientEmail.from);
        res.status(201).json({ data: "Intento de envío de correo realizado con exito", method: req.method });
    } catch (error) {
        console.error('Error handle forgot password', error);
        res.status(401).json({ data: 'error al actualizar la contraseña' });
    }
};

export default validate(schema, handler);