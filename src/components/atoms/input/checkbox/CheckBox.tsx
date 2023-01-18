import React, { useState } from 'react';

export interface ICheckBox {
    id?: string,
    name: string,
    label?: string,
    type?: string,
    checked?: boolean,
    value?: any
}

const CheckBox = ({ id, name, label, value, checked = false, type = "checkbox" }: ICheckBox, ref) => {
    const [isChecked, setChecked] = useState(checked);
    const handleChange = () => setChecked(!isChecked);

    return (
        <div className="mt-6 flex space-x-2">
            <div className="flex h-5 items-center">
                <input
                    id={id}
                    name={name}
                    ref={ref}
                    type={type}
                    value={value}
                    className="h-5 w-5 accent-neutral-30 rounded-lg border-blue-dark"
                    checked={isChecked}
                    onChange={handleChange}
                />
            </div>
            <label htmlFor={name} className="text-base font-medium text-grey-30">
                {label}
            </label>
        </div>
    );

};

export default React.forwardRef(CheckBox);
