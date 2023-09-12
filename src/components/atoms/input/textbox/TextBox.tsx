import React, { forwardRef } from 'react';
import Icon from '../../icon/Icon';
import { ITextBox } from './TextBox.mocks';
import { classNames } from '@/utils/functions';

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
        <div className={classNames(
            "w-full flex-col flex gap-1",
            id,
            isError && "has-error"
        )}>
            {label && (
                <label className={`block text-lg transition-colors duration-500 ${isError ? 'text-states-error-txt' : 'text-grey-30'}`} {...id && { htmlFor: id }}>
                    {label}{isRequired && <span className='text-states-error-txt'>*</span>}
                </label>
            )}
            <div className='relative'>
                <input
                    data-testid="textbox"
                    ref={ref}
                    className={classNames(
                        "border rounded w-full py-2 px-3 text-grey-30 placeholder:text-grey-60 leading-tight focus:outline-none transition-colors duration-500",
                        isError ? "border-states-error" : "border-grey-80 focus:border-lucuma-60 hover:border-grey-30",
                        className
                    )}
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
                <p className="mt-2 text-sm text-states-error-txt">{errorMessage}</p>
            }
        </div>
    );
});

Textbox.displayName = 'Textbox';

export default Textbox;
