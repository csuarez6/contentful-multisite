import SidebarInformative from '@/components/organisms/cards/sidebar-informative/SidebarInformative';
import { IForm } from '@/components/organisms/forms/signin-form/SignIn.mocks';
import SignInForm from '@/components/organisms/forms/signin-form/SignInForm';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import React from 'react';

export interface IBlockFormSignIn {
    form: IForm;
    sidebar: IPromoBlock
}
const SignInFormBlock: React.FC<IBlockFormSignIn> = ({ form, sidebar }) => {
    return (
        <section className='grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-x-6 lg:my-[84px]'>
            <div className='col-span-2'>
                <SignInForm {...form}/>
            </div>
            <SidebarInformative {...sidebar}/>
        </section>
    );
};

export default SignInFormBlock;