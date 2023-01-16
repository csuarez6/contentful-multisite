import { IIcon } from "../icon/Icon";

export interface IRadioBox {
    id?: string | number,
    name?: string,
    label?: string,
    checked?: boolean,
    icon?: IIcon
}

export const dataRadioBox: IRadioBox = {
    label: 'PSE (Cuenta de ahorros)',
    icon: 'alert'
};