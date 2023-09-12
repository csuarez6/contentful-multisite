import React from 'react';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import SidebarInformative from '@/components/organisms/cards/sidebar-informative/SidebarInformative';
import { IForm } from '@/components/organisms/forms/signup-form/SignUpForm.mocks';
import SignUpForm from '@/components/organisms/forms/signup-form/SignUpForm';

export interface IBlockFormSignUp {
    form: IForm;
    sidebar: IPromoBlock
}

const SignUpFormBlock: React.FC<IBlockFormSignUp> = ({ form, sidebar }) => {
    return (
        <section className='grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-x-6 my-6 lg:my-[84px]'>
            <div className='col-span-2'>
                <SignUpForm {...form} />
            </div>
            <SidebarInformative {...sidebar} />
        </section>
    );
};

export default SignUpFormBlock;