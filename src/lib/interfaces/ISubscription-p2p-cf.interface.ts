export interface ISusbcription {
  reference: string,
  description: string,
  fields: {
    keyword: string,
    value: string,
    displayOn: string,
  },
}