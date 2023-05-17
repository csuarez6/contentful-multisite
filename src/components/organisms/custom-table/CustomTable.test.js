import { act, render, screen, fireEvent } from '@testing-library/react'
import { mockTabsProps } from './CustomTable.mocks'
import CustomTable from './CustomTable'
import '@testing-library/jest-dom'


describe('CustomTable dataTable', () => {
    it('renders', async () => {
        const { container, getByText } = render(
            <CustomTable>
                <tr>
                    <th>Columna 1</th>
                    <th>Columna 2</th>
                    <th>Columna 3</th>
                    <th>Columna 4</th>
                </tr>
            </CustomTable>
        )
        const controls = container.getElementsByClassName("cursor-pointer text-neutral-20")
        
        Array.from(controls).forEach((el) => {
            fireEvent.click(el)
        })
        const e = document.createEvent("TouchEvent")
        e.initEvent("touchstart", true, true)
        container.dispatchEvent(e)
        expect(getByText(/Columna 1/i)).toBeTruthy()
    })

});

