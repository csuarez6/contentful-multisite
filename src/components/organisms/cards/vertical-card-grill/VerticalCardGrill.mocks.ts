import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

const data: IPromoContent = {
    promoTitle: 'Título',
    promoDescription: RICHTEXT_SHORT_SIMPLE,
    promoImage: {
        url: 'https://via.placeholder.com/1280x392.png',
        title: '',
    },
    cta: {
        href: "#",
        name: "Button"
    },
    externalLink: "#",
    alignButton: "Izquierda"
};

const portrait: IPromoContent = {
    promoTitle: 'Título',
    promoDescription: RICHTEXT_SHORT_SIMPLE,
    promoImage: {
        url: 'https://via.placeholder.com/1280x392.png',
        title: '',
        isPortrait: true
    },
    cta: {
        href: "#",
        name: "Button",
    },
    externalLink: "#",
    alignButton: "Izquierda"
};

export const mockVerticalCardGrillProps = {
    data,
    portrait
};
