import { FC, ForwardedRef, forwardRef } from 'react';
// import { ICheckBox } from './CheckBox.mocks';

export interface ICheckBox {
    id?: string,
    name: string,
    label?: string,
    type?: string,
    checked?: boolean,
    value?: any
}

const CheckBox: FC<ICheckBox> = forwardRef(({ id, label, ...rest }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <div className="mt-6 flex space-x-2">
            <div className="flex h-5 items-center">
                <input
                    ref={ref}
                    {...id && { id }}
                    {...id && { name: id }}
                    type="checkbox"
                    className="h-5 w-5 accent-neutral-30 rounded-lg border-blue-dark"
                    {...rest}
                />
            </div>
            <label {...id && { htmlFor: id }} className="text-base font-medium text-grey-30">
                {label}
            </label>
        </div>
    );

});

CheckBox.displayName = 'CheckBox';

export default CheckBox;
