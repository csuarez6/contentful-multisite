export interface IInquiryForm {
    title?: string,
    subTitle?: string,
    titleForm?: string,
    dataForm?: IDataForm[],
}
export interface IDataForm {
    name?: string,
    value?: string
}