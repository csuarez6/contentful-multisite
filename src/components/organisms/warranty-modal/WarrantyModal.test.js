import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WarrantyModal from './WarrantyModal';
import { MocksModalProps } from './WarrantyModal.mocks'

describe('WarrantyModal', () => {
    test('renders', async () => {
        render(<WarrantyModal {...MocksModalProps.data} />);
    });
})