import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Verify from './verify';
import {data} from "./CallbackVantilisto"

describe('Verify', () => {
    test('renders', async () => {
        render(<Verify {...data} setFormData={jest.fn()} handleNext={jest.fn()}/>);
        const minus = screen.getByTestId("minus");
        const plus = screen.getByTestId("plus");

        fireEvent.click(minus);
        fireEvent.click(plus);

        const submit = screen.getByTestId("submit");
        fireEvent.click(submit);
    });
})
