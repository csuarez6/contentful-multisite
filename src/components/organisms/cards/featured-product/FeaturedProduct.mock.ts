import { IProductDetails, PaymentMethodType } from "@/lib/interfaces/product-cf.interface";

export const data: IProductDetails = {
    productName: 'Calefactor de torre',
    state: 'nuevo',
    promotion: '30%',
    images: [
        {
            url: 'https://via.placeholder.com/1120x970',
            title: 'product'
        }
    ],
    cta: {
        href: '#',
        name: 'Conoce mas'
    },
    description: '$100.000',
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
