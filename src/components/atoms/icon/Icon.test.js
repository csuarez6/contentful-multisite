import { act, render, screen, fireEvent } from '@testing-library/react'
import { mockIconProps } from './Icon.mocks';
import Icon from './Icon.tsx'
import '@testing-library/jest-dom'

describe('Icon Base', () => {
  it('renders', async () => {
    render(<Icon {...mockIconProps.dataIcon}/>)
  })
});
