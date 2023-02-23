import { INavigation } from "@/lib/interfaces/menu-cf.interface";

const data: INavigation = {
  promoTitle: 'Líneas de atención',
  mainNavCollection: {
    items: [
      {
        promoIcon: 'whatsapp',
        promoTitle: '3154164164',
        subtitle: 'whatsapp',
        externalLink:'#'
      },
      {
        promoIcon: 'callback',
        promoTitle: '601 123 4567',
        subtitle: 'Teléfono fijo',
        externalLink:'#'
      },
      {
        promoIcon: 'chat',
        promoTitle: 'Servicioalcliente@grupovanti.com',
        subtitle: 'Correo electrónico de cóntacto',
        externalLink:'#'
      },
    ]
  },
};

export const mockServiceLineProps = {
  data
};
