import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  promoTitle: 'Lámparas de gas',
  externalLink: '#',
  ctaLabel: 'Ver más',
  promoImage: {
    url: 'https://via.placeholder.com/1220x972.png',
    title: '',
    width: 300,
    height:300
  }
};

const dataPortrait: IPromoContent = {
  promoTitle: 'Lámparas de gas',
  externalLink: '#',
  ctaLabel: 'Ver más',
  promoImage: {
    url: 'https://via.placeholder.com/1220x972.png',
    title: '',
    isPortrait: true,
    width:300,
    height:300
  },
};

export const mockProductCardProps = {
  data,
  dataPortrait
};
