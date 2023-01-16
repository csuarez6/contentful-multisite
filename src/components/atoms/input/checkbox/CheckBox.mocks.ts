export interface ICheckBox {
    id?: string,
    name?: string,
    label?: string,
    checked?: boolean,
}

export const dataCheckBox: ICheckBox = {
    label: 'Acepto usar la dirección de envió para el proceso de facturación',
    checked: true
};