import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Modal from './ModalWarnning';

describe('ModalWarnning', () => {
    test('renders', async () => {
        render(<Modal open={false} setOpen={jest.fn()} />);
    });
})