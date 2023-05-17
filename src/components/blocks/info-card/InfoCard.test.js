import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import InfoCard from './InfoCard';
import { mockInfoCardProps } from './InfoCard.mocks'

describe('InfoCard', () => {
    test('renders', async () => {
        render(<InfoCard {...mockInfoCardProps.data} />);
    });
})

describe('InfoCard left', () => {
    test('renders', async () => {
        render(<InfoCard {...mockInfoCardProps.left} />);
    });
})