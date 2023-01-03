import { IProductDetails } from "@/lib/interfaces/product-cf.interface";

const data: IProductDetails = {
  productName: 'Calefactor de Torre',
  price: '420.000',
  priceBefore: '450.000',
  productsQuantity: '1.000',
  state: 'Nuevo',
  promotion: '30%',
  referenceCode: 1010101010,
  rating: 3.6,
  cta: {
    href: '',
    name:'Comprar con PSE'
  },
  carouselData: {
    content: [
      {
        url: 'https://via.placeholder.com/600x550'
      },
      {
        url: 'https://via.placeholder.com/600x550'
      },
      {
        url: 'https://via.placeholder.com/600x550'
      },
      {
        url: 'https://via.placeholder.com/600x550'
      },
      {
        url: 'https://via.placeholder.com/600x550'
      },
      {
        url: 'https://via.placeholder.com/600x550'
      },
      {
        url: 'https://via.placeholder.com/600x550'
      },
      {
        url: 'https://via.placeholder.com/600x550'
      },
      {
        url: 'https://via.placeholder.com/600x550'
      },
      {
        url: 'https://via.placeholder.com/600x550'
      }
    ],
    footerText: {
      href: '#',
      name: 'Ten en cuenta nuestra política de cambios y devoluciones y derecho de retracto'
    }
  },
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
  details: [
    "Material: Policarbonato y PVC",
    "Capacidad: 200 w",
    "Altura: 120 cm",
    "Ancho: 80 cm",
    "Profundidad: 40 cm"
  ],
  paymentMethods: [
    {
      name: "VantiListo*",
      type: "vantilisto"
    },
    {
      name: "PSE",
      type: "pse"
    },
    {
      name: "Factura del gas",
      type: "factura"
    }
  ],
  features: {
    main: [
      {
        name: "Dimensiones",
        description: "30x 48,4x 15,1 cm"
      },
      {
        name: "Sistemas de seguridad",
        description: "5 sistemas"
      },
      {
        name: "Encendido automático",
        description: "Sí"
      },
      {
        name: "Regulador de gas",
        description: "Sí"
      },
      {
        name: "Selector de temperatura",
        description: "Sí"
      }
    ],
    description: [
      '2500 watts',
      '3 niveles de calentamiento: 800, 1200 y 2000 watts',
      '11 celdas',
      'Incrementa la temperatura de 5°C a 10°C',
      'Timer para programar el apagado y el encendido varias veces (entre 0 y 24 horas)',
      'Cubre un área de 30 m²'
    ],
    warranty: [
      '<strong>Compra protegida con Vanti</strong><br>Recibe el producto que esperabas o te devolvemos tu dinero',
      '<strong>Garantía del vendedor</strong><br>Garantía de fábrica: 12 meses'
    ]
  },
  dataSelect: [
    {
      icon: {
        icon: 'expert',
        size: 24,
        className: 'absolute'
      },
      listContened: [
        {
          label: 'Value 1',
          value: 'value1'
        },
        {
          label: 'Value 2',
          value: 'value2'
        },
        {
          label: 'Value 3',
          value: 'value3'
        },
        {
          label: 'Value 2',
          value: 'value2'
        },
        {
          label: 'Value 3',
          value: 'value3'
        },
        {
          label: 'Value 2',
          value: 'value2'
        },
        {
          label: 'Value 3',
          value: 'value3'
        }
      ],
      labelSelect: 'Instala tu gasodoméstico',
      classes: 'w-full',
      optionDefault: 'Contrata el servicio'
    },
    {
      icon: {
        icon: 'expert',
        size: 24,
        className: 'absolute'
      },
      listContened: [
        {
          label: 'Value 1',
          value: 'value1'
        },
        {
          label: 'Value 2',
          value: 'value2'
        },
        {
          label: 'Value 3',
          value: 'value3'
        },
        {
          label: 'Value 2',
          value: 'value2'
        },
        {
          label: 'Value 3',
          value: 'value3'
        },
        {
          label: 'Value 2',
          value: 'value2'
        },
        {
          label: 'Value 3',
          value: 'value3'
        }
      ],
      labelSelect: 'Tipo de envío',
      classes: 'w-full',
      optionDefault: 'Estándar (5 a 10 dias hábiles)'
    },
    {
      icon: {
        icon: 'expert',
        size: 24,
        className: 'absolute'
      },
      listContened: [
        {
          label: 'Value 1',
          value: 'value1'
        },
        {
          label: 'Value 2',
          value: 'value2'
        },
        {
          label: 'Value 3',
          value: 'value3'
        },
        {
          label: 'Value 2',
          value: 'value2'
        },
        {
          label: 'Value 3',
          value: 'value3'
        },
        {
          label: 'Value 2',
          value: 'value2'
        },
        {
          label: 'Value 3',
          value: 'value3'
        }
      ],
      labelSelect: 'Garantía',
      classes: 'w-full',
      optionDefault: '1 año con el fabricante'
    }
  ],
};

export const mockProductOverviewProps = {
  data,
};
