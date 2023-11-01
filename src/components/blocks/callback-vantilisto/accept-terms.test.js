import React from 'react';
import '@testing-library/jest-dom'
import { act, render, screen, fireEvent } from '@testing-library/react';
import AcceptTerms from './accept-terms';
import { useRouter } from "next/router";

const mockData = {
    productData: { urlProduct: "/" }
};

const useRouterMock = () => ({
    asPath: "/",
    pathname: "/",
    push: jest.fn(),
});

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

const fetchMock = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ result: { success: true } }),
    })
)

global.fetch = fetchMock;

describe('AcceptTerms', () => {
    beforeEach(() => {
        (useRouter).mockImplementation(useRouterMock);
    });
    test('renders', async () => {
        render(<AcceptTerms {...mockData} />);
        await act(async () => {
            const checkbox = screen.getByTestId("checkbox");
            fireEvent.click(checkbox);

            const submit = screen.getByTestId("submit");
            fireEvent.click(submit);
        });
    });
})
