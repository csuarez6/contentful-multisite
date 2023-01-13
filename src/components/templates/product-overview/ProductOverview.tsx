import { IPage } from "@/lib/interfaces/page-cf.interface";
import PageLayout from "@/components/layouts/page-layout/PageLayout";

import ProductOverviewBlock from "@/components/blocks/product-details/ProductOverview";
import { mockProductOverviewProps } from "@/components/blocks/product-details/ProductOverview.mocks";
import FeaturedProductBlock from "@/components/blocks/product-featured/FeaturedProductBlock";
import { data } from "@/components/blocks/product-featured/FeaturedProductBlock.mock";

const ProductOverviewTemplate: React.FC<IPage> = (layout) => {
  return (
    <PageLayout {...layout}>
      <ProductOverviewBlock {...mockProductOverviewProps.data} />
      <FeaturedProductBlock {...data} />
    </PageLayout>
  );
};

export default ProductOverviewTemplate;
