import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BannerSlider from './BannerSlider';
import { mockBannerSliderProps } from './BannerSlider.mocks'

describe('BannerSlider', () => {
    test('renders', async () => {
        render(<BannerSlider {...mockBannerSliderProps.data} />);
    });
})
