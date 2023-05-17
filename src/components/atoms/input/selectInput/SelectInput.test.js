import { act, render, screen, fireEvent } from '@testing-library/react'
import SelectInput from './SelectInput.tsx'
import '@testing-library/jest-dom'

const dataSelect = {
  id: 1,
  label: "Select",
  placeholder: "---",
  options: [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3}
  ],
}

describe('SelectInput Base', () => {
  it('renders', async () => {
    render(<SelectInput {...dataSelect}/>)
    await act(async () => {
      const select = await screen.getByTestId('select');
      fireEvent.change(select);
    });
  })
});