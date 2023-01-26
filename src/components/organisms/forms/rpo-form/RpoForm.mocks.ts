import { IRpoForm } from "@/lib/interfaces/IForm-cf";

const data: IRpoForm = {
  title: 'qui dolorem ipsum, quia dolor sit amet consectetur',
  subTitle: '$ 3.000.000',
  dataForm: [
    {
      name:'Nombre del titular',
      value:''
    },
    {
      name: 'Dirección del predio',
      value: 'Calle 1 A # 45-12'
    }
  ]
};


export const mockRpoFormsProps = {
  data,
};
