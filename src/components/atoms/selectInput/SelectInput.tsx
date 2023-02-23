import { DetailedHTMLProps, forwardRef, SelectHTMLAttributes } from 'react';

export interface ISelectInputOption {
    label: string,
    value: string
}

export interface ISelectInput extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label?: string,
    selectOptions: ISelectInputOption[],
    isError?: boolean,
    errorMessage?: string
}

const SelectInput: React.FC<ISelectInput> = forwardRef(({
    label,
    id,
    className,
    selectOptions,
    isError,
    errorMessage,
    ...rest
}, ref ) => {
    return (
        <div className="w-full flex flex-col gap-1">
            <label
                className={`block ${isError ? 'text-red-700 dark:text-red-500' : 'text-grey-30'} text-lg `} { ... id && { htmlFor: id }}>
                {label}
            </label>
            <select
                ref={ref}      
                className={`form-select form-select--signin border w-full py-2 px-3 text-grey-30 leading-tight bg-transparent focus:outline-none cursor-pointer bg-no-repeat ${className ?? ''} ${isError && 'form-select--error'}`}
                { ... id && { id }}
                { ... id && { name: id }}
                {...rest}
                
            >
                {selectOptions.map(({ label, value }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
            </select>
            {isError &&
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorMessage}</p>
            }
        </div>
    );
});

SelectInput.displayName = 'SelectInput';

export default SelectInput;
