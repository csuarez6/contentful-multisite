import { IRichText } from "@/lib/interfaces/richtext-cf.interface";
import { Document as RichTextDocument, BLOCKS } from '@contentful/rich-text-types';

const RICHTEXT_SHORT_TEST: RichTextDocument = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  "content": [
    {
      "nodeType": BLOCKS.HEADING_2,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "El olor del gas natural",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.PARAGRAPH,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "Al gas natural se le agrega un odorizante químico que tiene un olor característico para que pueda ser detectado fácilmente en caso de fuga.",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.PARAGRAPH,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "En caso de una emergencia, Vanti te ofrece un Centro de atención de emergencias y una línea telefónica disponible las 24 horas donde podrás notificar cualquier inquietud.",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.EMBEDDED_ENTRY,
      "data": {
        "target": {
          "sys": {
            "id": "2D35mvLaWU9nZDByVGEkgX",
            "type": "Link",
            "linkType": "Entry"
          }
        }
      },
      "content": []
    },
    {
      "nodeType": BLOCKS.HEADING_2,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "Ventilación óptima en el hogar",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.PARAGRAPH,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "Una de las claves para la prevención es la buena ventilación. Asegurar que tu hogar cuente con un buen flujo de aire es una contribución al buen funcionamiento de los gasodomésticos y te ayuda a eliminar los residuos de gases de combustión.",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.EMBEDDED_ENTRY,
      "data": {
        "target": {
          "sys": {
            "id": "hzo8IszUSTejjpdLsYUT1",
            "type": "Link",
            "linkType": "Entry"
          }
        }
      },
      "content": []
    },
    {
      "nodeType": BLOCKS.PARAGRAPH,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "",
          "marks": [],
          "data": {}
        },
        {
          "nodeType": BLOCKS.EMBEDDED_ENTRY,
          "data": {
            "target": {
              "sys": {
                "id": "41pfG2PNQsjAZYE6yIMJi9",
                "type": "Link",
                "linkType": "Entry"
              }
            }
          },
          "content": []
        },
        {
          "nodeType": "text",
          "value": "",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.HEADING_2,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "Monóxido de carbono (CO)",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.EMBEDDED_ASSET,
      "data": {
        "target": {
          "sys": {
            "id": "7rnItD2fImLFAkDNEh7fVG",
            "type": "Link",
            "linkType": "Asset"
          }
        }
      },
      "content": []
    },
    {
      "nodeType": BLOCKS.HEADING_4,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "¿Qué es el monóxido de carbono (CO), cómo se produce y cuáles son sus efectos?",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.PARAGRAPH,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "El monóxido de carbono es un gas incoloro, insípido e inoloro que puede producir intoxicación y se genera cuando existe una combustión incompleta de combustibles de origen fósil (gas L.P., gas natural, gasolina, etc.). Esta situación puede presentarse en los gasodomésticos que no han recibido mantenimiento periódico o se encuentran mal calibrados.",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.PARAGRAPH,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "Estos son los síntomas que pueden presentar las personas que inhalan monóxido de carbono: dolor de cabeza, náuseas, vómito, adormecimiento en extremidades y somnolencia.",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.HEADING_2,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "¿Qué debes hacer si tu hogar huele a gas?",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.EMBEDDED_ENTRY,
      "data": {
        "target": {
          "sys": {
            "id": "6K6hoaq84ydc5cd9O4uCCM",
            "type": "Link",
            "linkType": "Entry"
          }
        }
      },
      "content": []
    },
    {
      "nodeType": BLOCKS.HEADING_6,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "Acciones para la prevención:",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.EMBEDDED_ENTRY,
      "data": {
        "target": {
          "sys": {
            "id": "4Z98QyW4N3UklKWJKsfX65",
            "type": "Link",
            "linkType": "Entry"
          }
        }
      },
      "content": []
    },
    {
      "nodeType": BLOCKS.PARAGRAPH,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.PARAGRAPH,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "",
          "marks": [],
          "data": {}
        }
      ]
    }
  ]
};
const RICHTEXT_SHORT_SIMPLE_TEST: IRichText = {
  json: RICHTEXT_SHORT_TEST
};

const data: any = {
  featuredContentsCollection: {
    items: [
      {
        name: "Seguridad del gas",
        promoTitle: "Seguridad del gas",
        content: RICHTEXT_SHORT_SIMPLE_TEST,
        promoImage: {
          title: "Solicitar nuevo punto de gas",
          description: "",
          contentType: "image/png",
          url: "https://images.ctfassets.net/3brzg7q3bvg1/7uBUtCEOdu46BS3lvSgJRm/53c1c715cc752ff79a4165b162080271/Solicitarpuntogas.png",
          width: 1952,
          height: 1600
        },
        promoIcon: "installation",
      },
      {
        name: "Seguridad en Gasodomésticos",
        promoTitle: "Seguridad en Gasodomésticos",
        content: RICHTEXT_SHORT_SIMPLE_TEST,
        promoImage: {
          title: "Solicitar nuevo punto de gas",
          description: "",
          contentType: "image/png",
          url: "https://images.ctfassets.net/3brzg7q3bvg1/7uBUtCEOdu46BS3lvSgJRm/53c1c715cc752ff79a4165b162080271/Solicitarpuntogas.png",
          width: 1952,
          height: 1600
        },
        promoIcon: "expert",
      },
      {
        name: "Instalaciones internas",
        promoTitle: "Instalaciones internas",
        content: RICHTEXT_SHORT_SIMPLE_TEST,
        promoImage: {
          title: "Solicitar nuevo punto de gas",
          description: "",
          contentType: "image/png",
          url: "https://images.ctfassets.net/3brzg7q3bvg1/7uBUtCEOdu46BS3lvSgJRm/53c1c715cc752ff79a4165b162080271/Solicitarpuntogas.png",
          width: 1952,
          height: 1600
        },
        promoIcon: "gas-services",
      },
      {
        name: "Recomendaciones de uso",
        promoTitle: "Recomendaciones de uso",
        content: RICHTEXT_SHORT_SIMPLE_TEST,
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
        name: "Información para contratistas",
        promoTitle: "Información para contratistas",
        content: RICHTEXT_SHORT_SIMPLE_TEST,
        promoImage: {
          title: "Solicitar nuevo punto de gas",
          description: "",
          contentType: "image/png",
          url: "https://images.ctfassets.net/3brzg7q3bvg1/7uBUtCEOdu46BS3lvSgJRm/53c1c715cc752ff79a4165b162080271/Solicitarpuntogas.png",
          width: 1952,
          height: 1600
        },
        promoIcon: "hands",
      }
    ],
  },
  view: {
    tabDisplay: 'Icono'
  }
};

export const mockInternalNavigationTabsProps = {
  data,
};
