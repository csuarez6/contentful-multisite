import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  listedForm: {
    title: 'qui dolorem ipsum, quia dolor sit amet consectetur',
    subTitle: '$ 3.000.000',
    // titleForm: 'Consulta tu cupo con Vanti Listo',
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
