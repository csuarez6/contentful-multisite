import { DetailedHTMLProps, forwardRef, SelectHTMLAttributes } from 'react';

interface ISelectInputOption {
    label: string,
    value: string
}

export interface ISelectInput extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label?: string,
    options: ISelectInputOption[]
}

const SelectInput: React.FC<ISelectInput> = forwardRef(({
    label,
    id,
    className,
    options,
    placeholder,
    ...rest
}, ref ) => {
    return (
        <div className="w-full grid gap-6">
            <label
                className="block text-grey-30 text-lg" { ... id && { htmlFor: id }}>
                {label}
            </label>
            <select
                ref={ref}      
                className={`border w-full py-2 px-3 text-gray-700 leading-tight ${className ?? ''}`}
                { ... id && { id }}
                { ... id && { name: id }}
                {...rest}
                
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(({ label, value }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
            </select>
        </div>
    );
});

SelectInput.displayName = 'SelectInput';

export default SelectInput;
