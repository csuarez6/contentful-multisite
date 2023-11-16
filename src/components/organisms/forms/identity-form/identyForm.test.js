import { act, render, screen, fireEvent, waitFor} from '@testing-library/react'
import IdentyForm from './IdentityForm'
import '@testing-library/jest-dom'

const fetchMock = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ result: { success: true } }),
    })
)

global.fetch = fetchMock;

describe('IdentyForm', () => {
    
    afterAll(() => {
        jest.clearAllMocks()
    })

    it("IdentyForm render", async () => {
        const form = await waitFor(() => render(<IdentyForm />));
        expect(form).toBeTruthy()
    });
    
    it("IdentyForm on Submit", async () => {

        const { getByLabelText, getByText } = await waitFor(() => render(<IdentyForm />));

        const identity = getByLabelText('Ingresa el documento de identidad del técnico sin puntos.')
        const qrCode = getByLabelText("Ingresa el número de 5 dígitos ubicado debajo del código QR del carné del técnico.");
        const button = getByText("Verificar identidad");

        await act(async () => {
            fireEvent.change(identity, { target: { value: "10019876" } });
            fireEvent.change(qrCode, { target: { value: "34657" } });
            fireEvent.click(button);
        })
    });
    
    it("IdentyForm on Submit error", async () => {
        
        fetchMock.mockImplementation(() =>
            Promise.reject({
                message: 'mock error',
            })
        );

        const { getByLabelText, getByText } = await waitFor(() => render(<IdentyForm />));

        const identity = getByLabelText('Ingresa el documento de identidad del técnico sin puntos.')
        const qrCode = getByLabelText("Ingresa el número de 5 dígitos ubicado debajo del código QR del carné del técnico.");
        const button = getByText("Verificar identidad");

        await act(async () => {
            fireEvent.change(identity, { target: { value: "10019876" } });
            fireEvent.change(qrCode, { target: { value: "34657" } });
            fireEvent.click(button);
        })
    });
})
