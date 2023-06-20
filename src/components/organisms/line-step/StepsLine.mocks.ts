import { IStepList } from "./StepsLine";

const data: IStepList = {
  items: [
    {
      title: "Verificar tu compra",
      path: `/`
    },
    {
      title: "Datos personales",
      path: `/personal-info`
    },
    {
      title: "Ingresar dirección",
      path: `/addresses`
    },
    {
      title: "Resumen",
      path: `/summary`
    },
  ]
};

export const mockStepsLineProps = {
  data
};
