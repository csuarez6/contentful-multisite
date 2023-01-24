import React from 'react';
import PageLayout from '@/components/layouts/page-layout/PageLayout';
import { IPage } from '@/lib/interfaces/page-cf.interface';
import SignInFormBlock from '@/components/blocks/sigin-form/SignInFormBlock';
import { mockSignInFormBlockProps } from '@/components/blocks/sigin-form/SignInFormBlock.mocks';

const SignUp:React.FC<IPage> = (layout) => {
    return (
        <PageLayout {...layout}>
            <SignInFormBlock {...mockSignInFormBlockProps.data}/>
        </PageLayout>
    );
};

export default SignUp;