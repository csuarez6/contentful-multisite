import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Tabs from './Tabs';
import { mockTabsProps } from './Tabs.mocks'

describe('Tabs', () => {
    test('renders', async () => {
        render(<Tabs {...mockTabsProps.dataTab} />);
    });
})