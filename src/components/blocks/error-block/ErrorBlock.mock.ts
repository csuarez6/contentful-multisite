import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const message404: IPromoBlock = {
    title: "404",
    subtitle: "No hemos encontrado la página que estás buscando.",
    links: [
        {
            href: "/",
            name: "Página de inicio"
        },
        {
            href: "/contactanos",
            name: "Contáctanos"
        }
    ]
};

const message500: IPromoBlock = {
    title: "500",
    subtitle: "¡Ups! Algo salió mal. Si el error continua comuníquese con el administrador.",
    links: [
        {
            href: "/",
            name: "Página de inicio"
        },
        {
            href: "/contactanos",
            name: "Contáctanos"
        }
    ]
};

export const mocksErrorBlockprops = {
    message404,
    message500
};