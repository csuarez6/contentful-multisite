import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import StepOne from './StepOne';
import { mockStepOneProps } from './StepOne.mocks'

describe('Step One', () => {
    test('renders', async () => {
        render(<StepOne {...mockStepOneProps.data} />);
    });
})