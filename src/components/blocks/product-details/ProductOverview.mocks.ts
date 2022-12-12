import { IProductDetails } from "@/lib/interfaces/product-cf.interface";

const data: IProductDetails = {
  productName: 'Zip Tote Basket',
  price: '$140',
  images: [
    {
      title: 'Angled view 1',
      url: 'https://via.placeholder.com/1216x916/f2f2f2/000',
      description: 'Angled front view with bag zipped and handles upright.',
    },
    {
      title: 'Angled view 2 ',
      url: 'https://via.placeholder.com/1216x916/b00/fff',
      description: 'Angled front view with bag zipped and handles upright.',
    },
    {
      title: 'Angled view 3',
      url: 'https://via.placeholder.com/1216x916/0b0/fff',
      description: 'Angled front view with bag zipped and handles upright.',
    },
    {
      title: 'Angled view 4',
      url: 'https://via.placeholder.com/1216x916/00b/fff',
      description: 'Angled front view with bag zipped and handles upright.',
    }
  ],
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
  details: [
    "Instalación:  No incluida",
    "Fabricante:  Tecnocalor SAS",
    "Referencia:   H-GHHXYHJ"
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
  }
};

export const mockProductOverviewProps = {
  data,
};
