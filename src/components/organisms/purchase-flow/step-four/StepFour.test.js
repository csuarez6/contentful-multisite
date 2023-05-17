import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import StepFour from './StepFour';
import { mockStepFourProps } from './StepFour.mocks'

describe('Step Four', () => {
    test('renders', async () => {
        render(<StepFour {...mockStepFourProps.data} />);
    });
})