import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ListWithIcons from './ListWithIcons';
import { mockListWithIconsProps } from './ListWithIcons.mocks'

jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));

// jest.mock("@/lib/services/render-blocks.service", () => ({
//   attachLinksToRichtextContent: jest.fn(),
// }));

jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe('List with icons data', () => {
    test('renders', async () => {
        render(<ListWithIcons {...mockListWithIconsProps.data} />);
    });
})

describe('List with icons icon left', () => {
    test('renders', async () => {
        render(<ListWithIcons {...mockListWithIconsProps.iconLeft} />);
    });
})

describe('List with icons icon left no description', () => {
    test('renders', async () => {
        render(<ListWithIcons {...mockListWithIconsProps.iconLeftNoDescription} />);
    });
})

describe('List with icons icon left no title', () => {
    test('renders', async () => {
        render(<ListWithIcons {...mockListWithIconsProps.iconLeftNoTitle} />);
    });
})

describe('List with icons icon left rounded', () => {
    test('renders', async () => {
        render(<ListWithIcons {...mockListWithIconsProps.iconLeftRounded} />);
    });
})