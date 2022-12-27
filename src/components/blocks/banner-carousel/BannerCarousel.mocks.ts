import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  listedContent: [
    {
      promoTitle: 'A1. vanzar es disfrutar el calor de hogar con nuevos gasodomésticos',
      promoImage: {
        url: 'https://via.placeholder.com/1920x600',
      },
      cta: {
        href: '#',
        name: 'Ir a la tienda',
      }
    },
    {
      promoTitle: '2. Avanzar es aprovechar los precios que tendrás con Vanti Listo',
      promoImage: {
        url: 'https://via.placeholder.com/1920x600',
      },
      cta: {
        href: '#',
        name: 'Conocer Vanti Listo',
      }
    },
    {
      promoTitle: '3. Avanzar es instalar puntos de gas para tus gasodomésticos',
      promoImage: {
        url: 'https://via.placeholder.com/1920x600',
      },
      cta: {
        href: '#',
        name: 'Solicitar punto de gas',
      }
    },
    {
      promoTitle: '4. Avanzar es aprovechar los precios que tendrás con Vanti Listo',
      promoImage: {
        url: 'https://via.placeholder.com/1920x600',
      },
      cta: {
        href: '#',
        name: 'Conocer Vanti Listo',
      }
    }
  ]
};

export const mockBannerCarouselProps = {
  data,
};
