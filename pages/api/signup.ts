import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
// import { number, object } from 'yup';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
import { customerSchema } from '../../src/schemas/customer';
import { createCustomer } from '@/lib/services/commerce-layer.service';
import reCaptchaService from '@/lib/services/re-captcha.service';

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
        const isValidReCaptcha = await reCaptchaService.validate(req.body.tokenReCaptcha);

        if (!isValidReCaptcha) {
            res.status(400).json({
                success: false,
                data: {
                    recaptcha: "ReCaptcha validation error",
                },
                error: {
                    code: "RE_CAPTCHA_ERROR_VALIDATION",
                    message: "ReCaptcha validation error",
                },
            });
        }
        const resp = await createCustomer(req.body);
        res.status(201).json({ ...resp, method: req.method });
    } catch (error) {
        res.status(400).json(error);
    }
};

export default validate(customerSchema, handler);
