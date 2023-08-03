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
            text: 'Seleccione un tipo de documento',
            value: ''
        },
        {
            text: 'Cedula',
            value: 'cedula'
        },
        {
            text: 'Pasaporte',
            value: 'pasaporte'
        },
    ]
};

export const mockSignUpFormsProps = {
    data
};  