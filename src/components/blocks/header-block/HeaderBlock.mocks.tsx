import { IHeader } from "@/lib/interfaces/header-cf.interface";

const data: IHeader = {
  logo: {
    title: "Logo Vanti",
    url: "/images/vanti-logo.png",
    description: "",
  },
  menu: [
    {
      name: "Pagar factura",
      href: "#",
    },
    {
      name: "El experto",
      href: "#",
    },
    {
      name: "Tienda virtual",
      href: "#",
    },
    {
      name: "Centro de ayuda",
      href: "#",
    },
    {
      name: "Servicios de tu interés",
      href: "#",
    },
  ],
  utility: [
    {
      name: "Hogares",
      href: "#",
    },
    {
      name: "Empresas",
      href: "#",
    },
    {
      name: "GNV",
      href: "#",
    },
    {
      name: "Constructores",
      href: "#",
    },
  ],
};

export const mockHeaderBlockProps = {
  data,
};
