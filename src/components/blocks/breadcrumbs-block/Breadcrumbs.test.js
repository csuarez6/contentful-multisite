import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';
import { mocksBreadcrumbsProps } from './Breadcrumbs.mocks'

describe('Breadcrumbs', () => {
    test('renders', async () => {
        render(<Breadcrumbs {...mocksBreadcrumbsProps.data} />);
    });
})