import { IPageLayout } from './PageLayout';

import { mockHeaderBlockProps } from '@/components/blocks/header-block/HeaderBlock.mocks';
import { mockFooterBlockProps } from '@/components/blocks/footer-block/FooterBlock.mocks';

const data: IPageLayout = {
  name: 'Home',
  headerInfo: mockHeaderBlockProps.data,
  footerInfo: mockFooterBlockProps.data,
};

export const mockPageLayoutProps = {
  data,
};
