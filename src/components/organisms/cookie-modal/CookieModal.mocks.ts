import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
    promoTitle: 'Política de Cookies',
    promoDescription: RICHTEXT_SHORT_SIMPLE
};
export const mocksCookieModalProps = {
    data
};