import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { string, object } from 'yup';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
import { updatePassWord } from '@/lib/services/commerce-layer.service';

const schema = object({
    user: string(),
    password: string(),
    newPassword: string(),
    confirmNewPassword: string(),
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
        return await updatePassWord(req.body.user, req.body.password, req.body.newPassword);
    } catch (error) {
        res.status(402).json(error);
    }
};

export default validate(schema, handler);