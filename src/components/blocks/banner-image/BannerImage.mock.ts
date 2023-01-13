import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
    image: {
        url: 'https://via.placeholder.com/1920x622.png?text=Large+1920x622'
    },
    view: {
        bannerWidth: 'Large',
        bannerHeight: 'Large'
    }
};

const bannerMedium: IPromoBlock = {
    image: {
        url: 'https://via.placeholder.com/1920x218.png?text=Medium+1920x218'
    },
    view: {
        bannerWidth: 'Medium',
        bannerHeight: 'Medium'
    }
};
const bannerSmall: IPromoBlock = {
    image: {
        url: 'https://via.placeholder.com/1920x195.png?text=Small+1920x195'
    },
    view: {
        bannerWidth: 'Small',
        bannerHeight: 'Small'
    }
};
export const mockBannerImageProps = {
    data,
    bannerMedium,
    bannerSmall,
};