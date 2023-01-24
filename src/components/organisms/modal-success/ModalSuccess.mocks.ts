import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
    children: 'Contenido Hijo (HTML)',
    promoIcon: 'check',
    promoTitle: '¡Has creado tu cuenta Vanti!',
    subtitle: '¡Bienvenido al universo de Vanti, más formas de avanzar!',
};
export const MocksModalSuccessProps = {
    data
};