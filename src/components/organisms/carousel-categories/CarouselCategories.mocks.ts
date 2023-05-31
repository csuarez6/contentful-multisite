import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  promoTitle: "Promo Title",
  promoImage: {
    url: 'https://via.placeholder.com/660x500.png',
    title: 'circle',
    width: 660,
    height: 500
  },
  name: "Category Name",
  internalLink: { urlPaths: ["/path"] },
  linkParameters: "?param=value"
};

export const mockCarouselCategoriesProps = {
  data,
};