import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import InquiryForm from './InquiryForm';
import { mockInquiryFormsProps } from './InquiryForm.mocks'

describe('InquiryForm', () => {
    test('renders', async () => {
        const {getByText, getByLabelText, getByRole} =render(<InquiryForm {...mockInquiryFormsProps.dataRPO} />);
        const input1 = getByLabelText(`Escribe el número de tu cuenta contrato* *(Lo encuentras en la parte superior izquierda de tu factura del gas).`, {selector:'input'})
        fireEvent.change(input1, {target: {value: 123456789}})
        const input2 = getByLabelText(`Escribe tu número celular`, {selector:'input'})
        fireEvent.change(input2, {target: {value: 1111223232}})
        const input3 = getByLabelText(`Escribe tu número de cédula`, {selector:'input'})
        fireEvent.change(input3, {target: {value: 123456789}})
        // const button = getByRole('button', {name: 'Consulta la fecha'})
        // fireEvent.click(button)
        getByText('Escribe tu número celular')
        
        expect(getByText('Escribe tu número de cédula')).toBeInTheDocument()
    });
})