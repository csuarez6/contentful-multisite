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
    priceBefore: '$100.000',
    price: '$90.000',
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
    ]
};

export const mockFeaturedProductProps = {
    data,
    fetchs
};
