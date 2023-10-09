import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import VerticalTabs from './VerticalTabs';
import { mockVerticalTabsProps } from './VerticalTabs.mocks'

jest.mock("@/lib/richtext/default.formatter", () => ({
    defaultFormatOptions: jest.fn(() => ({})),
  }));
  
  jest.mock("@/lib/services/render-blocks.service", () => ({
    attachLinksToRichtextContent: jest.fn(),
  }));
  
  jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe('VerticalTabsBlock', () => {

    test('renders', () => {
        const { getByTestId } = render(<VerticalTabs {...mockVerticalTabsProps.data} />);
        fireEvent.click(getByTestId('1'))
        fireEvent.click(getByTestId('2'))
    });

})
