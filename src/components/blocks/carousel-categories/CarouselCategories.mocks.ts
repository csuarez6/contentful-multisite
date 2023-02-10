import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

const data: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Título 1',
        promoImage: {
          url: 'https://via.placeholder.com/660x660.png',
          title: 'Card image'
        },
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Título 2',
        promoImage: {
          url: 'https://via.placeholder.com/660x660.png',
          title: 'Card image'
        },
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Título 3',
        promoImage: {
          url: 'https://via.placeholder.com/660x660.png',
          title: 'Card image'
        },
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Título 4',
        promoImage: {
          url: 'https://via.placeholder.com/660x660.png',
          title: 'Card image'
        },
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Título 5',
        promoImage: {
          url: 'https://via.placeholder.com/660x660.png',
          title: 'Card image'
        },
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Título 6',
        promoImage: {
          url: 'https://via.placeholder.com/660x660.png',
          title: 'Card image'
        },
        internalLink: {
          urlPath: "#"
        }
      }
    ]
  },
  view: {
    columnsSize: 3,
    alignTitle: 'Left',
  }
};

const dataTop: IPromoBlock = {
  title: 'Título',
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Título 1',
        promoImage: {
          url: 'https://via.placeholder.com/660x660.png',
          title: 'Card image'
        },
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Título 2',
        promoImage: {
          url: 'https://via.placeholder.com/660x660.png',
          title: 'Card image'
        },
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Título 3',
        promoImage: {
          url: 'https://via.placeholder.com/660x660.png',
          title: 'Card image'
        },
        internalLink: {
          urlPath: "#"
        }
      }
    ]
  },
  view: {
    columnsSize: 3,
  }
};

const dataStatic: IPromoBlock = {
  title: 'Título',
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Título 1',
        promoImage: {
          url: 'https://via.placeholder.com/660x660.png',
          title: 'Card image'
        },
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Título 2',
        promoImage: {
          url: 'https://via.placeholder.com/660x660.png',
          title: 'Card image'
        },
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Título 3',
        promoImage: {
          url: 'https://via.placeholder.com/660x660.png',
          title: 'Card image'
        },
        internalLink: {
          urlPath: "#"
        }
      }
    ]
  },
  view: {
    columnsSize: 3,
    isSlider: false
  },
    ctaCollection: {
    items: [
      {
        externalLink: 'www.google.com',
        name: 'button'
      },
      {
        externalLink: '#',
        name: 'button'
      }
    ]
  },
};

export const mockCarouselCategoriesProps = {
  data,
  dataTop,
  dataStatic
};
