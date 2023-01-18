import { forwardRef } from 'react';
import { ITextBox } from './TextBox.mocks';

const Textbox: React.FC<ITextBox> = forwardRef(({
    label,
    id,
    className,
    ...rest
}, ref) => {
    return (
        <div className="w-full grid">
            <label className="block mb-6 text-grey-30 text-lg leading-none" { ...id && { htmlFor: id }}>
                {label}
            </label>
            <input
                ref={ref}      
                className={`border border-grey-60 rounded w-full py-2 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none ${className ?? ''}`}
                {...rest}
                { ...id && { id }}
                { ...id && { name: id }}
            />
        </div>
    );
});

Textbox.displayName = 'Textbox';

export default Textbox;
