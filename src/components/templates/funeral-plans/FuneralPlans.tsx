import { IPage } from "@/lib/interfaces/page-cf.interface";

import PageLayout from "@/components/layouts/page-layout/PageLayout";

import BannerImage from "@/components/blocks/banner-image/BannerImage";
import { mockBannerImageProps } from "@/components/blocks/banner-image/BannerImage.mock";
import LeftFeaturedBlock from "@/components/blocks/left-featured/LeftFeatured";
import { mockFeaturedBlockProps } from "@/components/blocks/featured-block/FeaturedBlock.mocks";
import FuneralPlansBlock from "@/components/blocks/funeral-plans/FuneralPlans";

const FuneralPlansTemplate: React.FC<IPage> = (layout) => {
  return (
    <PageLayout {...layout}>
      <BannerImage {...mockBannerImageProps.data} />
      <LeftFeaturedBlock {...mockFeaturedBlockProps.data} />
      <FuneralPlansBlock />
    </PageLayout>
  );
};

export default FuneralPlansTemplate;
