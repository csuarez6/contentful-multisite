import React from 'react';
import PageLayout from '@/components/layouts/page-layout/PageLayout';
import { IPage } from '@/lib/interfaces/page-cf.interface';
import SignUpFormBlock from '@/components/blocks/sigup-form/SignUpFormBlock';
import { mockSignUpFormBlockProps } from '@/components/blocks/sigup-form/SignUpFormBlock.mocks';

const SignUp: React.FC<IPage> = (layout) => {
    return (
        <PageLayout {...layout}>
            <SignUpFormBlock {...mockSignUpFormBlockProps.data} />
        </PageLayout>
    );
};

export default SignUp;