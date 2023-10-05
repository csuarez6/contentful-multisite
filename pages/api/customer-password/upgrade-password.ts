import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
import { updatePassWord } from '@/lib/services/commerce-layer.service';
import { newPassSchema } from '@/schemas/newPass';

const validate = (
    schema: OptionalObjectSchema<ObjectShape>,
    handler: NextApiHandler
) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (['POST'].includes(req.method)) {
            try {
                req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
            } catch (error) {
                console.error("Error creating a new password", error);
                return res.status(400).json({ error: "Petición inválida, los valores enviados no son consistentes." });
            }
        } else {
            return res.status(400).json({ error: "Método no existe." });
        }
        await handler(req, res);
    };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await updatePassWord(req.body.user, req.body.password, req.body.newPassword);
        res.status(201).json({ success: true, data: 'Contraseña actualizada con exito'});
    } catch (error) {
        res.status(402).json({ data: 'error al actualizar la contraseña' });
    }
};

export default validate(newPassSchema, handler);