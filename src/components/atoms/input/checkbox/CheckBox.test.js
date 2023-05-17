import { act, render, screen, fireEvent } from '@testing-library/react'
import { dataCheckBox } from './CheckBox.mocks';
import CheckBox from './CheckBox.tsx'
import '@testing-library/jest-dom'

describe('CheckBox Base', () => {
  it('renders', async () => {
    render(<CheckBox {...dataCheckBox}/>)
    await act(async () => {
      const checkbox = await screen.getByTestId('checkbox');
      fireEvent.click(checkbox);
    });
  })
});