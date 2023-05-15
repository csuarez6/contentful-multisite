import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { IIcon } from "@/components/atoms/icon/Icon";
import RadioBox from "@/components/atoms/input/radiobox/RadioBox";
import { BLOCKS } from "@contentful/rich-text-types";

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

export const ModalIntall = () => {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-left">
        <div className="p-1 mb-1 text-orange-700 bg-orange-100 border-l-4 border-orange-500" role="alert">
          <p>
            el servicio está sujeto a ubicación, si desea más información puede hacer
            <CustomLink
              className="!inline-block ml-1 font-bold underline"
              content={{ urlPath: "/otros-servicios/instalacion" }}
            >
              clic aquí
            </CustomLink>.
          </p>
        </div>
        Antes de empezar, queremos informarte que puedes adquirir la instalación
        de tu gasodoméstico en esta compra.
        <br />
        Si aún no sabes qué incluye, puedes informarte en la landing de
        instalación.
      </p>
      <ul className="px-3 py-[10px] gap-2 grid grid-cols-1 sm:grid-cols-2">
        {[
          {
            label: "Dato 1",
            price: "$ 300.000,00"
          },
          {
            label: "Sin instalación",
            price: "$ 0"
          }
        ].map((item, index) => {
          return (
            <>
              <li key={index}>
                <input type="radio" id={`installbox-${index}`} name="installbox" value="" className="hidden peer" required />
                <label
                  htmlFor={`installbox-${index}`}
                  className="inline-flex items-center justify-center w-full p-2 cursor-pointer button button-outline peer-checked:bg-blue-dark peer-checked:text-white"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-size-span">{item.label}</span>
                    <span className="text-size-small">{item.price}</span>
                  </div>
                </label>
              </li>
            </>
          );
        })}
      </ul>
      <div className="flex justify-end gap-2">
        {/* <CustomLink
          className="button button-primary"
          content={{ urlPath: "/" }}
        >
          Ir a comprar
        </CustomLink>
        <CustomLink
          className="border button border-blue-dark rounded-3xl text-blue-dark"
          content={{ urlPath: "/" }}
        >
          Conocer sobre instalación
        </CustomLink> */}
        <button className="button button-primary">
          Hecho
        </button>
      </div>
    </div>
  );
};

export const ModalShipping = () => {
  return (
    <div>
      <p className="text-blue-dark">
        Para llevar su producto, elija un tipo de envío:
      </p>
      <form>
        <div className="w-full">
          <RadioBox name="servicio" label="Estándar (5 a 10 días hábiles)" />
        </div>
        <div className="w-full">
          <RadioBox name="servicio" label="Express (1 día hábil)" />
        </div>
      </form>
      <div className="flex justify-end gap-2">
        <CustomLink
          className="button button-primary"
          onClick={(e) => e.preventDefault()}
          content={{ externalLink: "#" }}
        >
          Aceptar
        </CustomLink>
      </div>
    </div>
  );
};