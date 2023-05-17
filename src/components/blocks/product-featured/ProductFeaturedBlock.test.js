import React from 'react';
import { render } from '@testing-library/react';
import FeaturedProductBlock from './FeaturedProductBlock';
import { data } from './FeaturedProductBlock.mock'

describe('FeaturedProductBlockBlock', () => {

    test('renders', () => {
        render(<FeaturedProductBlock {...data} />);

    });

})