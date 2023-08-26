export interface IPayment {
  reference: string,
  description: string,
  amount: {
    currency: string,
    total: string | number,
    taxes?: [{
      kind: string,
      amount: string | number,
      base: string | number,
    }],
    details?: [{
      kind: string,
      amount: string | number,
    }],
  },
  allowPartial?: boolean,
  shipping?: {
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
    price: string | number,
    tax: string | number,
  }],
  fields?: [{
    keyword: string,
    value: string,
    displayOn: string,
  }],
  recurring?: {
    periodicity: string,
    interval: string,
    nextPayment: string,
    maxPeriods: string | number,
    dueDate: string,
    notificationUrl: string,
  },
  subscribe?: boolean,
  dispersion?: [{
    agreement?: string,
    agreementType: string,
    amount: {
      currency: string,
      total: string | number,
    },
  }],
  modifiers?: [{
    type: string,
    code: string | number,
    additional: {
      invoice: string,
    },
  }],
}