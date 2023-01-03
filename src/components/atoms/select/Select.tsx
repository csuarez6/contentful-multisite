import React, { useState } from 'react';
import Icon, { IIcon } from '../icon/Icon';
import { ISelect } from './select.mocks';


const iconSelect: IIcon = {
    icon: 'arrow-down',
    size: 28,
    className: 'absolute  right-0 top-[-2px] xs:-rotate-90 z-10'
};

const Select: React.FC<ISelect> = ({ icon, listContened, labelSelect, classes, optionDefault }) => {
    const [inputValue, setInputValue] = useState(optionDefault);
    const [handleFocus, setHandleFocus] = useState(false);
    
    return (
        <div className='w-full flex flex-col gap-[19px]'>
            <label className='font-bold text-lg leading-[21.6px]'>{labelSelect}</label>
            <div className={`${classes} flex gap-[13px] selectAtom relative flex-col ml-3 xs:flex-row`}>
                <div className='relative flex text-blue-dark border-b border-solid border-neutral-70 h-fit flex-grow pb-[9px]'>
                    <Icon {...icon} />
                    <input type="text" className='w-full inputSelect hover:cursor-pointer pr-4 pl-[35px] outline-none bg-transparent' value={inputValue} readOnly onFocus={(e) =>  e && setHandleFocus(!handleFocus)}/>
                    <Icon {...iconSelect} />
                </div>
                <ul className={`h-28 overflow-auto ${!handleFocus ? 'hidden' : 'flex' } flex-col w-fit z-40 self-end shadow-md`}>
                    <li className='cursor-not-allowed px-2 py-0.5'>{optionDefault}</li>
                    {
                        listContened?.map((el, i) => {
                            return <li key={i} onClick={() => {setInputValue(el.value);setHandleFocus(!handleFocus);}} className="cursor-pointer px-2 py-0.5">{el.label}</li>;
                        })
                    }
                </ul>
                <div className={`${!handleFocus ? 'hidden' : 'block' } fixed inset-0 z-30 bg-transparent`} onClick={() => setHandleFocus(!handleFocus)}></div>
            </div>
        </div>
    );

};

export default Select;
