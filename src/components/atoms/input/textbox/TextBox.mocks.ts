import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface ITextBox extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string,
    htmlForLabel?:string,
    isError?: boolean,
    errorMessage?: string,
}

export const dataTextBox: ITextBox = {
    label: 'Diligencia la siguiente información para poder realizar el envío',
    placeholder: 'Bogotá'
};