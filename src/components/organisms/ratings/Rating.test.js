import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Rating from './Rating';
import { data } from './rating.mock'

describe('Rating', () => {
    test('renders', async () => {
        render(<Rating {...data} />);
    });
})