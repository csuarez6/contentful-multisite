import { act, render, screen, fireEvent } from '@testing-library/react'
import { mockSearchCardProps } from './SearchCard.mocks'
import SearchCard from './SearchCard'
import '@testing-library/jest-dom'

describe('Search card data', () => {
    it('renders', async () => {
        render(<SearchCard {...mockSearchCardProps.data} />)
    })
});

describe('Search card  data whit button', () => {
    it('renders', async () => {
        render(<SearchCard {...mockSearchCardProps.dataWithButton} />)
    })
});

