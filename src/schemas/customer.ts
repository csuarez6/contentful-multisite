import { bool, number, object, ref, string, TypeOf } from 'yup';

export const customerSchema = object({
    name: string().required("Dato Requerido").min(3, "Minimo 3 caracteres"),
    lastName: string().required("Dato Requerido").min(3, "Minimo 3 caracteres"),
    documentType: string().required('Dato Requerido'),
    documentNumber: number()
        .required('Dato Requerido')
        .nullable()
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive('Solo numeros positivos'),
    email: string()
        .email("Email no válido")
        .required("Dato Requerido"),
    cellPhone: number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .nullable()
        .required("Dato Requerido")
        .min(8, "Faltan Numeros"),
    password: string().required('Dato Requerido').min(6, 'Minimo 6 caracteres'),
    confirmPassword: string()
        .required('Dato Requerido')
        .min(6, 'Minimo 6 caracteres')
        .oneOf([ref("password")], "Contraseñas no coinciden"),
    contractNumber: number()
        .required('Dato Requerido')
        .nullable()
        .transform((value) => (isNaN(value) ? undefined : value)),
    authorize: bool(),
    notificate: bool()
});

export type Customer = TypeOf<typeof customerSchema>;