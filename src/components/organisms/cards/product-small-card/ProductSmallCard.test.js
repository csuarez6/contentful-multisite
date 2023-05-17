import { act, render, screen, fireEvent } from '@testing-library/react'
import {mockProductCardProps} from './ProductSmallCard.mocks'
import ProductSmallCard from './ProductSmallCard'
import '@testing-library/jest-dom'

describe('Product small Card  data', () => {
  it('renders', async () => {
    render(<ProductSmallCard {...mockProductCardProps.data}/>)
  })
});

describe('Product small Card   dataPortrair', () => {
  it('renders', async () => {
    render(<ProductSmallCard {...mockProductCardProps.dataPortrait}/>)
  })
});

