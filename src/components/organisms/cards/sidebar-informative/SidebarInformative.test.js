import { act, render, screen, fireEvent } from '@testing-library/react'
import {  mockSidebarInformativeProps } from './SidebarInformative.mock'
import SidebarInformative from './SidebarInformative'
import '@testing-library/jest-dom'

describe('Service line data', () => {
    it('renders', async () => {
        render(<SidebarInformative {...mockSidebarInformativeProps.data} />)
    })
});
