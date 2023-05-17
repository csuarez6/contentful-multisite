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
  },
  iconBackgroundColor: 'Azul Claro'
};

const iconLeft: IPromoContent = {
  promoTitle: 'Title',
  promoIcon: 'invoice-filled',
  iconSize: 'medium',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  iconPosition: 'left',
  iconBackgroundColor: 'Azul Oscuro',
  internalLink:{
    urlPath: '#',
  },
  ctaLabel: 'Consultar'
};

const iconLeftRounded: IPromoContent = {
  promoTitle: 'Whatsapp',
  promoIcon: 'whatsapp',
  iconPosition: 'left',
  iconSize: 'small',
  iconBackgroundColor: 'Blanco',
  internalLink:{
    urlPath: '#',
  },
  ctaLabel: 'Consultar'
};

const iconLeftNoTitle: IPromoContent = {
  promoIcon: 'invoice-filled',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  iconPosition: 'left',
  iconBackgroundColor: 'Transparente',
  internalLink:{
    urlPath: '#',
  },
  ctaLabel: 'Consultar'
};

const iconLeftNoDescription: IPromoContent = {
  promoTitle: 'Title',
  promoIcon: 'invoice-filled',
  iconPosition: 'left',
  iconBackgroundColor: '',
  internalLink:{
    urlPath: '#',
  },
  ctaLabel: 'Consultar'
};

export const mockListWithIconsProps = {
  data,
  iconLeft,
  iconLeftRounded,
  iconLeftNoTitle,
  iconLeftNoDescription
};