import { IFormBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

const dataRPO: IFormBlock = {
  title: "Bloque Formulario RPO",
  description: RICHTEXT_SHORT_SIMPLE,
  simpleView: "RPO"
};

const dataVantilisto: IFormBlock = {
  title: "Bloque Formulario vanti listo",
  description: RICHTEXT_SHORT_SIMPLE,
  simpleView: "Vantilisto"
};

export const mockInquiryFormsProps = {
  dataRPO,
  dataVantilisto
};
