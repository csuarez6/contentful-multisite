import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  featuredContentsCollection: {
    items: [
      {
        name: "Solicitar punto de gas",
        promoTitle: "Solicitar nuevo punto de gas",
        promoDescription: {
          __typename: "AuxCustomContentPromoDescription",
          json: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: "Instala tu nuevo punto de gas para que tengas un servicio más constante y seguro en tu hogar.",
                    nodeType: "text"
                  }
                ],
                nodeType: "paragraph"
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: "$100.000",
                    nodeType: "text"
                  }
                ],
                nodeType: "paragraph"
              }
            ],
            nodeType: "document"
          }
        },
        promoImage: {
          title: "Solicitar nuevo punto de gas",
          description: "",
          contentType: "image/png",
          url: "https://images.ctfassets.net/3brzg7q3bvg1/7uBUtCEOdu46BS3lvSgJRm/53c1c715cc752ff79a4165b162080271/Solicitarpuntogas.png",
          width: 1952,
          height: 1600
        },
        promoIcon: "installation"
      },
      {
        name: "Adquirir gasodomésticos",
        promoTitle: "Adquirir gasodoméstico",
        promoDescription: {
          __typename: "AuxCustomContentPromoDescription",
          json: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: "Compra gasodomésticos de las mejores marcas que tenemos para ti.",
                    nodeType: "text"
                  }
                ],
                nodeType: "paragraph"
              }
            ],
            nodeType: "document"
          }
        },
        promoImage: null,
        promoIcon: "expert",
      },
      {
        name: "Reparar e instalar",
        promoTitle: "Solicitar reparación e instalación",
        promoDescription: {
          __typename: "AuxCustomContentPromoDescription",
          json: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: "Solicita y agenda el mantenimiento, reparación e instalación de tus gasodomésticos con un equipo de profesionales listos para resolver cualquier inconveniente en manos de expertos",
                    nodeType: "text"
                  }
                ],
                nodeType: "paragraph"
              }
            ],
            nodeType: "document"
          }
        },
        promoImage: {
          title: "Solicitar nuevo punto de gas",
          description: "",
          contentType: "image/png",
          url: "https://images.ctfassets.net/3brzg7q3bvg1/7uBUtCEOdu46BS3lvSgJRm/53c1c715cc752ff79a4165b162080271/Solicitarpuntogas.png",
          width: 1952,
          height: 1600
        },
        promoIcon: "gas-services"
      },
      {
        name: "Financiar con Vanti Listo",
        promoTitle: "Financiar con Vanti Listo",
        promoDescription: {
          __typename: "AuxCustomContentPromoDescription",
          json: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: "Con Vanti Listo, adquiere tus productos favoritos, y págalos con tu factura de gas natural,mes a mes",
                    nodeType: "text"
                  }
                ],
                nodeType: "paragraph"
              }
            ],
            nodeType: "document"
          }
        },
        promoImage: {
          title: "Solicitar nuevo punto de gas",
          description: "",
          contentType: "image/png",
          url: "https://images.ctfassets.net/3brzg7q3bvg1/7uBUtCEOdu46BS3lvSgJRm/53c1c715cc752ff79a4165b162080271/Solicitarpuntogas.png",
          width: 1952,
          height: 1600
        },
        promoIcon: "vantilisto",
      },
      {
        name: "Adquirir asistencias",
        internalLink: {
          slug: "/ad-asistencias"
        },
        externalLink: "https://www.google.com",
        ctaLabel: "Adquirir",
        promoTitle: "Adquirir asistencias",
        promoDescription: {
          __typename: "AuxCustomContentPromoDescription",
          json: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: "Es un conjunto de servicios para protección y seguridad del hogar",
                    nodeType: "text"
                  }
                ],
                nodeType: "paragraph"
              }
            ],
            nodeType: "document"
          }
        },
        promoImage: null,
        promoIcon: "hands"
      }
    ]
  }
};

export const mockServicesTabsProps = {
  data,
};
