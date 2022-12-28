import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IAccordionBlock } from "@/lib/interfaces/accordion-cf.interface";

export const data: IAccordionBlock = {
  title: "Lorem ipsum dolor",
  description: RICHTEXT_SHORT_SIMPLE,
  featuredContentsCollection: {
    items: [
      {
        promoTitle: "Lorem ipsum",
        promoDescription: RICHTEXT_SHORT_SIMPLE,
      },
      {
        promoTitle: "Lorem ipsum",
        promoDescription: RICHTEXT_SHORT_SIMPLE,
      },
      {
        promoTitle: "Lorem ipsum",
        promoDescription: RICHTEXT_SHORT_SIMPLE,
      },
      {
        promoTitle: "Lorem ipsum",
        promoDescription: RICHTEXT_SHORT_SIMPLE,
      },
    ],
  },
};
