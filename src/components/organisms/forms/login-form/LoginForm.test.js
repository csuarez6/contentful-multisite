import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { mockLoginFormProps } from './LoginForm.mocks'

describe('LoginForm', () => {
    test('renders', async () => {
        render(<LoginForm {...mockLoginFormProps.data} />);
        
    });
})