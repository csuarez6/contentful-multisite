import { act, render, screen, fireEvent } from '@testing-library/react'
import { data } from './Accordion.mocks';
import Accordion from './Accordion.tsx'
import '@testing-library/jest-dom'

jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));
// jest.mock("@/lib/services/render-blocks.service", () => ({
//   attachLinksToRichtextContent: jest.fn(),
// }));
jest.mock("@/lib/services/render-cards.service", () => jest.fn());

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
