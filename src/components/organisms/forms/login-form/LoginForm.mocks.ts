import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { ITemsForm } from "./LoginForm";

interface IButtonForm {
    text: string;
    className?: string;
}
export interface IForm {
    onSubmitForm?: (e: ITemsForm) => void
    cta: IButtonForm;
    modal?: IPromoContent
}

const data: IForm = {
    cta: {
        className: 'button-primary',
        text: 'Iniciar sesión'
    },
    onSubmitForm: (data) => console.info(data),
    modal: {
        promoTitle: '¡Login!',
        subtitle: '¡Bienvenido Login!',
        ctaLabel: 'Ok'
    }
};

export const mockLoginFormProps = {
    data
};  