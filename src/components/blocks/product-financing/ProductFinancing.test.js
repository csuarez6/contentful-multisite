import React from 'react';
import { render } from '@testing-library/react';
import ProductFinancing from './ProductFinancing';
import { mockProductFinancingProps } from './ProductFinancing.mocks'

describe('ProductFinancingBlock', () => {

    test('renders', () => {
        render(<ProductFinancing {...mockProductFinancingProps.data} />);

    });

})