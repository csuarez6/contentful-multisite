import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FuneralPlans from './FuneralPlans';
import { mockFuneralPlansProps } from './FuneralPlans.mocks'

describe('FuneralPlans', () => {
    test('renders', async () => {
        render(<FuneralPlans {...mockFuneralPlansProps.data} />);
    });
})