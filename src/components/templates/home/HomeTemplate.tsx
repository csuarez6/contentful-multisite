import { IPage } from "@/lib/interfaces/page-cf.interface";

import PageLayout from "@/components/layouts/page-layout/PageLayout";
import { mockVerticalCardProps } from "@/components/blocks/vertical-card/VerticalCard.mocks";
import BannerSliderBlock from "@/components/blocks/banner-slider/BannerSlider";
import { mockBannerSliderProps } from "@/components/blocks/banner-slider/BannerSlider.mocks";
import { mockListWithIconsProps } from "@/components/blocks/list-with-icons/ListWithIcons.mocks";
import { mockLeftFeaturedProps } from "@/components/blocks/left-featured/LeftFeatured.mocks";
import ProductGrillBlock from "@/components/blocks/product-grill/ProductGrill";
import { mockProductGrillProps } from "@/components/blocks/product-grill/ProductGrill.mocks";
import ServicesTabsBlock from "@/components/blocks/services-tabs/ServicesTabs";
import { mockServicesTabsProps } from "@/components/blocks/services-tabs/ServicesTabs.mocks";
import LeftFeaturedBlock from "@/components/blocks/left-featured/LeftFeatured";
import VerticalCardBlock from "@/components/blocks/vertical-card/VerticalCard";
import ListWithIconBlock from "@/components/blocks/list-with-icons/ListWithIcons";

const HomeTemplate: React.FC<IPage> = (layout) => {
  const listWithIconsData = {
    ...mockListWithIconsProps.data,
    listedContent: mockListWithIconsProps.data.featuredContentsCollection.items.map((item) => {
      const cleanItem = { ...item };
      delete cleanItem.promoDescription;
      return cleanItem;
    }),
  };

  return (
    <PageLayout {...layout}>
      <BannerSliderBlock {...mockBannerSliderProps.data} />
      <div>
        <ServicesTabsBlock {...mockServicesTabsProps.data} />
      </div>
      <div className="xl:container xl:mx-auto my-6">
        <ProductGrillBlock {...mockProductGrillProps.data} />
      </div>
      <div>
        <VerticalCardBlock {...mockVerticalCardProps.data}/>
      </div>
      <div>
        <LeftFeaturedBlock {...mockLeftFeaturedProps.data} />
      </div>
      <div>
      <ListWithIconBlock  {...mockListWithIconsProps.data}/>
      </div>
    </PageLayout>
  );
};

export default HomeTemplate;
