export interface IAddress {
  street: string,
  city: string,
  state: string,
  postalCode: string,
  country: string,
  phone: string,
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