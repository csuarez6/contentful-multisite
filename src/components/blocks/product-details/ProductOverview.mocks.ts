import { IProductOverviewDetails, PaymentMethodType } from "@/lib/interfaces/product-cf.interface";

const data: IProductOverviewDetails = {
  promoTitle: 'Calefactor de Torre',
  price: '420.000',
  priceBefore: '450.000',
  productsQuantity: '1.000',
  state: 'Nuevo',
  promotion: '30%',
  sku: "1010101010",
  rating: 3.6,
  cta: {
    href: '',
    name: 'Comprar con PSE'
  },
  imagesCollection: {
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
      type: PaymentMethodType.vantilisto
    },
    {
      name: "PSE",
      type: PaymentMethodType.pse
    },
    {
      name: "Factura del gas",
      type: PaymentMethodType.factura
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
  }
};

export const mockProductOverviewProps = {
  data,
};
