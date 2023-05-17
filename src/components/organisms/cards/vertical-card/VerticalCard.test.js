import { act, render, screen, fireEvent } from '@testing-library/react'
import { mockVerticalCardProps } from './VerticalCard.mocks'
import VerticalCard from './VerticalCard'
import '@testing-library/jest-dom'

describe('Vertical card data', () => {
    it('renders', async () => {
        render(<VerticalCard {...mockVerticalCardProps.data} />)
    })
});

describe('Vertical card data wiht buttons', () => {
    it('renders', async () => {
        render(<VerticalCard {...mockVerticalCardProps.dataWithButtons} />)
    })
});

