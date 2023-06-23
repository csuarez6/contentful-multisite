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
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import { PSE_STEPS_TO_VERIFY } from "@/constants/checkout.constants";
import SelectInput from "@/components/atoms/selectInput/SelectInput";

interface ICustomer {
  name: string;
  lastName: string;
  cellPhone: number;
  email: string;
  documentType: string;
  documentNumber: string;
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
  documentType: yup.string().required("Dato Requerido"),
  documentNumber: yup
    .number()
    .required("Dato Requerido")
    .nullable()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive("Solo números positivos"),
});

const CheckoutPersonalInfo = () => {
  const router = useRouter();
  const lastPath = useLastPath();

  const { order, flow, addCustomer } = useContext(CheckoutContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICustomer>({
    resolver: yupResolver(schema),
  });

  const isCompleted = useMemo(
    () =>
      order &&
      PSE_STEPS_TO_VERIFY.map((step) => !!order.metadata?.[step]).every(
        (i) => i
      ),
    [order]
  );

  const selectOptions = [
    {
      label: "Seleccione un tipo de documento",
      value: "",
    },
    {
      label: "Nit",
      value: "Nit",
    },
    {
      label: "Registro civil de nacimiento",
      value: "registroCivilDeNacimiento",
    },
    {
      label: "Tarjeta de Identidad",
      value: "tarjetaDeIdentidad",
    },
    {
      label: "Cédula de ciudadanía",
      value: "cedula",
    },
    {
      label: "Cédula de extranjeria",
      value: "cedulaDeExtranjeria",
    },
    {
      label: "Pasaporte",
      value: "pasaporte",
    },
    {
      label: "Documento identificación extranjero",
      value: "documentoIdentificaciónExtranjero",
    },
    {
      label: "Sin identificación del exterior",
      value: "sinIdentificaciónDelExterior",
    },
    {
      label: "PEP",
      value: "pep",
    },
    {
      label: "NIF del extranjero",
      value: "nifDelExtranjero",
    },
    {
      label: "NUIP",
      value: "nuip",
    },
  ];

  useEffect(() => {
    reset({
      email: order?.customer_email ?? "",
      name: order?.metadata?.name ?? "",
      lastName: order?.metadata?.lastName ?? "",
      cellPhone: order?.metadata?.cellPhone ?? "",
      documentNumber: order?.metadata?.documentNumber ?? "",
      documentType: order?.metadata?.documentType ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const onSubmit = async (data: ICustomer) => {
    try {
      await addCustomer(data);
      await handleNext();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleNext = async () => {
    await router.push(
      `/checkout/${router.query.paymentType}/${flow.getNextStep(lastPath)}`
    );
  };

  const handlePrev = async () => {
    await router.push(
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
        <form
          className="flex flex-wrap max-w-full gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <TextBox
              id="name"
              className="algo"
              label="Escribe tu nombre"
              placeholder="Nombre"
              isRequired={true}
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="mt-1 text-red-600">{errors.name?.message}</p>
            )}
          </div>
          <div className="w-full">
            <TextBox
              id="lastName"
              name="lastName"
              label="Escribe tu apellido"
              placeholder="Apellido"
              isRequired={true}
              {...register("lastName")}
            />
            {errors.lastName?.message && (
              <p className="mt-1 text-red-600">{errors.lastName?.message}</p>
            )}
          </div>
          <div className="w-full">
            <TextBox
              id="cellPhone"
              type="number"
              name="cellPhone"
              label="Escribe tu numero de celular"
              placeholder="000 000 0000"
              isRequired={true}
              {...register("cellPhone")}
            />
            {errors.cellPhone?.message && (
              <p className="mt-1 text-red-600">{errors.cellPhone?.message}</p>
            )}
          </div>
          <div className="w-full">
            <TextBox
              id="email"
              type="email"
              name="email"
              label="Escribe tu email"
              placeholder="Email"
              isRequired={true}
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="mt-1 text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-x-3">
            <div>
              <SelectInput
                selectOptions={selectOptions}
                className=""
                label="Tipo de documento"
                id="documentType"
                {...register("documentType")}
                isRequired={true}
              />
              {errors.documentType?.message && (
                <p className="mt-1 text-red-600">
                  {errors.documentType?.message}
                </p>
              )}
            </div>
            <div>
              <TextBox
                id="documentNumber"
                type="text"
                label="Número de documento"
                className="form-input"
                autoComplete="on"
                {...register("documentNumber")}
                isRequired={true}
              />
              {errors.documentNumber?.message && (
                <p className="mt-1 text-red-600">
                  {errors.documentNumber?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end w-full gap-3">
            <button
              className="button button-outline"
              type="button"
              onClick={handlePrev}
            >
              Volver
            </button>
            <button className="button button-primary" type="submit">
              Continuar
            </button>
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
  const footerInfo = await getMenu(
    DEFAULT_FOOTER_ID,
    context.preview ?? false,
    3
  );
  const helpButton = await getMenu(
    DEFAULT_HELP_BUTTON_ID,
    context.preview ?? false
  );

  return {
    props: {
      layout: {
        name: "Informacion personal de la orden",
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
