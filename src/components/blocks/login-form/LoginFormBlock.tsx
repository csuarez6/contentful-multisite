import LoginForm, { ITemsForm } from '@/components/organisms/forms/login-form/LoginForm';
import { IPromoBlock, IPromoContent } from '@/lib/interfaces/promo-content-cf.interface';
import React from 'react';

interface IFormContent {
    onSubmitForm?: (e: ITemsForm) => void;
    cta: {
        text: string;
        className?: string;
    };
    modal?: IPromoContent;
}
export interface IForm extends IPromoBlock {
    formData: IFormContent
}

const LoginFormBlock: React.FC<IForm> = ({ formData, blockId, sysId }) => {
    return (
        <section id={blockId ? blockId : sysId} className="section grid gap-9 my-[53px] lg:w-[544px] mx-auto">
            <LoginForm {...formData} />
        </section>
    );
};

export default LoginFormBlock;