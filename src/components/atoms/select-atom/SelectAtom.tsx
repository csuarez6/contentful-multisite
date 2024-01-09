import React, {
  Fragment,
  useEffect,
  useState,
  forwardRef,
  DetailedHTMLProps,
  SelectHTMLAttributes,
} from "react";
import uuid from "react-uuid";
import { Listbox, Transition } from "@headlessui/react";
import Icon from "../icon/Icon";
import { classNames, getElementOffset } from "@/utils/functions";
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
  helpText?: string;
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
      helpText,
      currentValue = undefined,
      ...rest
    }, ref
  ) => {
    const defaultMinHeight = 50;
    const defaultMaxHeight = 420;
    const [parentId, setParentId] = useState(null);
    const [maxHeight, setMaxHeight] = useState(defaultMaxHeight);
    const defaultOption = firstOptionSelected ? JSON.parse(JSON.stringify(listedContents[0])) : { value: "", text: placeholder };
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const getInput = (): HTMLSelectElement => document.querySelector(`select[name="${name}"]`);

    const calculateHeight = () => {
      const parentElement = document.getElementById(parentId);
      if (parentElement) {
        const mainContainer: HTMLElement = parentElement.closest('.main-container');

        if (mainContainer) {
          const offsetParent = getElementOffset(parentElement);
          const totalContainerTop = offsetParent.top - mainContainer.offsetTop;
          const totalContainerBottom = mainContainer.offsetHeight - (totalContainerTop + parentElement.offsetHeight);

          const newMaxHeight = totalContainerBottom >= defaultMinHeight && totalContainerBottom <= defaultMaxHeight
            ? totalContainerBottom
            : totalContainerBottom > defaultMaxHeight
              ? defaultMaxHeight
              : defaultMinHeight;
          setMaxHeight(newMaxHeight - 20);
        } else {
          setMaxHeight(defaultMaxHeight - 20);
        }
      }
    };

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

    useEffect(() => {
      if (currentValue !== selectedOption?.value) {
        const currentOption = listedContents?.find(el => el?.value?.toLowerCase() === currentValue?.toLowerCase());
        if (currentOption) setSelectedOption(currentOption);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentValue, listedContents]);

    useEffect(() => {
      if (!parentId) {
        const _uuid = uuid();
        setParentId(`select-${_uuid}`);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      calculateHeight();
      window.addEventListener("resize", calculateHeight);
      return () => window.removeEventListener("resize", calculateHeight);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentId]);

    useEffect(() => {
      const input = getInput();
      input?.addEventListener("change", onChangeInput, false);

      return () => {
        input?.removeEventListener("change", onChangeInput, false);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (listedContents?.length === 0) return;

    return (
      <>
        <select
          {...id && { id }}
          name={name}
          data-testid="select"
          ref={ref}
          {...rest}
          defaultValue={defaultOption?.value}
          onChange={onChangeInput}
          hidden
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {listedContents?.map((content) => (
            <option key={content?.value + "-src"} value={content?.value}>
              {content?.text}
            </option>
          ))}
        </select>

        <Listbox value={selectedOption} onChange={onChange}>
          {({ open }) => (
            <div
              id={parentId}
              className={classNames(
                "flex flex-col gap-1",
                id,
                isError && "has-error"
              )}
            >
              {labelSelect && (
                <Listbox.Label
                  className={classNames(
                    "block text-lg transition-colors duration-500",
                    isError ? 'text-states-error-txt' : 'text-grey-30'
                  )}
                >
                  {labelSelect}
                  {isRequired && <span className='text-states-error-txt'>*</span>}
                  {helpText && (
                    <span title={helpText} className="ml-1 cursor-help">
                      <Icon icon="info" size={18} className="text-gray-500" />
                    </span>
                  )} 
                </Listbox.Label>
              )}
              <div className="grid gap-2 relative">
                <Listbox.Button
                  className={classNames(
                    "flex gap-[10px] flex-nowrap px-3 py-[6px] rounded bg-white border group transition-colors duration-500 focus:outline-none focus:border-lucuma-60",
                    isError
                      ? "border-states-error" :
                      open
                        ? "border-lucuma-60"
                        : "border-grey-80 hover:border-grey-30",
                  )}
                >
                  <span
                    className={classNames(
                      "grow text-left font-medium transition-colors duration-500",
                      selectedOption?.text ? "text-grey-30" : "text-grey-60"
                    )}
                  >
                    {selectedOption?.text ?? placeholder}
                  </span>
                  <span
                    className={classNames(
                      "w-6 h-6 flex items-center text-grey-60 group-hover:text-grey-30 transform transition-[color,transform] duration-500",
                      open && "rotate-180"
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
                  <div className="absolute z-20 min-w-full -top-1 lg:top-full transform -translate-y-full lg:translate-y-0">
                    <Listbox.Options
                      className="flex flex-col border bg-white border-grey-80 rounded-md pt-1 pb-4 overflow-auto focus:outline-none"
                      style={{
                        minHeight: `${defaultMinHeight}px`,
                        maxHeight: `${maxHeight}px`
                      }}
                    >
                      {listedContents?.map((content) => (
                        <Listbox.Option
                          key={content?.value + "-list"}
                          value={content}
                          className={({ active }) => (
                            classNames(
                              "p-[10px] text-size-p2 text-gray-700 cursor-pointer hover:bg-grey-90 transition-colors duration-500",
                              content.text === selectedOption.text
                                ? "font-bold bg-grey-90 bg-opacity-50"
                                : "font-medium",
                              active && "bg-grey-90 bg-opacity-100"
                            )
                          )}
                        >
                          {content?.text}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Transition>
              </div>
              {isError &&
                <p className="mt-2 text-sm text-states-error-txt">{errorMessage}</p>
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
