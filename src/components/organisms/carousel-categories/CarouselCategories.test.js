import { act, render, screen, fireEvent } from '@testing-library/react'
import { mockCarouselCategoriesProps } from './CarouselCategories.mocks'
import CarouselCategories from './CarouselCategories'
import { useRouter } from "next/router";
import '@testing-library/jest-dom'

const useRouterMock = () => ({
    asPath: "/",
    push: jest.fn(),
});

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe('CarouselCategories ', () => {
    beforeEach(() => {
        (useRouter).mockImplementation(useRouterMock);
    });
    it('should render correctly with props', async () => {

        render(<CarouselCategories {...mockCarouselCategoriesProps.data} />)
    });
});

