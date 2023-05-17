import { IModal } from "./CustomModal";

const data: IModal = {
    children: 'Contenido Hijo (HTML)',
    icon: 'check',
    title: '¡Has creado tu cuenta Vanti!',
    subtitle: '¡Bienvenido al universo de Vanti, más formas de avanzar!',
    close: () => alert("closed"),
    ctaCollection:{
        items:[
            {
                internalLink:{
                    urlPath: "/test-url"
                },
                name: "link-text"
            }
        ]
    }
};
export const MocksModalProps = {
    data
};