export interface ITextBox {
    id?: string,
    name?: string,
    type?: string,
    label?: string,
    value?: string | number,
    placeholder?: string,
    onChange?: (e: any) => void,
}

export const dataTextBox: ITextBox = {
    label: 'Diligencia la siguiente información para poder realizar el envío',
    placeholder: 'Bogotá'
};