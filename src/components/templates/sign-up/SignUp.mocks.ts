import { mockPageLayoutProps } from '@/components/layouts/page-layout/PageLayout.mocks';
import { IPage } from '@/lib/interfaces/page-cf.interface';

const data: IPage = {
    name: 'Sign Up Template',
    layout: {
        name: 'Sign Up Template',
        headerInfo: mockPageLayoutProps.data.layout.headerInfo,
        footerInfo: mockPageLayoutProps.data.layout.footerInfo,
    }
};

export const mockSigUpTemplateProps = {
    data,
};
