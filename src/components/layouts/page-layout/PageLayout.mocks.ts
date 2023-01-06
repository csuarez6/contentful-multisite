import { IPage } from '@/lib/interfaces/page-cf.interface';

import { mockHeaderBlockProps } from '@/components/blocks/header-block/HeaderBlock.mocks';
import { mockFooterBlockProps } from '@/components/blocks/footer-block/FooterBlock.mocks';
import { RICHTEXT_SHORT_SIMPLE } from '@/constants/mocks.constants';

const data: IPage = {
  name: 'Home',
  promoTitle: 'Page Layout',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  layout: {
    name: 'Home',
    headerInfo: mockHeaderBlockProps.data,
    footerInfo: mockFooterBlockProps.data,
  }
};

export const mockPageLayoutProps = {
  data,
};
