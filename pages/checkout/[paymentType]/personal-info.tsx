import { ReactElement, useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "@/context/Checkout";
import { useLastPath } from "@/hooks/utils/useLastPath";
import TextBox from "@/components/atoms/input/textbox/TextBox";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { GetStaticPaths, GetStaticProps } from "next";
import { getMenu } from "@/lib/services/menu-content.service";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID } from "@/constants/contentful-ids.constants";

interface ICustomer {
  name: string;
  lastName: string;
  cellPhone: number;
  email: string;
}

const schema = yup.object({
  name: yup.string().required("Dato Requerido"),
  lastName: yup.string().required("Dato Requerido"),
  cellPhone: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .required("Dato Requerido"),
  email: yup.string().email("Email no válido").required("Dato Requerido"),
});

const STEP_META_FIELD = "hasPersonalInfo";

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

    const { name, lastName, cellPhone } = order.metadata;

    reset({
      email: order.customer_email,
      name,
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
    <HeadingCard
      classes="col-span-2"
      title="2. Ingresar datos personales"
      icon="location"
      isCheck={isCompleted}
    >
      <div className="bg-white rounded-lg">
        <form className="flex flex-wrap max-w-full gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <TextBox
              id="name"
              className="algo"
              label="Escribe tu nombre"
              placeholder="Nombre"
              {...register("name")}
            />
            {
              errors.name?.message && <p className="mt-1 text-red-600">{errors.name?.message}</p>
            }
          </div>
          <div className="w-full">
            <TextBox
              id="lastName"
              name="lastName"
              label="Escribe tu apellido"
              placeholder="Apellido"
              {...register("lastName")}
            />
            {
              errors.lastName?.message && <p className="mt-1 text-red-600">{errors.lastName?.message}</p>
            }
          </div>
          <div className="w-full">
            <TextBox
              id="cellPhone"
              type="number"
              name="cellPhone"
              label="Escribe tu numero de celular"
              placeholder="000 000 0000"
              {...register("cellPhone")}
            />
            {
              errors.cellPhone?.message && <p className="mt-1 text-red-600">{errors.cellPhone?.message}</p>
            }
          </div>
          <div className="w-full">
            <TextBox
              id="email"
              type="email"
              name="email"
              label="Escribe tu email"
              placeholder="Email"
              {...register("email")}
            />
            {
              errors.email?.message && <p className="mt-1 text-red-600">{errors.email?.message}</p>
            }
          </div>
          <div className="flex justify-end w-full gap-3">
            <button className="button button-outline" type="button" onClick={handlePrev}>
              Volver
            </button>
            <button className="button button-primary" type="submit">Continuar</button>
          </div>
        </form>
      </div>
    </HeadingCard>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [];
  return { paths, fallback: "blocking" };
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {

  const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 3);
  const helpButton = await getMenu(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

  return {
    props: {
      layout: {
        name: 'Orden - Informacion Personal',
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

CheckoutPersonalInfo.getLayout = (page: ReactElement, pageProps: any) => {
  return defaultLayout(<CheckoutLayout>{page}</CheckoutLayout>, pageProps);
};

export default CheckoutPersonalInfo;
