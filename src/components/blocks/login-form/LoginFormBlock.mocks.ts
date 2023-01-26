import { IForm } from "./LoginFormBlock";

const data: IForm = {
    formData: {
        cta: {
            className: 'button-primary',
            text: 'Iniciar sesión'
        },
        onSubmitForm: (data) => console.log(data),
        modal: {
            promoTitle: '¡Login!',
            subtitle: '¡Bienvenido Login!',
            ctaLabel: 'Ok'
        }
    }
};

export const mockLoginFormBlockProps = {
    data
};