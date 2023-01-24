import { ISelect } from '@/components/atoms/select-atom/SelectAtom';
import { ICarousel } from '@/components/organisms/carousel/Carousel';
import { IImageAsset } from './assets-cf.interface';
import { ILink } from './menu-cf.interface';
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

// interface IMainFeature {
//   name: string;
//   description: string;
// }

/* interface IFeatures {
  main?: IMainFeature[];
  description?: string[];
  warranty?: string[];
} */

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
  products?: any;
  rating?: number;
}

export interface IProductOverviewDetails {
  promoTitle?: string;
  urlPath?: string;
  price?: string;
  promoDescription?: IRichText;
  productFeatures?: IRichText;
  paymentMethods?: IPaymentMethod[];
  onBuy?: (type: PaymentMethodType, skuCode: string) => void
  features?: IRichText;
  warranty?: {
    name?: string;
    description?: IRichText;
  };
  cta?: ILink;
  state?: string;
  promotion?: string;
  priceBefore?: string;
  productsQuantity?: string;
  sku?: string;
  promoImage?: IImageAsset;
  imagesCollection?: {
    items?: IImageAsset[];
  };
  dataSelect?: ISelect[];
  rating?: number;
  footerText?: any;
}