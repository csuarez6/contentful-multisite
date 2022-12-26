export interface ILink {
  name: string,
  href: string,
  icon?: string,
  isExternal?: boolean,
  buttonType?: string
}

export interface IListItems {
  name?: string,
  list: ILink[]
};