import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { string, object } from 'yup';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
import { retrieveCustomerResetPwd } from '@/lib/services/commerce-layer.service';

const schema = object({
    token: string()
});

const validate = (
    schema: OptionalObjectSchema<ObjectShape>,
    handler: NextApiHandler
) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (['GET'].includes(req.method)) {
            try {
                req.body = await schema.validate(req.query, { abortEarly: false, stripUnknown: true });
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
        const resp = await retrieveCustomerResetPwd(req.body.token);
        res.status(201).json({ ...resp, method: req.method });
    } catch (error) {
        res.status(402).json(error);
    }
};

export default validate(schema, handler);