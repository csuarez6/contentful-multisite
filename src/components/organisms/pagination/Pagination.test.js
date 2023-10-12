import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
    test('renders', async () => {
        render(<Pagination currentPage={0}  pageRange={3} totalPages={10} />);
    });
})