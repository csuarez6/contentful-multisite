import { ISelect } from '@/components/atoms/select-atom/SelectAtom';
import { ICarousel } from '@/components/organisms/carousel/Carousel';
import { IImageAsset } from './assets-cf.interface';
import { ILink } from './menu-cf.interface';
import { IPromoBlock } from './promo-content-cf.interface';
import { IRichText } from './richtext-cf.interface';

export enum PaymentMethodType {
  pse = 'pse',
  vantilisto = 'vantilisto',
  factura = 'factura'
}

export interface IPaymentMethod {
  name: string;
  type: PaymentMethodType;
  helpText?: string;
}

/**
 * @deprecated Interfaz obsoleta
 */
export interface IProductDetails {
  productName?: string;
  price?: string;
  description?: string;
  images?: IImageAsset[];
  details?: string[];
  paymentMethods?: IPaymentMethod[];
  onBuy?: (type: PaymentMethodType, skuCode: string) => void
  features?: IRichText;
  cta?: ILink;
  state?: string;
  promotion?: string;
  priceBefore?: string;
  productsQuantity?: string;
  referenceCode?: number;
  carouselData?: ICarousel;
  dataSelect?: ISelect[];

  rating?: number;
}

export interface IProductFilterBlock {
  principalSearch?: boolean;
  products?: IPromoBlock;
  facets?: ISelect[];
  onFacetsChange?: (newQueryString: string) => void;
  type?: string;
  types?: any;
};

export interface IProductOverviewDetails {
  __typename?: string;
  name?: string;
  promoTitle?: string;
  urlPath?: string;
  price?: string;
  promoDescription?: IRichText;
  productFeatures?: IRichText;
  paymentMethods?: IPaymentMethod[];
  onBuy?: (type: PaymentMethodType, skuCode: string, imageProduct: string, nameProduct: string) => void
  onBuyHandler?: (type: PaymentMethodType) => Promise<boolean>,
  features?: IRichText;
  warranty?: {
    name?: string;
    description?: IRichText;
  };
  cta?: ILink;
  state?: string;
  callbackURL?: string;
  promotion?: string;
  priceBefore?: string;
  productsQuantity?: string;
  sku?: string;
  marketId?: string;
  promoImage?: IImageAsset;
  imagesCollection?: {
    items?: IImageAsset[];
  };
  dataSelect?: ISelect[];
  rating?: number;
  footerText?: any;
  trademark?: {
    name?: string;
    image?: IImageAsset;
  };
  category?: {
    name?: string;
    image?: IImageAsset;
  };
  relatedProducts?: IProductOverviewDetails[]
}

export interface IAllyOverviewDetails {
  __typename?: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  promoTitle?: string;
  promoDescription?: IRichText;
  promoImage?: IImageAsset;
  promoIcon?: string;
}