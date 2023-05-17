import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import VerticalTabs from './VerticalTabs';
import { mockVerticalTabsProps } from './VerticalTabs.mocks'

describe('VerticalTabsBlock', () => {

    test('renders', () => {
        const { getByTestId } = render(<VerticalTabs {...mockVerticalTabsProps.data} />);
        fireEvent.click(getByTestId('1'))
        fireEvent.click(getByTestId('2'))
    });

})
