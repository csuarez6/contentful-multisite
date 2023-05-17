import { act, render, screen, fireEvent } from '@testing-library/react'
import { data } from './Accordion.mocks';
import Accordion from './Accordion.tsx'
import '@testing-library/jest-dom'


describe('Accordion Base', () => {
  it('renders', async () => {
    render(<Accordion {...data}/>);
    const button = await screen.getAllByRole('button');
    await act(() => {
      button.forEach(item => {
        fireEvent.click(item);
      })
    });
  })
});
