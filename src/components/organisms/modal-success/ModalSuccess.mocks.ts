import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
    children: 'Contenido Hijo (HTML)',
    promoIcon: 'check',
    promoTitle: '¡Has creado tu cuenta Vanti!',
    subtitle: '¡Bienvenido al universo de Vanti, más formas de avanzar!',
};
const modalLayout: IPromoContent = {
    promoIcon: 'shopping-cart',
    promoTitle: 'Test pasarela de pagos',
    subtitle: 'Esta es una pasarela de pagos de prueba',
};
export const MocksModalSuccessProps = {
    data,
    modalLayout
};