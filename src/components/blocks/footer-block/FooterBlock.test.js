import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FooterBlock from './FooterBlock';
import { mockFooterBlockProps } from "./FooterBlock.mocks"

describe('FooterBlock', () => {
    test('renders', async () => {
        render(<FooterBlock {...mockFooterBlockProps?.data} />);
        const firstItem = mockFooterBlockProps?.data?.mainNavCollection?.items?.[0];
        const uniqueId = `accordion-button-${firstItem.name}`;
        const accordion = screen.getByTestId(uniqueId);
        fireEvent.click(accordion);
    });
})