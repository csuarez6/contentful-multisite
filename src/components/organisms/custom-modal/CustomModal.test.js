import { act, render, screen, fireEvent } from '@testing-library/react'
import {  MocksModalProps  } from './CustomModal.mocks'
import CustomModal from './CustomModal'
import '@testing-library/jest-dom'

describe('CustomModal data', () => {
    it('renders', async () => {
        render(<CustomModal {...MocksModalProps.data}/>)
    })
});

