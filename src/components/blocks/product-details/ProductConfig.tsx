import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { IIcon } from "@/components/atoms/icon/Icon";
import { classNames, formatPrice } from "@/utils/functions";
import { BLOCKS } from "@contentful/rich-text-types";
import { useState } from "react";

export const iconInvoice: IIcon = {
  icon: "invoice",
  size: 28,
  className: "",
};

export const iconPSE: IIcon = {
  icon: "pse",
  size: 28,
  className: "",
};

export const iconCallback: IIcon = {
  icon: "callback",
  size: 28,
  className: "h-5 w-5",
};

export const options = {
  renderNode: {
    [BLOCKS.UL_LIST]: (_node: any, children: any) => {
      return <ul className="list-disc list-inside">{children}</ul>;
    },
    [BLOCKS.OL_LIST]: (_node: any, children: any) => {
      return <ol className="list-decimal list-inside">{children}</ol>;
    },
    [BLOCKS.LIST_ITEM]: (_node: any, children: any) => {
      return (
        <li>
          <div className="inline-block w-fit max-w-[calc(100%-50px)] align-top">
            {children}
          </div>
        </li>
      );
    },
    [BLOCKS.TABLE]: (_node: any, children: any) => (
      <table className="w-full table-auto">
        <tbody>{children}</tbody>
      </table>
    ),
    [BLOCKS.TABLE_ROW]: (_node: any, children: any) => (
      <tr className="odd:bg-neutral-90">{children}</tr>
    ),
    [BLOCKS.TABLE_CELL]: (_node: any, children: any) => (
      <td className="px-3 py-4 text-grey-30 text-size-subtitle1">{children}</td>
    ),
  },
};

export const ModalIntall: React.FC<any> = ({
  optionsList,
  onEventHandler,
  installCurrent,
  upInstallCurrent,
}) => {
  const [checked, setChecked] = useState(installCurrent ?? 0);
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="text-left">
          <p className="mb-4">Seleccione el servicio de instalación que desee para su producto.</p>
          <div
            className="px-2 py-1 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
            role="alert"
          >
            El servicio de instalación está sujeto a una ubicación, si desea más información puede
            hacer {" "} <CustomLink className="!inline-block font-bold underline" content={{ urlPaths: ["/otros-servicios/instalacion"] }}>clic aquí</CustomLink>.
          </div>
        </div>
        <div>
          <ul
            className={classNames(
              "gap-2 grid",
              optionsList.length > 0
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1"
            )}
          >
            {optionsList.length > 0 &&
              optionsList.map((item, index) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => {
                      upInstallCurrent(index);
                      setChecked(index);
                    }}
                  >
                    <input
                      type="radio"
                      id={`installbox-${index}`}
                      name="installbox"
                      checked={checked === index}
                      className="hidden peer"
                      readOnly
                    />
                    <label
                      htmlFor={`installbox-${index}`}
                      className="inline-flex items-center justify-center w-full p-2 cursor-pointer button button-outline peer-checked:bg-blue-dark peer-checked:text-white"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-size-span">
                          {item.name}
                        </span>
                        <span className="text-size-small">
                          {item.formatted_price_amount}
                        </span>
                      </div>
                    </label>
                  </li>
                );
              })}
          </ul>
        </div>
        <div
          className="flex justify-end gap-2"
          onClick={() => {
            onEventHandler("installation", optionsList[checked]);
          }}
        >
          <button className="button button-primary">Hecho</button>
        </div>
      </div>
    </>
  );
};

export const ModalWarranty: React.FC<any> = ({
  optionsList,
  onEventHandler,
  installCurrent,
  upInstallCurrent,
  productPrice
}) => {
  const [checked, setChecked] = useState(installCurrent ?? 0);
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="text-left">Seleccione el tipo de garantía extendida que desee para su producto.</div>
        <div>
          <ul
            className={classNames(
              "gap-2 grid",
              optionsList.length > 0
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1"
            )}
          >
            {optionsList.length > 0 &&
              optionsList.map((item, index) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => {
                      upInstallCurrent(index);
                      setChecked(index);
                    }}
                  >
                    <input
                      type="radio"
                      id={`installbox-${index}`}
                      name="installbox"
                      checked={checked === index}
                      className="hidden peer"
                      readOnly
                    />
                    <label
                      htmlFor={`installbox-${index}`}
                      className="inline-flex items-center justify-center w-full p-2 cursor-pointer button button-outline peer-checked:bg-blue-dark peer-checked:text-white"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-size-span">
                          {item.name}
                        </span>
                        <span className="text-size-small">
                          {/* {item.formatted_price_amount} */}
                          {(index === 0)
                            ? item.formatted_price_amount
                            : formatPrice((Number(item.price_amount_float) * Number(productPrice)) / 100)}
                        </span>
                      </div>
                    </label>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="button button-primary"
            onClick={() => {
              onEventHandler("warranty", optionsList[checked]);
            }}
          >
            Hecho
          </button>
        </div>
      </div>
    </>
  );
};
