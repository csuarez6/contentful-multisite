import React from 'react';
import { render } from '@testing-library/react';
import SearchCard from './SearchCard';
import { mockSearchCardProps } from './SearchCard.mocks'

describe('SearchCardBlock', () => {

    test('renders', () => {
        render(<SearchCard {...mockSearchCardProps.data} />);

    });

})

describe('SearchCardBlock left', () => {

    test('renders', () => {
        render(<SearchCard {...mockSearchCardProps.left} />);

    });

})