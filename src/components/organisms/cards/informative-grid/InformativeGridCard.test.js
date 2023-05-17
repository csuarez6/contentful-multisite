import { act, render, screen, fireEvent } from '@testing-library/react'
import {mockInformativeGridCardProps} from './InformativeGridCard.mocks'
import InformativeGridCard from './InformativeGridCard.tsx'
import '@testing-library/jest-dom'

describe('InformativeGridCard Base', () => {
  it('renders', async () => {
    render(<InformativeGridCard {...mockInformativeGridCardProps.data}/>)
  })
});
