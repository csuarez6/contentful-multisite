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
    password: string()
        .required("Dato Requerido")
        .matches(
            //eslint-disable-next-line
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Contraseñas debe contener: Min 8 caracteres, Min 1 letra mayúscula, Min 1 letra minúscula, Min 1 número y 1 caracter especial."
        ),
    confirmPassword: string()
        .required("Dato Requerido")
        .oneOf([ref("password")], "Contraseñas no coinciden")
        .matches(
            //eslint-disable-next-line
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Contraseñas debe contener: Min 8 caracteres, Min 1 letra mayúscula, Min 1 letra minúscula, Min 1 número y 1 caracter especial."
        ),
    contractNumber: string().required("Dato Requerido"),
    authorize: bool().oneOf([true], "Dato Requerido"),
    notificate: bool(),
    tokenReCaptcha: string(),
});

export type Customer = TypeOf<typeof customerSchema>;