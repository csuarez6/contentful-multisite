export interface IListLinks {
  name: string,
  href: string,
  icon?: string | ((props?: any) => void),
}

export interface IListItems {
  name: string,
  list: IListLinks[]
};