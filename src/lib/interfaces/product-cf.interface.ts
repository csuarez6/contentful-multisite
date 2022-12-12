import { IImageAsset } from './image-asset-cf.interface';

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
  features: IFeatures;
}