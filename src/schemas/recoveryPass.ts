import * as yup from "yup";

export const recoveryPass = yup.object({
    password: yup
        .string()
        .required("Dato Requerido")
        .matches(
            //eslint-disable-next-line
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Contraseñas debe contener: Min 8 caracteres, Min 1 letra mayúscula, Min 1 letra minúscula, Min 1 número y 1 caracter especial."
        ),
    confirmPassword: yup
        .string()
        .required("Dato Requerido")
        .oneOf([yup.ref("password")], "Contraseñas no coinciden")
        .matches(
            //eslint-disable-next-line
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Contraseñas debe contener: Min 8 caracteres, Min 1 letra mayúscula, Min 1 letra minúscula, Min 1 número y 1 caracter especial."
        ),
    tID: yup.string(),
    resetT: yup.string(),
});
