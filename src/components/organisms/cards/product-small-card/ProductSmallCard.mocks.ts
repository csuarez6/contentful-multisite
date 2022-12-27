import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  promoTitle: 'Lámparas de gas',
  cta: {
    href: '#',
    name: 'Ver más',
  },
  promoImage: {
    url: 'https://via.placeholder.com/1220x972.png',
    title: ''
  }
};

const dataPortrait: IPromoContent = {
  promoTitle: 'Lámparas de gas',
  cta: {
    href: '#',
    name: 'Ver más',
  },
  promoImage: {
    url: 'https://via.placeholder.com/1220x972.png',
    title: '',
    isPortrait: true
  },
};

export const mockProductCardProps = {
  data,
  dataPortrait
};
