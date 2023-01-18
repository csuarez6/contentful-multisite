import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface ICheckBox extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    id?: string,
    label?: string
}

export const dataCheckBox: ICheckBox = {
    label: 'Acepto usar la dirección de envió para el proceso de facturación',
    name: "mocks",
    checked: true
};