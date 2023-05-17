import { act, render, screen, fireEvent } from '@testing-library/react'
import {  mockVerticalCardGrillProps } from './VerticalCardGrill.mocks'
import VerticalCardGrill from './VerticalCardGrill'
import '@testing-library/jest-dom'

describe('Vertical card grill data', () => {
    it('renders', async () => {
        render(<VerticalCardGrill {...mockVerticalCardGrillProps.data} />)
    })
});

describe('Vertical card data grill portrait', () => {
    it('renders', async () => {
        render(<VerticalCardGrill {...mockVerticalCardGrillProps.portrait} />)
    })
});

