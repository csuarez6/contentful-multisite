import { ISelectInputOption } from "@/components/atoms/selectInput/SelectInput";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { MocksModalSuccessProps } from "../../modal-success/ModalSuccess.mocks";
import { ITemsForm } from "./SignUpForm";

interface IButtonForm {
    text: string;
    className?: string;
}
export interface IForm {
    onSubmitForm?: (e: ITemsForm) => any
    cta: IButtonForm;
    modal?: IPromoContent,
    selectOptions?: ISelectInputOption[]
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
            label: 'Seleccione un tipo de documento',
            value: ''
        },
        {
            label: 'Cedula',
            value: 'cedula'
        },
        {
            label: 'Pasaporte',
            value: 'pasaporte'
        },
    ]
};

export const mockSignUpFormsProps = {
    data
};  