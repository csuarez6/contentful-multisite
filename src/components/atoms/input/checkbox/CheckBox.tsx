import { FC, ForwardedRef, forwardRef } from 'react';

export interface ICheckBox {
    id?: string,
    name: string,
    label?: string | React.ReactNode,
    type?: string,
    checked?: boolean,
    value?: any,
    isError?: boolean,
    errorMessage?: string
}

const CheckBox: FC<ICheckBox> = forwardRef(({ id, name, label, isError, errorMessage, ...rest }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <div className="relative">
            <div className="mt-6 flex items-center space-x-2">
                <div className="flex h-5 items-center">
                    <input
                        ref={ref}
                        name={name}
                        {...id && { id }}
                        {...id && { name: id }}
                        type="checkbox"
                        className="h-5 w-5 accent-neutral-30 rounded-lg border-blue-dark"
                        {...rest}
                    />
                </div>
                <label {...id && { htmlFor: id }} className={`text-base font-medium ${isError ? 'text-red-700 dark:text-red-500' : 'text-grey-30'} `}>
                    {label}
                </label>
            </div>
            {isError &&
                <p className="mt-2 text-sm text-red-600 dark:text-red-500 pl-6">{errorMessage}</p>
            }
        </div>
    );
});

CheckBox.displayName = 'CheckBox';

export default CheckBox;
