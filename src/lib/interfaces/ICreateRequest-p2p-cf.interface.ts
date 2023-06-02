import { IPerson } from "./IPerson-p2p-cf.interface";
import { IPayment } from "./IPayment-p2p-cf.interface";
import { ISusbcription } from "./ISubscription-p2p-cf.interface";
import { IFields } from "./IExtraFields-p2p-cf.interface";
import { IAuth } from "./IAuth-p2p-cf.interface";

export interface ICreateRequest {
  locale: string,
  auth: IAuth,
  payer?: IPerson,
  buyer?: IPerson,
  payment?: IPayment,
  subscription?: ISusbcription,
  fields?: IFields,
  paymentMethod?: string,
  expiration: string,
  returnUrl: string,
  cancelUrl?: string,
  ipAddress: string,
  userAgent: string,
  skipResult?: boolean,
  noBuyerFill?: boolean,
  type?: string,
}