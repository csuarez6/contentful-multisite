import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SigUnpForm from './SignUpForm';
import { mockSignUpFormsProps } from './SignUpForm.mocks'

describe('signup form', () => {
    test('renders', async () => {
        render(<SigUnpForm {...mockSignUpFormsProps.data} />);
    });
})