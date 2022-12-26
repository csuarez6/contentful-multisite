import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  listedContent: [
    {
      title: 'A1. vanzar es disfrutar el calor de hogar con nuevos gasodomésticos',
      image: {
        url: 'https://via.placeholder.com/1920x600',
      },
      cta: {
        href: '#',
        name: 'Ir a la tienda',
      }
    },
    {
      title: '2. Avanzar es aprovechar los precios que tendrás con Vanti Listo',
      image: {
        url: 'https://via.placeholder.com/1920x600',
      },
      cta: {
        href: '#',
        name: 'Conocer Vanti Listo',
      }
    },
    {
      title: '3. Avanzar es instalar puntos de gas para tus gasodomésticos',
      image: {
        url: 'https://via.placeholder.com/1920x600',
      },
      cta: {
        href: '#',
        name: 'Solicitar punto de gas',
      }
    },
    {
      title: '4. Avanzar es aprovechar los precios que tendrás con Vanti Listo',
      image: {
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
