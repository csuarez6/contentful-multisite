import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TopMenu from './TopMenu';
import { mockTopMenuProps } from './TopMenu.mocks'

describe('TopMenu', () => {
    test('renders', async () => {
        render(<TopMenu {...mockTopMenuProps.data} />);
    });
})