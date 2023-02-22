import { IFormBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

const data: IFormBlock = {
  title: "Bloque Formulario RPO",
  description: RICHTEXT_SHORT_SIMPLE,
  simpleView: "Identidad"
};

export const mockIdentityFormProps = {
  data,
};
