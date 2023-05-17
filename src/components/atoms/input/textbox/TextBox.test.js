import { act, render, screen, fireEvent } from '@testing-library/react'
import { dataTextBox } from './TextBox.mocks';
import TextBox from './TextBox.tsx'
import '@testing-library/jest-dom'

describe('TextBox Base', () => {
  it('renders', async () => {
    render(<TextBox {...dataTextBox}/>)
    await act(async () => {
      const textbox = await screen.getByTestId('textbox');
      fireEvent.change(textbox, {value: 1234});
    });
  })
});

describe('TextBox Type Password', () => {
  it('renders', async () => {
    render(<TextBox {...dataTextBox} type="password"/>)
    await act(async () => {
      const textbox = await screen.getByTestId('textbox');
      fireEvent.change(textbox, {value: 1234});

      const button = await screen.getByTestId('button');
      fireEvent.click(button);
    });
  })
});