import { act, render, screen, fireEvent } from '@testing-library/react'
import { data } from './CustomLink.mocks';
import CustomLink from './CustomLink.tsx'
import '@testing-library/jest-dom'

describe('CustomLink Base', () => {
  it('renders', async () => {
    render(<CustomLink {...data}/>)
  })
});
