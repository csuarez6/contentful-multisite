import { act, render, screen, fireEvent } from '@testing-library/react'
import {mockInfoCardProps} from './InfoCard.mocks'
import InfoCard from './InfoCard.tsx'
import '@testing-library/jest-dom'

describe('InfoCard Base', () => {
  it('renders', async () => {
    render(<InfoCard {...mockInfoCardProps.data}/>)
  })
});

describe('InfoCard with Button', () => {
  it('renders', async () => {
    render(<InfoCard {...mockInfoCardProps.dataWithButton}/>)
  })
});
