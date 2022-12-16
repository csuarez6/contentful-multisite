export interface ILink {
  name: string,
  href: string,
  icon?: string,
  buttonType?: string
}

export interface IListItems {
  name: string,
  list: ILink[]
};