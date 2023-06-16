import React from 'react';
import PageLayout from '@/components/layouts/page-layout/PageLayout';
import { IPage } from '@/lib/interfaces/page-cf.interface';
import { mockErrorPageProps } from './404.mocks';
import ErrorBlock from '@/components/blocks/error-block/ErrorBlock';

const ErrorPage: React.FC<IPage> = (layout) => {
    return (
        <PageLayout {...layout}>
            <ErrorBlock {...mockErrorPageProps.data} />
        </PageLayout>
    );
};

export default ErrorPage;
