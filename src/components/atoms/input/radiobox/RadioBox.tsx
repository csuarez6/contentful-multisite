import React, { useState } from 'react';
import Icon from '@/components/atoms/icon/Icon';
import { classNames } from '../../../../utils/functions';

export interface IRadioBox {
    icon?: string,
    id?: string,
    name?: string,
    label?: string | React.ReactNode,
    type?: string,
    checked?: boolean,
    value?: any,
    isError?: boolean,
    errorMessage?: string
};

const RadioBox: React.FC<IRadioBox> = ({ id, name, label, isError, checked, icon, errorMessage }) => {
    const [isChecked, setChecked] = useState(checked ?? false);

    return (
        <div className={classNames(
            "-space-y-px rounded-md p-4"
        )}>
            <label className="relative flex justify-between cursor-pointer">
                <span className="flex">
                    <div className="block">
                        <input
                            data-testid="radiobox"
                            className={classNames(
                                "mt-0.5 h-4 w-4 shrink-0 focus:ring-0 appearance-none peer absolute",
                            )}
                            id={id}
                            name={name}
                            type="radio"
                            checked={isChecked}
                            onChange={() => setChecked(!isChecked)}
                        />

                        <span className={isError ? "text-states-error-txt" : "text-grey-80 peer-hover:text-grey-30"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path
                                    className={classNames(
                                        "transition-colors duration-500",
                                        isChecked ? "stroke-blue-dark" : "stroke-current"
                                    )}
                                    d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    className={classNames(
                                        "transition-colors duration-500",
                                        isChecked ? "fill-blue-dark stroke-blue-dark" : "fill-transparent stroke-transparent"
                                    )}
                                    d="M11 16.5556C14.0683 16.5556 16.5556 14.0683 16.5556 11C16.5556 7.93176 14.0683 5.44446 11 5.44446C7.93176 5.44446 5.44446 7.93176 5.44446 11C5.44446 14.0683 7.93176 16.5556 11 16.5556Z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                    <span className="ml-3 flex flex-col">
                        <span className={`block text-sm transition-colors duration-500 ${isError ? 'text-states-error-txt' : 'text-grey-30'}`}>{label}</span>
                    </span>
                </span>
                {(icon) &&
                    <span className="flex items-center shrink-0 w-6 h-6">
                        <Icon icon={icon} className="w-full h-full" aria-hidden="true" />
                    </span>
                }
            </label>
            {isError &&
                <p className="mt-2 text-sm text-states-error-txt pl-9">{errorMessage}</p>
            }
        </div>
    );

};

export default RadioBox;
