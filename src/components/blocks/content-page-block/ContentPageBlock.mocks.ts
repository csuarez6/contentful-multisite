import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  subtitle: 'Subtítulo',
  description: RICHTEXT_SHORT_SIMPLE,
};
export const mockContentPageBlockProps = {
  data
};