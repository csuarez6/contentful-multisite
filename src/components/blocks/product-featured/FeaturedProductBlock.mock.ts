import { PaymentMethodType } from "@/lib/interfaces/product-cf.interface";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";


export const data: IPromoBlock = {
    title: 'Te puede interesar',
    listedContentsCollection: {
        items: [
            {
                promoTitle: 'Calefactor de torre',
                state: 'nuevo',
                promotion: '30%',
                promoImage: {
                    url: 'https://via.placeholder.com/1120x970',
                    title: 'product'
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
            },
            {
                promoTitle: 'Enfriador de torre',
                state: 'nuevo',
                promotion: '40%',
                promoImage:
                {
                    url: 'https://via.placeholder.com/1120x970',
                    title: 'product'
                },
                cta: {
                    href: '#',
                    name: 'Conoce mas'
                },
                promoDescription: RICHTEXT_SHORT_SIMPLE,
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
                promoTitle: 'Congelador de torre',
                state: 'nuevo',
                promoImage:
                {
                    url: 'https://via.placeholder.com/1120x970',
                    title: 'product'
                },
                cta: {
                    href: '#',
                    name: 'Conoce mas'
                },
                promoDescription: RICHTEXT_SHORT_SIMPLE,
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
                promoTitle: 'Tibiador de torre',
                state: 'nuevo',
                promotion: '30%',
                promoImage:
                {
                    url: 'https://via.placeholder.com/1120x970',
                    title: 'product'
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
            },
            {
                promoTitle: 'Calentador de torre',
                state: 'nuevo',
                promotion: '30%',
                promoImage:
                {
                    url: 'https://via.placeholder.com/1120x970',
                    title: 'product'
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
            },
            {
                promoTitle: 'Lorem de torre',
                state: 'nuevo',
                promotion: '30%',
                promoImage:
                {
                    url: 'https://via.placeholder.com/1120x970',
                    title: 'product'
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
            },
            {
                promoTitle: 'Ipsum de torre',
                state: 'nuevo',
                promotion: '30%',
                promoImage:
                {
                    url: 'https://via.placeholder.com/1120x970',
                    title: 'product'
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
            },
            {
                promoTitle: 'Amet de torre',
                state: 'nuevo',
                promotion: '30%',
                promoImage:
                {
                    url: 'https://via.placeholder.com/1120x970',
                    title: 'product'
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
            }
        ]
    }

};