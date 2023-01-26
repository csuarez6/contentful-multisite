import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
// import { number, object } from 'yup';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
import { customerSchema } from '../../src/schemas/customer';
import { createCustomer } from '@/lib/services/commerce-layer.service';


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
        const resp = await createCustomer(req.body);
        res.status(201).json({ ...resp, method: req.method });
    } catch (error) {
        res.status(402).json(error);
    }
};

export default validate(customerSchema, handler);