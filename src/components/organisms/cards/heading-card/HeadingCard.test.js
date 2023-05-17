import { act, render, screen, fireEvent } from '@testing-library/react'
import {mockHeadingCardProps} from './HeadingCard.mocks'
import HeadingCard from './HeadingCard.tsx'
import '@testing-library/jest-dom'

describe('HeadingCard Base', () => {
  it('renders', async () => {
    render(<HeadingCard {...mockHeadingCardProps.data}/>)
  })
});