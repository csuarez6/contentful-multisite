import { IForm } from "./LoginFormBlock";

const data: IForm = {
    formData: {
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
    }
};

export const mockLoginFormBlockProps = {
    data
};