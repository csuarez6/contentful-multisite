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
    <div className="flex flex-col gap-12">
      <p className="text-left">
        Antes de empezar, queremos informarte que puedes adquirir la instalación
        de tu gasodoméstico en esta compra.
        <br />
        Si aún no sabes qué incluye, puedes informarte en la landing de
        instalación.
      </p>
      <div className="flex justify-end gap-2">
        <CustomLink
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
        </CustomLink>
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