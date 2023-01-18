import { ISelect } from '@/components/atoms/select-atom/SelectAtom';
import { ICarousel } from '@/components/organisms/carousel/Carousel';
import { IImageAsset } from './assets-cf.interface';
import { ILink } from './menu-cf.interface';


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

interface IMainFeature {
  name: string;
  description: string;
}

interface IFeatures {
  main?: IMainFeature[];
  description?: string[];
  warranty?: string[];
}

export interface IProductDetails {
  productName?: string;
  price?: string;
  description?: string;
  images?: IImageAsset[];
  details?: string[];
  paymentMethods?: IPaymentMethod[];
  onBuy?: (type: PaymentMethodType, skuCode: string) => void
  features?: IFeatures;
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

export interface IProductOverviewDetails {
  promoTitle?: string;
  price?: string;
  description?: string;
  images?: IImageAsset[];
  productFeatures?: any;
  paymentMethods?: IPaymentMethod[];
  onBuy?: (type: PaymentMethodType, skuCode: string) => void
  features?: any;
  cta?: ILink;
  state?: string;
  promotion?: string;
  priceBefore?: string;
  productsQuantity?: string;
  sku?: string;
  imagesCollection?: {
    items?: IImageAsset[];
  };
  dataSelect?: ISelect[];
  rating?: number;
  footerText?: any;
}