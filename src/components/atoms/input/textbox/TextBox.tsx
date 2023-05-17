import React, { forwardRef } from 'react';
import Icon from '../../icon/Icon';
import { ITextBox } from './TextBox.mocks';

const Textbox: React.FC<ITextBox> = forwardRef(({
    label,
    id,
    className,
    isError,
    errorMessage,
    type,
    isRequired,
    ...rest
}, ref) => {
    const [viewPassword, setViewPassword] = React.useState(false);
    return (
        <div className="w-full flex-col flex gap-1">
            {label && (
                <label className={`block text-lg ${isError ? 'text-red-700 dark:text-red-500' : 'text-grey-30'}`} {...id && { htmlFor: id }}>
                    {label}{ isRequired && <span className='text-red-700'>*</span> }
                </label>
            )}
            <div className='relative'>
                <input
                    data-testid="textbox"
                    ref={ref}
                    className={`border border-grey-60 rounded w-full py-2 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none ${className ?? ''}`}
                    {...rest}
                    {...id && { id }}
                    {...id && { name: id }}
                    {...type && { type: `${type ? (type === 'password' ? (viewPassword ? 'text' : 'password') : type) : null}` }}
                />
                {type === 'password' &&
                    <button data-testid="button" className='absolute right-[11px] top-[27%] flex h-fit text-grey-30' type='button' onClick={() => setViewPassword(!viewPassword)}>
                        <Icon icon='rpo' size={20} />
                    </button>
                }
            </div>
            {isError &&
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorMessage}</p>
            }
        </div>
    );
});

Textbox.displayName = 'Textbox';

export default Textbox;
