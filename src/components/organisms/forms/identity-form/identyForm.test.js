import { act, render, screen, fireEvent } from '@testing-library/react'
import IdentyForm from './IdentityForm'
import '@testing-library/jest-dom'


describe('identyForm', () => {
    it('render', () => {
        const { getByLabelText, getByText } = render(<IdentyForm />);
        const input1 = getByLabelText("Ingresa el documento de identidad del técnico sin puntos.", { selector: "input" })
        fireEvent.change(input1,{target: {value:324323}})
        const input2 = getByLabelText("Ingresa el número de 5 dígitos ubicado debajo del código QR del carné del técnico.", { selector: "input" })
        fireEvent.change(input2,{target: {value:344344}})
        
    })
})

