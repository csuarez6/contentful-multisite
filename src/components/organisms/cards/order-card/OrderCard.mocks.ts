import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

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
