import { PaymentMethodType } from "@/lib/interfaces/product-cf.interface";
import { IFeaturedProductBlock } from "./FeaturedProductBlock";

export const data: IFeaturedProductBlock = {
    title: 'Te puede interesar',
    listedContent: [
        {
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
        },
        {
            productName: 'Enfriador de torre',
            state: 'nuevo',
            promotion: '40%',
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
            rating: 3.8,
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
        }, 
        {
            productName: 'Congelador de torre',
            state: 'nuevo',
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
            description: '$300.000',
            priceBefore: '$300.000',
            price: '$250.000',
            rating: 5,
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
        },
        {
            productName: 'Tibiador de torre',
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
        },
        {
            productName: 'Calentador de torre',
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
        }, 
        {
            productName: 'Lorem de torre',
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
        },
        {
            productName: 'Ipsum de torre',
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
        },
        {
            productName: 'Amet de torre',
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
        }
    ]
};