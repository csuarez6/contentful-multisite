import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

const data: IPromoContent = {
  promoTitle: 'Título',
  subtitle: 'Sub-Título',
  cta: {
    href: "#",
    name: "Comprar",
    buttonType: "button-primary"
  }
};

export const mockOrderCardProps = {
  data,
};
