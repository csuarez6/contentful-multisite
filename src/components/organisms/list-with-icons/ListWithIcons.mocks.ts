import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  promoTitle: 'Title',
  promoIcon: 'invoice-filled',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  iconPosition: 'top',
  cta: {
    href: '#',
    name: 'button'
  }
};

const iconLeft: IPromoContent = {
  promoTitle: 'Title',
  promoIcon: 'invoice-filled',
  iconSize: 'medium',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  iconPosition: 'left'
};

const iconLeftRounded: IPromoContent = {
  promoTitle: 'Whatsapp',
  promoIcon: 'whatsapp',
  iconPosition: 'left',
  iconSize: 'small',
  iconBackgroundColor: 'Azul Claro',
  internalLink:{
    urlPath: '#',
  },
  ctaLabel: 'Consultar'
};

const iconLeftNoTitle: IPromoContent = {
  promoIcon: 'invoice-filled',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  iconPosition: 'left'
};

const iconLeftNoDescription: IPromoContent = {
  promoTitle: 'Title',
  promoIcon: 'invoice-filled',
  iconPosition: 'left'
};

export const mockListWithIconsProps = {
  data,
  iconLeft,
  iconLeftRounded,
  iconLeftNoTitle,
  iconLeftNoDescription
};