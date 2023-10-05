import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { MocksModalSuccessProps } from "../../modal-success/ModalSuccess.mocks";
import { ITemsForm } from "./SignUpForm";
import { IListContent } from "@/components/atoms/select-atom/SelectAtom";

interface IButtonForm {
    text: string;
    className?: string;
}
export interface IForm {
    onSubmitForm?: (e: ITemsForm) => any
    cta: IButtonForm;
    modal?: IPromoContent,
    selectOptions?: IListContent[]
}

const data: IForm = {
    cta: {
        className: 'button-primary',
        text: 'Crear cuenta'
    },
    onSubmitForm: (data) => console.info(data),
    modal: MocksModalSuccessProps.data,
    selectOptions: [
        {
            text: "Seleccione un tipo de documento",
            value: "",
        },
        {
            "value": "registroCivilDeNacimiento",
            "text": "Registro civil de nacimiento"
        },
        {
            "value": "tarjetaDeIdentidad",
            "text": "Tarjeta de Identidad"
        },
        {
            "value": "cedula",
            "text": "Cédula de ciudadanía"
        },
        {
            "value": "tarjetaDeExtranjeria",
            "text": "Tarjeta de extranjeria"
        },
        {
            "value": "cedulaDeExtranjeria",
            "text": "Cédula de extranjeria"
        },
        {
            "value": "pasaporte",
            "text": "Pasaporte"
        },
        {
            "value": "documentoIdentificaciónExtranjero",
            "text": "Documento identificación extranjero"
        },
        {
            "value": "sinIdentificaciónDelExterior",
            "text": "Sin identificación del exterior"
        },
        {
            "value": "pep",
            "text": "PEP"
        },
        {
            "value": "nifDelExtranjero",
            "text": "NIF del extranjero"
        },
        {
            "value": "nuip",
            "text": "NUIP"
        },
        {
            "value": "nit",
            "text": "Nit"
        },
    ],
};

export const mockSignUpFormsProps = {
    data
};  