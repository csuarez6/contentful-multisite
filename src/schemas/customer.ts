import { bool, number, object, ref, string, TypeOf } from "yup";

export const customerSchema = object({
    name: string().required("Dato Requerido").min(3, "Mínimo 3 caracteres"),
    lastName: string().required("Dato Requerido").min(3, "Mínimo 3 caracteres"),
    documentType: string().required("Dato Requerido"),
    documentNumber: number()
        .required("Dato Requerido")
        .nullable()
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive("Solo números positivos"),
    email: string()
        .email("Email no válido")
        .required("Dato Requerido"),
    cellPhone: number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .nullable()
        .required("Dato Requerido")
        .min(8, "Faltan Números"),
    password: string().required("Dato Requerido").min(6, "Mínimo 6 caracteres"),
    confirmPassword: string()
        .required("Dato Requerido")
        .min(6, "Mínimo 6 caracteres")
        .oneOf([ref("password")], "Contraseñas no coinciden"),
    contractNumber: number()
        .required("Dato Requerido")
        .nullable()
        .transform((value) => (isNaN(value) ? undefined : value)),
    authorize: bool().oneOf([true], "Dato Requerido"),
    notificate: bool(),
    tokenReCaptcha: string(),
});

export type Customer = TypeOf<typeof customerSchema>;