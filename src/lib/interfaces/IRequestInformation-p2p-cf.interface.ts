import { RequestStatus } from "../enum/ERequestStatus-p2p.enum";
import { IPayment } from "./IPayment-p2p-cf.interface";
import { IPerson } from "./IPerson-p2p-cf.interface";
import { ISusbcription } from "./ISubscription-p2p-cf.interface";

export interface IDiscount {
  base: string,
  code: string,
  type: string,
  amount: string | number,
}

export interface IDispersion {
  status: {
    status: RequestStatus,
    reason?: string,
    message?: string,
    date: string,
  },
  internalReference: number,
  reference: string,
  paymentMethod: string,
  paymentMethodName: string,
  issuerName: string,
  amount: {
    from: {
      currency: string,
      total: string | number,
    },
    to: {
      currency: string,
      total: string | number,
    },
    factor: string,
  },
  receipt: string,
  franchise: string
  refunded: boolean,
  authorization: string,
  processorFields: {
    keyword: string,
    value: string,
    displayOn: string,
  },
  dispersion?: IDispersion,
  agreement?: string,
  agreementType?: string,
  discount?: IDiscount
  subscription: boolean
}

export interface IStatus {
  status: RequestStatus,
  reason?: string,
  message?: string,
  date: string,
}

export interface IRequestInformation {
  requestId: string,
  status: IStatus,
  request: {
    locale: string,
    payer: IPerson,
    buyer: IPerson,
    payment: IPayment,
    subscription: ISusbcription,
    fields: {
      keyword: string,
      value: string,
      displayOn: string,
    }
    paymentMethod: string,
    expiration: string,
    returnUrl: string,
    cancelUrl: string,
    ipAddress: string,
    userAgent: string,
    skipResult: boolean,
    noBuyerFill: boolean,
    type: string,
  },
  payment: {
    status: IStatus,
    internalReference: number,
    reference: string,
    paymentMethod: string,
    paymentMethodName: string,
    issuerName: string,
    amount: {
      from: {
        currency: string,
        total: string,
      },
      to: {
        currency: string,
        total: string,
      },
      factor: string,
    },
    receipt: string,
    franchise: string,
    refunded: boolean,
    authorization: string,
    processorFields: {
      keyword: string,
      value: string,
      displayOn: string,
    },
    dispersion?: IDispersion
    agreement: string,
    agreementType: string,
    discount: IDiscount,
    subscription: string,
  },
  subscription?: {
    status: IStatus,
    type: string,
    instrument: {
      keyword: string,
      value: string,
      displayOn: string,
    }
  }
}