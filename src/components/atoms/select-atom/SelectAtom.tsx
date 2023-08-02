import React, {
  Fragment,
  useEffect,
  useState,
  forwardRef,
  DetailedHTMLProps,
  SelectHTMLAttributes,
} from "react";
import { Listbox, Transition } from "@headlessui/react";
import Icon from "../icon/Icon";
import { classNames } from "@/utils/functions";
import { IProductCategory } from "@/lib/interfaces/content-filter-cf.interface";
import { IImageAsset } from "@/lib/interfaces/assets-cf.interface";

export interface IListContent {
  value: string;
  text: string;
}

export interface ISelect extends DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> {
  name?: string;
  listedContents: Array<IListContent & IProductCategory>;
  labelSelect?: string;
  placeholder?: string;
  handleChange?: (evt) => void;
  image?: IImageAsset;
  firstOptionSelected?: boolean;
  isError?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  currentValue?: string;
}

const SelectAtom: React.FC<ISelect> = forwardRef(
  (
    {
      id,
      name,
      listedContents,
      labelSelect,
      handleChange,
      placeholder = "Seleccionar",
      firstOptionSelected,
      isError,
      errorMessage,
      isRequired,
      currentValue,
      ...rest
    }, ref
  ) => {
    const defaultOption = firstOptionSelected ? JSON.parse(JSON.stringify(listedContents[0])) : { value: "", text: placeholder };
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const getInput = (): HTMLSelectElement => document.querySelector(`select[name="${name}"]`);

    useEffect(() => {
      const input = getInput();
      input?.addEventListener("change", onChangeInput, false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {     
      if (currentValue !== selectedOption?.value) {
        const currentOption = listedContents?.find(el => el.value === currentValue);
        if (currentOption) setSelectedOption(currentOption);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentValue, listedContents]);

    const onChange = (evt) => {
      const input = getInput();
      input.value = evt.value;
      setSelectedOption(evt);
      if (handleChange) handleChange(evt.value);
    };

    const onChangeInput = (evt) => {
      const { value } = evt.target;
      const currentOption = listedContents.find((el) => el.value === value);
      setSelectedOption(currentOption ?? defaultOption);
      if (handleChange) handleChange(value);
    };

    if (listedContents.length === 0) return;

    return (
      <>
        {/* <div className="sr-only"> */}
        <select
          {...id && { id }}
          name={name}
          data-testid="select"
          ref={ref}
          {...rest}
          defaultValue={defaultOption.value}
          onChange={onChangeInput}
          hidden
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {listedContents?.map((content) => (
            <option key={content.value + "-src"} value={content.value}>
              {content.text}
            </option>
          ))}
        </select>
        {/* </div> */}

        <Listbox value={selectedOption} onChange={onChange}>
          {({ open }) => (
            <div className={classNames(
              "flex flex-col gap-1",
              id,
              isError && "has-error"
            )}>
              {labelSelect && (
                <Listbox.Label
                  className={classNames(
                    "block text-lg text-grey-30 font-medium",
                    isError ? 'text-red-700 dark:text-red-500' : 'text-grey-30'
                  )}
                >
                  {labelSelect}{isRequired && <span className='text-red-700'>*</span>}
                </Listbox.Label>
              )}
              <div className="grid gap-2 relative">
                <Listbox.Button
                  className={classNames(
                    "flex gap-[10px] flex-nowrap px-3 py-[6px] bg-white border border-grey-60 rounded hover:border-grey-30 group",
                    open && "border-lucuma-60"
                  )}
                >
                  <span
                    className={classNames(
                      "grow text-left font-medium",
                      selectedOption?.text ? "text-grey-30" : "text-grey-60"
                    )}
                  >
                    {selectedOption?.text ?? placeholder}
                  </span>
                  <span
                    className={classNames(
                      "w-6 h-6 flex items-center text-grey-60 group-hover:text-grey-30",
                      open && "transform rotate-180"
                    )}
                  >
                    <Icon icon="arrow-down" className="w-full h-full" />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute z-20 min-w-full top-full mt-2">
                    <Listbox.Options className="flex flex-col border bg-white border-grey-80 rounded-md pt-1 pb-4 max-h-[420px] overflow-auto">
                      {listedContents?.map((content) => (
                        <Listbox.Option
                          key={content.value + "-list"}
                          value={content}
                          className={classNames(
                            "p-[10px] text-size-p2 text-gray-700 cursor-pointer hover:bg-grey-90",
                            content.text === selectedOption.text
                              ? "font-bold"
                              : "font-medium"
                          )}
                        >
                          {content.text}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Transition>
              </div>
              {isError &&
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorMessage}</p>
              }
            </div>
          )}
        </Listbox>
      </>
    );
  }
);

SelectAtom.displayName = "SelectAtom";
export default SelectAtom;
