import React from 'react';
import { render } from '@testing-library/react';
import ServiceLineBlock from './ServiceLineBlock';
import { mockServiceLineProps } from './ServiceLineBlock.mocks'

describe('ServiceLineBlockBlock', () => {

    test('renders', () => {
        render(<ServiceLineBlock {...mockServiceLineProps.data} />);

    });

})