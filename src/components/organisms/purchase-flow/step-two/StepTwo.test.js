import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import StepTwo from './StepTwo';
import { mockStepTwoProps } from './StepTwo.mocks'

describe('Step Two', () => {
    test('renders', async () => {
        render(<StepTwo {...mockStepTwoProps.data} />);
    });
})