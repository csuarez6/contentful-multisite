import { IProductOverviewDetails, PaymentMethodType } from "@/lib/interfaces/product-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { COMMERLAYER_MARKET_IDS } from "@/constants/commerceLayer.constants";

const data: IProductOverviewDetails = {
  name: 'Calefactor de Torre',
  promoTitle: 'Calefactor de Torre',
  priceGasodomestico: '$420.000',
  priceBeforeGasodomestico: '$450.000',
  priceVantiListo: '$320.000',
  priceBeforeVantiListo: '$350.000',
  productsQuantityGasodomestico: '20',
  productsQuantityVantiListo: '10',
  state: 'Nuevo',
  promotion: '30%',
  sku: "18217",
  rating: 3.6,
  cta: {
    href: '',
    name: 'Comprar con PSE'
  },
  promoImage: {
    url: 'https://via.placeholder.com/600x550',
    width: 500,
    height: 400
  },
  imagesCollection: {
    items: [
      {
        url: 'https://via.placeholder.com/600x550',
        width: 500,
        height: 400
      },
      {
        url: 'https://via.placeholder.com/600x550',
        width: 500,
        height: 400
      },
      {
        url: 'https://via.placeholder.com/600x550',
        width: 500,
        height: 400
      },
      {
        url: 'https://via.placeholder.com/600x550',
        width: 500,
        height: 400
      },
      {
        url: 'https://via.placeholder.com/600x550',
        width: 500,
        height: 400
      },
      {
        url: 'https://via.placeholder.com/600x550',
        width: 500,
        height: 400
      },
      {
        url: 'https://via.placeholder.com/600x550',
        width: 500,
        height: 400
      },
      {
        url: 'https://via.placeholder.com/600x550',
        width: 500,
        height: 400
      },
      {
        url: 'https://via.placeholder.com/600x550',
        width: 500,
        height: 400
      },
      {
        url: 'https://via.placeholder.com/600x550',
        width: 500,
        height: 400
      }
    ],
  },
  footerText: {
    href: '#',
    name: 'Ten en cuenta nuestra política de cambios y devoluciones y derecho de retracto'
  },
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  productFeatures: RICHTEXT_SHORT_SIMPLE,
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
  features: RICHTEXT_SHORT_SIMPLE,
  warranty: {
    name: "name",
    description: RICHTEXT_SHORT_SIMPLE
  },
  marketId: COMMERLAYER_MARKET_IDS.GASODOMESTICOS
};

export const mockProductOverviewProps = {
  data,
};
