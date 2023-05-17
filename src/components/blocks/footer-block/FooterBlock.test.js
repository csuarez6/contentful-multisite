import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FooterBlock from './FooterBlock';
import { mockFooterBlockProps } from './FooterBlock.mocks'

describe('FooterBlock', () => {
    test('renders', async () => {
        render(<FooterBlock {...mockFooterBlockProps.data} />);
    });
})