import React, { useState } from 'react';
import { ICheckBox } from './CheckBox.mocks';


const CheckBox: React.FC<ICheckBox> = ({ id, name, label, checked }) => {
    const [isChecked, setChecked] = useState(checked ?? false);
    const handleChange = () => {
        setChecked(!isChecked);
    };

    return (
        <div className="mt-6 flex space-x-2">
            <div className="flex h-5 items-center">
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    className="h-5 w-5 accent-neutral-30 rounded-lg border-blue-dark"
                    checked={isChecked}
                    onChange={handleChange}
                />
            </div>
            <label htmlFor="chekbox" className="text-base font-medium text-grey-30">
                {label}
            </label>
        </div>
    );

};

export default CheckBox;
