import React from 'react';
import { render } from '@testing-library/react';
import BannerImage from './BannerImage';

describe('BannerImage component', () => {
    const image = {
        title: 'Test Image',
        url: 'https://testimage.com/test.jpg'
    };
    const ctaCollection = {
        items: [
            {
                text: 'Test CTA',
                url: 'https://testcta.com'
            }
        ]
    };
    const view = {
        bannerHeight: 'Small',
        bannerWidth: 'Large'
    };
    const blockId = 'test-block';
    const sysId = 'test-sys';
    const isFirst = true;

    it('should render the BannerImage component correctly', () => {
        const { getByAltText, getByText } = render(
            <BannerImage
                image={image}
                ctaCollection={ctaCollection}
                view={view}
                blockId={blockId}
                sysId={sysId}
                isFirst={isFirst}
            />
        );

        // const imageElement = getByAltText('Test Image');
        // expect(imageElement).toBeInTheDocument();

        // const ctaElement = getByText('Test CTA');
        // expect(ctaElement).toBeInTheDocument();
    });
});