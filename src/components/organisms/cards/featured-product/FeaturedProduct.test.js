import { act, render, screen, fireEvent } from '@testing-library/react'
import {mockFeaturedProductProps} from './FeaturedProduct.mock'
import FeaturedProduct from './FeaturedProduct.tsx'
import '@testing-library/jest-dom'

describe('FeaturedProduct Base', () => {
  it('renders', async () => {
    render(<FeaturedProduct {...mockFeaturedProductProps.data}/>)
  })
});

describe('FeaturedProduct Fecth', () => {
  it('renders', async () => {
    render(<FeaturedProduct {...mockFeaturedProductProps.fetch}/>)
  })
});

describe('FeaturedProduct List', () => {
  it('renders', async () => {
    render(<FeaturedProduct {...mockFeaturedProductProps.list}/>)
  })
});