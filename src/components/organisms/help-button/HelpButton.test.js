import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HelpButton from './HelpButton';
import { MocksHelpButtonProps } from './HelpButton.mocks'

describe('help utton', () => {
    test('renders', async () => {
        const { getByTestId } = render(<HelpButton {...MocksHelpButtonProps.data} />);
        fireEvent.click(getByTestId('element'))
    });
})