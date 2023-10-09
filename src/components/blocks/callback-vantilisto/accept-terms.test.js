import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import AcceptTerms from './accept-terms';
import { useRouter } from "next/router";

const useRouterMock = () => ({
    asPath: "/",
    push: jest.fn(),
});

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe('AcceptTerms', () => {
    beforeEach(() => {
        (useRouter).mockImplementation(useRouterMock);
    });
    test('renders', async () => {
        render(<AcceptTerms />);
    });
})
