import { act, render, screen, fireEvent } from '@testing-library/react';
import { mockLeftFeaturedProps } from './LeftFeatured.mocks';
import LeftFeatured from './LeftFeatured.tsx';
import '@testing-library/jest-dom';

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
  });
});

describe('LeftFeatured Base', () => {
  it('renders', async () => {
    render(<LeftFeatured {...mockLeftFeaturedProps.data} />)
  })
});
