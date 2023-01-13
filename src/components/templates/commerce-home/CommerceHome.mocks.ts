import { mockPageLayoutProps } from '@/components/layouts/page-layout/PageLayout.mocks';
import { IPage } from '@/lib/interfaces/page-cf.interface';

const data: IPage = {
  name: 'Funeral Plans Template',
  layout: {
    name: 'Funeral Plans Template',
    headerInfo: mockPageLayoutProps.data.layout.headerInfo,
    footerInfo: mockPageLayoutProps.data.layout.footerInfo,
  }
};

export const mockCommerceHomeTemplateProps = {
  data,
};
