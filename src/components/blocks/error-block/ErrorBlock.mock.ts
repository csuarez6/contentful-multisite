import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
    title: "404",
    subtitle: "No hemos encontrado la página que estás buscando.",
    links: [
        {
            href: "/",
            name: "Página de inicio"
        },
        {
            href: "#",
            name: "Contáctenos"
        }
    ]
};

export const mocksErrorBlockprops = {
    data
};