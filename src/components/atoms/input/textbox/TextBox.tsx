import React from 'react';
import { ITextBox } from './TextBox.mocks';

const Textbox = ({
  id,
  name,
  label,
  value,
  placeholder,
  onChange,
  type
}: ITextBox, ref) => {
    return (
      <div className="w-full grid">
        <label className="block mb-6 text-grey-30 text-lg leading-none" htmlFor={id}>
          {label}
        </label>
        <input
          ref={ref}
          className="border border-grey-60 rounded w-full py-2 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none"
          id={id}
          name={name}
          type={type ?? "text"}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  };

export default React.forwardRef(Textbox);
