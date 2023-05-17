import { act, render, screen, fireEvent } from '@testing-library/react'
import {mockOrderCardProps} from './OrderCard.mocks'
import OrderCard from './OrderCard.tsx'
import '@testing-library/jest-dom'

describe('OrderCard Base', () => {
  it('renders', async () => {
    render(<OrderCard {...mockOrderCardProps.data}/>)
  })
});
