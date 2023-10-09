import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import PersonalData from './personal-data';

describe('PersonalData', () => {
    test('renders', async () => {
        render(<PersonalData />);
    });
})
