import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Modal from './ModalSuccess';
import { MocksModalSuccessProps } from './ModalSuccess.mocks'

describe('Modal succsess', () => {
    test('renders', async () => {
        const { getByRole } = render(<Modal {...MocksModalSuccessProps.data} />);
        fireEvent.click(getByRole('button'))
    });
})