import { FC, ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import { classNames } from '@/utils/functions';

export interface ICheckBox {
  id?: string,
  name: string,
  label?: string | React.ReactNode,
  type?: string,
  checked?: boolean,
  value?: any,
  isError?: boolean,
  errorMessage?: string
}

const CheckBox: FC<ICheckBox> = forwardRef(({ id, name, label, isError, checked = false ,errorMessage, ...rest }, ref: ForwardedRef<HTMLInputElement>) => {
  const [isChecked, setIsChecked] = useState(checked);
  const parentRef = useRef(null);

  useEffect(() => {
    const input: HTMLInputElement = parentRef?.current?.querySelector('input');

    if (input) {
      const handleChange = (evt) => setIsChecked(evt.target.checked);
      input.addEventListener('click', handleChange);

      return () => {
        input.removeEventListener('click', handleChange);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={parentRef}
      className={classNames(
        "relative",
        id,
        isError && "has-error"
      )}
    >
      <div className="mt-6 flex items-center space-x-2">
        <div className="flex h-5 items-center">
          <input
            data-testid="checkbox"
            ref={ref}
            name={name}
            {...id && { id }}
            {...id && { name: id }}
            type="checkbox"
            className="h-5 w-5 appearance-none peer absolute cursor-pointer"
            {...rest}
          />
          <span className={isError ? "text-states-error-txt" : "text-grey-80 peer-hover:text-grey-30"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                className={classNames(
                  "transition-colors duration-500",
                  isChecked ? "fill-blue-dark stroke-blue-dark" : "fill-transparent stroke-current"
                )}
                d="M16.3846 1H5.61538C3.06638 1 1 3.06638 1 5.61538V16.3846C1 18.9336 3.06638 21 5.61538 21H16.3846C18.9336 21 21 18.9336 21 16.3846V5.61538C21 3.06638 18.9336 1 16.3846 1Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={isChecked ? "stroke-white" : "stroke-transparent"}
                d="M6.38458 12.5385L9.53843 15.0615C9.62313 15.1313 9.72231 15.1813 9.82876 15.2079C9.93521 15.2345 10.0463 15.2371 10.1538 15.2154C10.2624 15.195 10.3653 15.1515 10.4556 15.0878C10.5459 15.0241 10.6213 14.9417 10.6769 14.8462L15.6154 6.38461"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <label {...id && { htmlFor: id }} className={`text-base font-medium transition-colors duration-500 ${isError ? 'text-states-error-txt' : 'text-grey-30'}`}>
          {label}
        </label>
      </div>
      {isError &&
        <p className="mt-2 text-sm text-states-error-txt pl-6">{errorMessage}</p>
      }
    </div>
  );
});

CheckBox.displayName = 'CheckBox';

export default CheckBox;
