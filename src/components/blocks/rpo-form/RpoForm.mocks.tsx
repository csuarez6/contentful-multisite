import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  subtitle: 'Consulta tu cupo con Vanti Listo',
  description: RICHTEXT_SHORT_SIMPLE,
  listedForm: {
    title: 'qui dolorem ipsum, quia dolor sit amet consectetur',
    subTitle: '$ 3.000.000',
    dataForm: [
      {
        name: 'Nombre del titular',
        value: ''
      },
      {
        name: 'Dirección del predio',
        value: 'Calle 1 A # 45-12'
      }
    ]
  }
};

export const mockRpoFormProps = {
  data,
};
