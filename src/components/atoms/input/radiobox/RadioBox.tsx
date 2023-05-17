import React, { useState } from 'react';
import { IRadioBox } from './RadioBox.mocks';
import Icon from '@/components/atoms/icon/Icon';
import { classNames } from '../../../../utils/functions';

const RadioBox: React.FC<IRadioBox> = ({ id, name, label, checked, icon }) => {
    const [isChecked, setChecked] = useState(checked ?? false);
    const handleChange = () => {
        setChecked(!isChecked);
    };

    return (
        <div className={classNames(
            "-space-y-px rounded-md p-4"
        )}>
            <label className="relative flex justify-between cursor-pointer">
                <span className="flex">
                    <input
                        data-testid="radiobox"
                        className={classNames(
                            "mt-0.5 h-4 w-4 shrink-0 accent-neutral-30 focus:ring-neutral-30",
                        )}
                        id={id}
                        name={name}
                        type="radio"
                        checked={isChecked}
                        onChange={handleChange}
                    />
                    <span className="ml-3 flex flex-col">
                        <span className="block text-sm">{label}</span>
                    </span>
                </span>
                {(icon) &&
                    <span className="flex items-center shrink-0 w-6 h-6">
                        <Icon icon={icon} className="w-full h-full" aria-hidden="true" />
                    </span>
                }
            </label>
        </div>
    );

};

export default RadioBox;
