import { ISelectInputOption } from "@/components/atoms/selectInput/SelectInput";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { MocksModalSuccessProps } from "../../modal-success/ModalSuccess.mocks";
import { ITemsForm } from "./SignInForm";

interface IButtonForm {
    text: string;
    className?: string;
}
export interface IForm {
    onSubmitForm?: (e:ITemsForm) => void
    cta: IButtonForm;
    modal?: IPromoContent,
    selectOptions?: ISelectInputOption[]
}

const data: IForm  ={
    cta:{
        className:'button-primary',
        text: 'Crear cuenta'
    },
    onSubmitForm: (data) => console.log(data),
    modal: MocksModalSuccessProps.data,
    selectOptions:[
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

export const mockSignInFormsProps = {
    data
};  