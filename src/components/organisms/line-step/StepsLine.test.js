import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import StepsLine from './StepsLine';
import { mockStepsLineProps } from './StepsLine.mocks'

describe('StepsLine', () => {
    test('renders', async () => {
        render(<StepsLine {...mockStepsLineProps.data} />);
    });
})