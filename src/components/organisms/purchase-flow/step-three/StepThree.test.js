import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import StepThree from './StepThree';
import { mockStepThreeProps } from './StepThree.mocks'

describe('Step three', () => {
    test('renders', async () => {
        render(<StepThree {...mockStepThreeProps.data} />);
    });
})