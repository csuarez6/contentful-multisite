import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import StepFive from './StepFive';
import { mockStepFiveProps } from './StepFive.mocks'

describe('Step Five', () => {
    test('renders', async () => {
        render(<StepFive {...mockStepFiveProps.data} />);
    });
})