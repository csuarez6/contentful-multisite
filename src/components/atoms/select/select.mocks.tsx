import { IIcon } from "../icon/Icon";

export interface ISelect {
    icon: IIcon,
    listContened: IListContened[],
    labelSelect?: string,
    onClick?: (e: any) => void,
    value?: string | number,
    classes?: string,
    optionDefault: string
}
interface IListContened {
    value: string,
    label: string
}

export const dataSelect: ISelect = {
    icon: {
        icon:'blue-flame',
        size: 24,
        className: 'absolute -z-10'
    },
    listContened: [
        { 
            label: 'Value 1',
            value: 'value1'
        },
        {
            label: 'Value 2',
            value: 'value2'
        },
        {
            label: 'Value 3',
            value: 'value3'
        },
        {
            label: 'Value 2',
            value: 'value2'
        },
        {
            label: 'Value 3',
            value: 'value3'
        },
        {
            label: 'Value 2',
            value: 'value2'
        },
        {
            label: 'Value 3',
            value: 'value3'
        }
    ],
    labelSelect: 'Instala tu gasodoméstico',
    classes:'w-full',
    optionDefault: 'Contrata el servicio'
};