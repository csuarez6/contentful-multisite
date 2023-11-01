import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import WarrantyModal from './WarrantyModal';
import { MocksModalProps } from './WarrantyModal.mocks'

describe('WarrantyModal', () => {
    test('renders', async () => {
        render(<WarrantyModal {...MocksModalProps.data} />);
    });
})