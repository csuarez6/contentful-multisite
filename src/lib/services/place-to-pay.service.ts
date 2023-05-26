import { base64 } from 'base-64';
import { randomBytes } from 'crypto';
import { sha1 } from 'sha1';

export enum RequestStatus {
  approved = 'APPROVED',
  pending = 'PENDING',
  rejected = 'REJECTED',
  partial_expired = 'PARTIAL_EXPIRED',
  approved_partial = 'APPROVED_PARTIAL',
  failed = 'FAILED',
}

export interface IAddress {
  street: string,
  city: string,
  state: string,
  postalCode: string,
  country: string,
  phone: string,
}

export interface IAuth {
  login: string,
  tranKey: string,
  nonce: string,
  seed: string,
}

export interface IDiscount {
  base: string,
  code: string,
  type: string,
  amount: string|number,
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
      total: string|number,
    },
    to: {
      currency: string,
      total: string|number,
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

export interface IPerson {
  document: string,
  documentType: string,
  name: string,
  surname: string,
  company: string,
  email: string,
  mobile: string,
  address: IAddress,
}

export interface IStatus {
  status: RequestStatus,
  reason?: string,
  message?: string,
  date: string,
}

export interface ITaxes {
  kind: string,
  amount: string,
  base: string,
}

export interface ICreateRequest {
  locale: string,
  auth: IAuth,
  payer: IPerson,
  buyer: IPerson,
  payment: {
    reference: string,
    description: string,
    amount: {
      currency: string,
      total: string|number,
      taxes?: [{
        kind: string,
        amount: string|number,
        base: string|number,
      }],
      details?: [{
        kind: string,
        amount: string|number,
      }],
    },
    allowPartial: boolean,
    shipping: {
      document: string,
      documentType: string,
      name: string,
      surname: string,
      company: string,
      email: string,
      mobile: string,
      address: {
        street: string,
        city: string,
        state: string,
        postalCode: string,
        country: string,
        phone: string,
      },
    },
    items?: [{
      sku: string,
      name: string,
      category: string,
      qty: string,
      price: string|number,
      tax: string|number,
    }],
    fields?: [{
      keyword: string,
      value: string,
      displayOn: string,
    }],
    recurring: {
      periodicity: string,
      interval: string,
      nextPayment: string,
      maxPeriods: string|number,
      dueDate: string,
      notificationUrl: string,
    },
    subscribe: boolean,
    dispersion?: [{
      agreement?: string,
      agreementType: string,
      amount: {
        currency: string,
        total: string|number,
      },
    }],
    modifiers?: [{
      type: string,
      code: string|number,
      additional: {
        invoice: string,
      },
    }],
  },
  subscription: {
    reference: string,
    description: string,
    fields: {
      keyword: string,
      value: string,
      displayOn: string,
    },
  },
  fields: [{
    keyword: string,
    value: string|object|[],
    displayOn: string,
  }],
  paymentMethod: string,
  expiration: string,
  returnUrl: string,
  cancelUrl: string,
  ipAddress: string,
  userAgent: string,
  skipResult: boolean,
  noBuyerFill: boolean,
  type: string,
}

export interface IRequest {
  status: {
    status: RequestStatus,
    reason?: string,
    message?: string,
    date: string
  },
  requestId?: string|number,
  processUrl?: string
}

export interface IRequestInformation {
  requestId: string,
  status: IStatus,
  request: {
    locale: string,
    payer: IPerson,
    buyer: IPerson,
    payment: {
      reference: string,
      description: string,
      amount: {
        currency: string,
        total: string,
        taxes?: ITaxes,
        details?: {
          kind: string,
          amount: string,
        }
      },
      allowPartial: boolean,
      shipping: IPerson,
      items?: {
        sku: string,
        name: string,
        category: string,
        qty: string,
        price: string,
        tax: string,
      }
      fields?: {
        keyword: string,
        value: string,
        displayOn: string,
      }
      recurring: {
        periodicity: string,
        interval: string,
        nextPayment: string,
        maxPeriods: string,
        dueDate: string,
        notificationUrl: string,
      },
      subscribe: boolean,
      dispersion?: {
        agreement: string,
        agreementType: string,
        amount: {
          currency: string,
          total: string,
          taxes: ITaxes,
        },
      }
      modifiers?: {
        type: string,
        code: number,
        additional: {
          invoice: string,
        },
      }
    },
    subscription: {
      reference: string,
      description: string,
      fields: {
        keyword: string,
        value: string,
        displayOn: string,
      },
    },
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

const PLACE_TO_PAY_ENDPOINT = process.env.PLACE_TO_PAY_URL_TEST;
const PLACE_TO_PAY_LOGIN = process.env.PLACE_TO_PAY_LOGIN;
const PLACE_TO_PAY_SECRET_KEY = process.env.PLACE_TO_PAY_SECRET_KEY;

const generateNonce = () => {
  try {
    const nonceBuffer = randomBytes(16);
    return nonceBuffer.toString('hex');
  } catch (error) {
    console.error('Error generating nonce:', error);
    return Math.random().toString();
  }
};

const generateSeed = () => {
  const current = new Date().toISOString();
  const currentDate = new Date(current);
  currentDate.setMinutes(currentDate.getMinutes() + 2);
  const seed = currentDate.toISOString();
  return seed;
};

const generateTranKey = (nonce: string, seed: string, tranKey: string) => {
  const tranKeyBase64 = base64.encode(sha1(nonce + seed + tranKey, { encoding: 'binary' }));
  return tranKeyBase64;
};

export const getAuth = () => {
  const seed = generateSeed();
  const nonce = generateNonce();
  const tranKeyBase64 = generateTranKey(nonce, seed, PLACE_TO_PAY_SECRET_KEY);
  const nonceBase64 = base64.encode(nonce);
  
  const authOptions: IAuth = {
    login: PLACE_TO_PAY_LOGIN,
    seed: seed,
    tranKey: tranKeyBase64,
    nonce: nonceBase64,
  };

  return authOptions;
};

export const createRequest = async (): Promise<IRequest> => {
  const authOptions = getAuth();

  const bodyRequest: ICreateRequest = {
    locale: 'es_CO',
    auth: authOptions,
    payer: {
      document: "1122334455",
      documentType: "CC",
      name: "John",
      surname: "Doe",
      company: "Evertec",
      email: "johndoe@app.com",
      mobile: "+5731111111111",
      address: {
        street: "Calle falsa 123",
        city: "Medellín",
        state: "Poblado",
        postalCode: "55555",
        country: "Colombia",
        phone: "+573111111111"
      }
    },
    buyer: {
      document: "1122334455",
      documentType: "CC",
      name: "John",
      surname: "Doe",
      company: "Evertec",
      email: "johndoe@app.com",
      mobile: "+5731111111111",
      address: {
        street: "Calle falsa 123",
        city: "Medellín",
        state: "Poblado",
        postalCode: "55555",
        country: "Colombia",
        phone: "+573111111111"
      }
    },
    payment: {
      reference: "12345",
      description: "Prueba de pago",
      amount: {
        currency: "COP",
        total: 2000,
        taxes: [
          {
            kind: "valueAddedTax",
            amount: 1000,
            base: 0
          }
        ],
        details: [
          {
            kind: "discount",
            amount: 1000
          }
        ]
      },
      allowPartial: false,
      shipping: {
        document: "1122334455",
        documentType: "CC",
        name: "John",
        surname: "Doe",
        company: "Evertec",
        email: "johndoe@app.com",
        mobile: "+5731111111111",
        address: {
          street: "Calle falsa 123",
          city: "Medellín",
          state: "Poblado",
          postalCode: "55555",
          country: "Colombia",
          phone: "+573111111111"
        }
      },
      items: [
        {
          sku: "12345",
          name: "product_1",
          category: "physical",
          qty: "1",
          price: 1000,
          tax: 0
        }
      ],
      fields: [
        {
          keyword: "_test_field_value_",
          value: "_test_field_",
          displayOn: "approved"
        }
      ],
      recurring: {
        periodicity: "D",
        interval: "1",
        nextPayment: "2019-08-24",
        maxPeriods: 1,
        dueDate : "2019-09-24",
        notificationUrl : "https://checkout.placetopay.com"
      },
      subscribe: false,
      dispersion: [
        {
          agreement: "1299",
          agreementType: "MERCHANT",
          amount: {
            currency: "USD",
            total: 200
          }
        }
      ],
      modifiers: [
        {
          type: "FEDERAL_GOVERNMENT",
          code: 17934,
          additional: {
            invoice: "123345"
          }
        }
      ]
    },
    subscription: {
      reference: "12345",
      description: "Ejemplo de descripción",
      fields: {
        keyword: "1111",
        value: "lastDigits",
        displayOn: "none"
      }
    },
    fields: [
      {
        keyword: "_processUrl_",
        value: "https://checkout.redirection.test/session/1/a592098e22acc709ec7eb30fc0973060",
        displayOn: "none"
      }
    ],
    paymentMethod: "visa",
    expiration: "2019-08-24T14:15:22Z",
    returnUrl: "https://commerce.test/return",
    cancelUrl: "https://commerce.test/cancel",
    ipAddress: "127.0.0.1",
    userAgent: "PlacetoPay Sandbox",
    skipResult: false,
    noBuyerFill: false,
    type: "checkin"
  };

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify(bodyRequest)
  };

  try {
    const response = await fetch(PLACE_TO_PAY_ENDPOINT, options);
    const data = await response.json() as IRequest;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getRequestInformation = async (requestId: string) => {
  const authOptions = getAuth();
  const url = PLACE_TO_PAY_ENDPOINT + '/' + requestId;

  const bodyRequest = {
    auth: authOptions,
  };

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify(bodyRequest)
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json() as IRequestInformation;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
