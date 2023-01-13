import { IPage } from "@/lib/interfaces/page-cf.interface";
import PageLayout from "@/components/layouts/page-layout/PageLayout";

import BannerImage from "@/components/blocks/banner-image/BannerImage";
import { mockBannerImageProps } from "@/components/blocks/banner-image/BannerImage.mock";
import ProductGrillBlock from "@/components/blocks/product-grill/ProductGrill";
import { mockProductGrillProps } from "@/components/blocks/product-grill/ProductGrill.mocks";
import FeaturedProductBlock from "@/components/blocks/product-featured/FeaturedProductBlock";
import { data } from "@/components/blocks/product-featured/FeaturedProductBlock.mock";
import CarouselCategoriesBlock from "@/components/blocks/carousel-categories/CarouselCategories";
import { mockCarouselCategoriesProps } from "@/components/blocks/carousel-categories/CarouselCategories.mocks";

const CommerceHomeTemplate: React.FC<IPage> = (layout) => {
  return (
    <PageLayout {...layout}>
      <BannerImage {...mockBannerImageProps.bannerSmall} />
      <CarouselCategoriesBlock {...mockCarouselCategoriesProps.dataTop} />
      <ProductGrillBlock {...mockProductGrillProps.dataListedContents} />
      <FeaturedProductBlock {...data} />
    </PageLayout>
  );
};

export default CommerceHomeTemplate;
