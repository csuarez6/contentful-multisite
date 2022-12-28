import { IPage } from "@/lib/interfaces/page-cf.interface";

import PageLayout from "@/components/layouts/page-layout/PageLayout";

import BannerCarouselBlock from "@/components/blocks/banner-carousel/BannerCarousel";
import { mockBannerCarouselProps } from "@/components/blocks/banner-carousel/BannerCarousel.mocks";

import LeftFeatured from "@/components/organisms/cards/left-featured/LeftFeatured";
import { mockLeftFeaturedProps } from "@/components/organisms/cards/left-featured/LeftFeatured.mocks";

import ListWithIconBlock from "@/components/blocks/list-with-icons/ListWithIcons";
import { mockListWithIconsProps } from "@/components/blocks/list-with-icons/ListWithIcons.mocks";

import ProductGrillBlock from "@/components/blocks/product-grill/ProductGrill";
import { mockProductGrillProps } from "@/components/blocks/product-grill/ProductGrill.mocks";

const HomeTemplate: React.FC<IPage> = ({ layout }) => {
  const listWithIconsData = {
    ...mockListWithIconsProps.data,
    listedContent: mockListWithIconsProps.data.listedContentsCollection.items.map((item) => {
      const cleanItem = {...item};
      delete cleanItem.promoDescription;
      return cleanItem;
    }),
  };

  return (
    <PageLayout {...layout}>
      <BannerCarouselBlock {...mockBannerCarouselProps.data} />
      <div className="xl:container xl:mx-auto my-6">
        <LeftFeatured {...mockLeftFeaturedProps.data} />
      </div>
      <div className="xl:container xl:mx-auto my-6">
        <ListWithIconBlock {...listWithIconsData} />
      </div>
      <div className="xl:container xl:mx-auto my-6">
        <ProductGrillBlock {...mockProductGrillProps.data} />
      </div>
      <div className="xl:container xl:mx-auto my-6">
        <LeftFeatured {...mockLeftFeaturedProps.data} />
      </div>
    </PageLayout>
  );
};

export default HomeTemplate;
