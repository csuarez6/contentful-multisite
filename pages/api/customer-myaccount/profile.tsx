import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { string, object, number } from 'yup';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
import { updateCustomerMetadata } from '@/lib/services/commerce-layer.service';
import { getToken } from 'next-auth/jwt';

const schema = object({
    name: string().required("Dato Requerido").min(3, "Mínimo 3 caracteres"),
    lastName: string().required("Dato Requerido").min(3, "Mínimo 3 caracteres"),
    documentType: string().required("Dato Requerido"),
    documentNumber: number()
        .required("Dato Requerido")
        .nullable()
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive("Solo números positivos"),
    cellPhone: number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .nullable()
        .required("Dato Requerido")
        .min(8, "Faltan Números"),
    contractNumber: string().required("Dato Requerido"),
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
        const accessToken_session = await getToken({
            req,
            secret: 'secret',
        });
        const data = { accessToken: accessToken_session?.accessToken, ...req.body };
        const resp = await updateCustomerMetadata(data);
        if (resp.status && resp.status == 200) {
            res.status(200).json({ error: null });
        } else {
            res.status(400).json({ error: "Error al actualizar datos." });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

export default validate(schema, handler);