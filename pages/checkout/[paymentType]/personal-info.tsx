import { ReactElement, useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "src/context/Checkout";
import { useLastPath } from "src/hooks/utils/useLastPath";
import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";

interface ICustomer {
  firstName: string;
  lastName: string;
  cellPhone: number;
  email: string;
}

const schema = yup.object({
  firstName: yup.string().required("Dato Requerido"),
  lastName: yup.string().required("Dato Requerido"),
  cellPhone: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .required("Dato Requerido"),
  email: yup.string().email("Email no válido").required("Dato Requerido"),
});

const STEP_META_FIELD = "hasPesonalInfo";

const CheckoutPersonalInfo = () => {
  const router = useRouter();
  const lastPath = useLastPath();

  const { order, flow, addCustomer } = useContext(CheckoutContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ICustomer>({
    resolver: yupResolver(schema),
  });

  const isCompleted = useMemo(
    () => !!order?.metadata?.[STEP_META_FIELD],
    [order]
  );

  useEffect(() => {
    if (!isCompleted) return;

    const { firstName, lastName, cellPhone } = order.metadata;

    reset({
      email: order.customer_email,
      firstName,
      lastName,
      cellPhone,
    });
  }, [isCompleted, order, reset]);

  const onSubmit = async (data: ICustomer) => {
    try {
      await addCustomer(data);
      await handleNext();
      
    } catch (error) {
      alert(error.message);
    }
  };

  const handleNext = async () => {
    router.push(
      `/checkout/${router.query.paymentType}/${flow.getNextStep(lastPath)}`
    );
  };

  const handlePrev = async () => {
    router.push(
      `/checkout/${router.query.paymentType}/${flow.getPrevStep(lastPath)}`
    );
  };

  return (
    <>
      <h2>
        <span>Ingresar datos personales</span>
        <input type="checkbox" checked={isCompleted} readOnly />
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">Nombre</label>
        <input className="bg-sky-200" {...register("firstName")} id="firstName" />
        <p className="text-red-600">{errors.firstName?.message}</p>
        
        <label htmlFor="lastName">Apellido</label>
        <input className="bg-sky-200" {...register("lastName")} id="lastName" />
        <p className="text-red-600">{errors.lastName?.message}</p>

        <label htmlFor="cellPhone">Escríbe tu número de celular</label>
        <input
          className="bg-sky-200"
          {...register("cellPhone")}
          id="cellPhone"
        />
        <p className="text-red-600">{errors.cellPhone?.message}</p>

        <label htmlFor="email">Correo electronico</label>
        <input className="bg-sky-200" {...register("email")} id="email" />
        <p className="text-red-600">{errors.email?.message}</p>

        <button type="button" className="mr-4" onClick={handlePrev}>
          Volver
        </button>
        <button type="submit">Continuar</button>
      </form>
    </>
  );
};

CheckoutPersonalInfo.getInitialProps = () => {
  return {
    layout: {
      name: mockPageLayoutProps.data.name,
      footerInfo: mockPageLayoutProps.data.layout.footerInfo,
      headerInfo: mockPageLayoutProps.data.layout.headerInfo,
    },
  };
};

CheckoutPersonalInfo.getLayout = (page: ReactElement, pageProps: any) => {
  return defaultLayout(<CheckoutLayout>{page}</CheckoutLayout>, pageProps);
};

export default CheckoutPersonalInfo;
