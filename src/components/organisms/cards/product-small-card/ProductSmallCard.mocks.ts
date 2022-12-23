import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  title: 'Lámparas de gas',
  url: '#',
  ctaLabel: 'Ver más',
  image: {
    url: 'https://via.placeholder.com/1220x972.png',
    title: ''
  }
};

const dataPortrait: IPromoContent = {
  title: 'Lámparas de gas',
  url: '#',
  ctaLabel: 'Ver más',
  image: {
    url: 'https://via.placeholder.com/1220x972.png',
    title: '',
    isPortrait: true
  },
};

export const mockProductCardProps = {
  data,
  dataPortrait
};
