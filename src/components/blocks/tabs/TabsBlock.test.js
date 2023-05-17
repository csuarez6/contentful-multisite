import React from 'react';
import { render } from '@testing-library/react';
import Tabs from './Tabs';
import { mockTabsProps } from './Tabs.mocks'

describe('TabsBlock', () => {

    test('renders', () => {
        render(<Tabs {...mockTabsProps.data} />);

    });

})