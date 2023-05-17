import { act, render, screen, fireEvent } from '@testing-library/react'
import { dataRadioBox } from './RadioBox.mocks';
import RadioBox from './RadioBox.tsx'
import '@testing-library/jest-dom'

describe('RadioBox Base', () => {
  it('renders', async () => {
    render(<RadioBox {...dataRadioBox}/>)
    await act(async () => {
      const radiobox = await screen.getByTestId('radiobox');
      fireEvent.click(radiobox);
    });
  })
});