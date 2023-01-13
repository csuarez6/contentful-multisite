import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  promoTitle: 'Título',
  promoImage: {
    url: 'https://via.placeholder.com/660x500.png',
    title: 'circle'
  }
};

export const mockCarouselCategoriesProps = {
  data,
};