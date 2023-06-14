import { PaymentMethodType } from "@/lib/interfaces/product-cf.interface";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

export const data: IPromoBlock = {
    title: 'Te puede interesar',
    listedContentsCollection: {
        items: [
            {
                promoTitle: 'Calefactor de torre',
                isNew: true,
                trademark: {
                    name: 'mabbe',
                },
                discount: '30%',
                promoImage: {
                    url: 'https://via.placeholder.com/1120x970',
                    title: 'product'
                },
                cta: {
                    href: '#',
                    name: 'Conoce mas'
                },
                promoDescription: RICHTEXT_SHORT_SIMPLE,
                priceGasodomestico: '$100.000,00',
                priceBeforeGasodomestico: '$90.000,00',
                priceVantiListo: '',
                priceBeforeVantiListo: '',
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
                isNew: true,
                trademark: {
                    name: 'mabbe',
                },
                discount: '40%',
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
                priceGasodomestico: '$100.000,00',
                priceBeforeGasodomestico: '$90.000,00',
                priceVantiListo: '',
                priceBeforeVantiListo: '',
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
                isNew: true,
                trademark: {
                    name: 'mabbe',
                },
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
                priceGasodomestico: '$100.000,00',
                priceBeforeGasodomestico: '$90.000,00',
                priceVantiListo: '',
                priceBeforeVantiListo: '',
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
                isNew: true,
                trademark: {
                    name: 'mabbe',
                },
                discount: '30%',
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
                priceGasodomestico: '$100.000,00',
                priceBeforeGasodomestico: '$90.000,00',
                priceVantiListo: '',
                priceBeforeVantiListo: '',
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
                isNew: true,
                trademark: {
                    name: 'mabbe',
                },
                discount: '30%',
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
                priceGasodomestico: '$100.000,00',
                priceBeforeGasodomestico: '$90.000,00',
                priceVantiListo: '',
                priceBeforeVantiListo: '',
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
                isNew: true,
                trademark: {
                    name: 'mabbe',
                },
                discount: '30%',
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
                priceGasodomestico: '$100.000,00',
                priceBeforeGasodomestico: '$90.000,00',
                priceVantiListo: '',
                priceBeforeVantiListo: '',
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
                isNew: true,
                trademark: {
                    name: 'mabbe',
                },
                discount: '30%',
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
                priceGasodomestico: '$100.000,00',
                priceBeforeGasodomestico: '$90.000,00',
                priceVantiListo: '',
                priceBeforeVantiListo: '',
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
                isNew: true,
                trademark: {
                    name: 'mabbe',
                },
                discount: '30%',
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
                priceGasodomestico: '$100.000,00',
                priceBeforeGasodomestico: '$90.000,00',
                priceVantiListo: '',
                priceBeforeVantiListo: '',
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
