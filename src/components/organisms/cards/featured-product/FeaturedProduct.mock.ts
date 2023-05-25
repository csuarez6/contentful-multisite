import { COMMERLAYER_MARKET_IDS } from "@/constants/commerceLayer.constants";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IProductOverviewDetails, PaymentMethodType } from "@/lib/interfaces/product-cf.interface";

const fetchs = [
  {
    url: "/api/product/prices/:sku",
    method: "GET",
    status: 200,
    response: {
      priceBefore: "$100.000",
      price: "$90.000",
    },
  },
];

const data: IProductOverviewDetails = {
  promoTitle: 'Calefactor de torre',
  state: 'nuevo',
  promotion: '30%',
  imagesCollection: {
    items: [
      {
        url: 'https://via.placeholder.com/1120x970',
        title: 'product'
      }
    ]
  },
  cta: {
    href: '#',
    name: 'Conoce mas'
  },
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  priceGasodomestico: '$100.000,00',
  priceBeforeGasodomestico: '$90.000,00',
  priceVantiListo: '$200.000,00',
  priceBeforeVantiListo: '$190.000,00',
  productsQuantityGasodomestico: '10',
  productsQuantityVantiListo: '10',
  rating: 3.1,
  paymentMethods: [
    {
      name: 'VantiListo',
      type: PaymentMethodType.vantilisto
    },
    {
      name: 'PSE',
      type: PaymentMethodType.pse
    }
  ],
  marketId: COMMERLAYER_MARKET_IDS.VANTILISTO
};

const list = [
  {
    sys: {
      id: 'pid-0',
    },
    promoTitle: 'Calefactor de torre',
    imagesCollection: {
      items: [
        {
          url: 'https://via.placeholder.com/1120x970',
          title: 'product'
        }
      ]
    },
    cta: {
      href: '#',
      name: 'Ver detalle'
    },
    promoDescription: RICHTEXT_SHORT_SIMPLE,
    priceGasodomestico: '$100.000,00',
    priceBeforeGasodomestico: '$90.000,00',
    priceVantiListo: '',
    priceBeforeVantiListo: '',
  },{
    sys: {
      id: 'pid-1',
    },
    promoTitle: 'Calefactor de torre',
    imagesCollection: {
      items: [
        {
          url: 'https://via.placeholder.com/1120x970',
          title: 'product'
        }
      ]
    },
    cta: {
      href: '#',
      name: 'Ver detalle'
    },
    promoDescription: RICHTEXT_SHORT_SIMPLE,
    priceGasodomestico: '$100.000,00',
    priceBeforeGasodomestico: '$90.000,00',
    priceVantiListo: '',
    priceBeforeVantiListo: '',
  }
];

export const mockFeaturedProductProps = {
  data,
  fetchs,
  list
};
