export interface IListLinks {
  name: string,
  href: string,
  icon?: any
}

export interface IListItems {
  name: string,
  list: IListLinks[]
};