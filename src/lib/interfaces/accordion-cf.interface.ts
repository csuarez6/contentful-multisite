export interface IAccordionList  {
    title?: string,
    content?: string
}
export interface IAccordion {
    listedContent: IAccordionList[]
}

export interface IAccordionBlock {
    content?: IAccordionList[],
    title?: string,
    description?: string
}