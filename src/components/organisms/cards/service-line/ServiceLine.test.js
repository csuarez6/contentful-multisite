import { act, render, screen, fireEvent } from '@testing-library/react'
import { mockServiceLineProps } from './ServiceLine.mocks'
import ServiceLine from './ServiceLine'
import '@testing-library/jest-dom'

describe('Service line data', () => {
    it('renders', async () => {
        render(<ServiceLine {...mockServiceLineProps.data} />)
    })
});


