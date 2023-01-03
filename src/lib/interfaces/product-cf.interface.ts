import { ISelect } from '@/components/atoms/select/select.mocks';
import { ICarousel } from '@/components/organisms/carousel/Carousel';
import { IImageAsset } from './assets-cf.interface';
import { ILink } from './menu-cf.interface';

interface IPaymentMethod {
  name: string;
  type: string;
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