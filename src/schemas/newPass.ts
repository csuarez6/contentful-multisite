import * as yup from "yup";
import { ref, string } from "yup";

export const newPassSchema = yup.object({
    newPassword: string()
        .required("Dato Requerido")
        .matches(
            //eslint-disable-next-line
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Contraseñas debe contener: Min 8 caracteres, Min 1 letra mayúscula, Min 1 letra minúscula, Min 1 número y 1 caracter especial."
        ),
    confirmNewPassword: string()
        .required("Dato Requerido")
        .oneOf([ref("newPassword")], "Contraseñas no coinciden")
        .matches(
            //eslint-disable-next-line
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Contraseñas debe contener: Min 8 caracteres, Min 1 letra mayúscula, Min 1 letra minúscula, Min 1 número y 1 caracter especial."
        ),
});
