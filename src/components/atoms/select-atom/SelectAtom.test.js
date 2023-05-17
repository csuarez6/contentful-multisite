import { act, render, screen, fireEvent } from '@testing-library/react'
import {dataSelect} from './SelectAtom.mocks'
import SelectAtom from './SelectAtom.tsx'
import '@testing-library/jest-dom'

dataSelect.handleChange = (e) =>  {console.log(e)}

describe('SelectAtom Base', () => {
  it('renders', async () => {
    render(<SelectAtom {...dataSelect}/>)
    await act(async () => {
      const select = await screen.getByTestId('select');
      fireEvent.change(select);
    });
  })
});