import { act, render, screen, fireEvent } from '@testing-library/react'
import {mocksSelectInputProps} from "./SelectInput.mocks"
import SelectInput from './SelectInput.tsx'
import '@testing-library/jest-dom'
describe('SelectInput Base', () => {
  it('renders', async () => {
    render(<SelectInput {...mocksSelectInputProps.data}/>)
    await act(async () => {
      const select = await screen.getByTestId('select');
      fireEvent.change(select);
    });
  })
});

describe('SelectInput Error', () => {
  it('renders', async () => {
    render(<SelectInput {...mocksSelectInputProps.dataError}/>)
    await act(async () => {
      const select = await screen.getByTestId('select');
      fireEvent.change(select);
    });
  })
});