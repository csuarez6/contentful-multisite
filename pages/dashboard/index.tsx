import { GetStaticProps } from "next";
import { getMenu } from "@/lib/services/menu-content.service";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import { useEffect, useState } from "react";
import {
  UserCircleIcon,
  ShoppingCartIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/utils/functions";
import { getCustomerInfo } from "@/lib/services/commerce-layer.service";
import { useSession } from "next-auth/react";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import Textbox from "@/components/atoms/input/textbox/TextBox";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectInput from "@/components/atoms/selectInput/SelectInput";
import Icon from "@/components/atoms/icon/Icon";

const subNavigation = [
  { name: "Perfíl", href: "#", icon: UserCircleIcon, current: true },
  {
    name: "Compras",
    href: "/dashboard/orders",
    icon: ShoppingCartIcon,
    current: false,
  },
  {
    name: "Direcciones",
    href: "/dashboard/addresses",
    icon: MapPinIcon,
    current: false,
  },
];

export interface ITemsForm {
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  cellPhone: string;
  contractNumber: string;
}

const schema = yup.object({
  name: yup.string().required("Dato Requerido").min(3, "Mínimo 3 caracteres"),
  lastName: yup
    .string()
    .required("Dato Requerido")
    .min(3, "Mínimo 3 caracteres"),
  documentType: yup.string().required("Dato Requerido"),
  documentNumber: yup
    .number()
    .required("Dato Requerido")
    .nullable()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive("Solo números positivos"),
  cellPhone: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .required("Dato Requerido")
    .min(8, "Faltan Números"),
  contractNumber: yup.string().required("Dato Requerido"),
});

const Dashboard = () => {
  const { status, data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    bgcolor: "bg-red-50",
    color: "text-red-800"
  });
  const [customerDataForm, setCustomerDataForm] = useState({
    name: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
    email: "",
    cellPhone: "",
    contractNumber: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<ITemsForm>({
    mode: "onChange",
    resolver: yupResolver(schema),
    shouldUnregister: true,
    defaultValues: customerDataForm,
  });

  const selectOptions = [
    {
      label: "Seleccione un tipo de documento",
      value: "",
    },
    {
      label: "Cédula",
      value: "cedula",
    },
    {
      label: "Pasaporte",
      value: "pasaporte",
    },
  ];

  useEffect(() => {
    if (status === "authenticated" && customerDataForm.email === "") {
      getCustomerInfo(session.user["accessToken"]).then((data) => {
        const info = data.data;
        setCustomerDataForm({
          name: info?.metadata["name"],
          lastName: info?.metadata["lastName"],
          documentType: info?.metadata["documentType"],
          documentNumber: info?.metadata["documentNumber"],
          email: info?.email,
          cellPhone: info?.metadata["cellPhone"],
          contractNumber: info?.metadata["contractNumber"],
        });
      });
    }
  }, [status, session, customerDataForm.email]);

  useEffect(() => {
    setValue("name", customerDataForm.name);
    setValue("lastName", customerDataForm.lastName);
    setValue("documentType", customerDataForm.documentType);
    setValue("documentNumber", customerDataForm.documentNumber);
    setValue("email", customerDataForm.email);
    setValue("cellPhone", customerDataForm.cellPhone);
    setValue("contractNumber", customerDataForm.contractNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerDataForm]);

  const onSubmit = (data: ITemsForm) => {
    fetch("/api/customer-myaccount/profile", {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const { error } = json;
        if (!error) {
          setErrorMessage("Datos guardados con éxito!");
          setShowAlert({ show: true, bgcolor: "bg-green-50 border-green-950", color: "text-green-800" });
        } else {
          setErrorMessage({ error });
          setShowAlert({ show: true, bgcolor: "bg-red-50 border-red-950", color: "text-red-800" });
        }
      })
      .catch((err) => {
        if (!navigator.onLine) {
          setErrorMessage(
            "Comprueba tu conexión a internet e intenta de nuevo por favor."
          );
          setShowAlert({ show: true, bgcolor: "bg-red-50 border-red-950", color: "text-red-800" });
        }
        console.warn(err);
      })
      .finally(() => {
        // setRefreshTokenReCaptcha(refreshTokenReCaptcha + 1);
      });
  };

  const formatToPhone = (event) => {
    if ((event.keyCode < 48 || event.keyCode > 57) &&
      (event.keyCode < 96 || event.keyCode > 105) &&
      event.keyCode !== 190 && event.keyCode !== 110 &&
      event.keyCode !== 8 && event.keyCode !== 9) {
      event.preventDefault();
      return false;
    }
    setTimeout(() => {
      const target = event.target;
      const input = event.target.value.replace(/\D/g, '').substring(0, 10); // First ten digits
      const first = input.substring(0, 4);
      const middle = input.substring(4, 6);
      if (input.length > 4) { target.value = `${first}-${middle}`; }
      else if (input.length > 0) { target.value = `${first}`; }
      return true;
    }, 200);
  };

  return (
    <>
      <div className="overflow-hidden">
        <div className="main-container">
          <div className="h-full">
            <main className="pb-10 mx-auto max-w-7xl lg:py-12">
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
                  <nav className="space-y-1">
                    {subNavigation.map((item) => (
                      <CustomLink
                        content={{ urlPath: item.href }}
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-grey-90 text-blue-dark"
                            : "text-grey-60 hover:text-blue-dark hover:bg-grey-90",
                          "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={classNames("flex-shrink-0 -ml-1 mr-3 h-6 w-6")}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </CustomLink>
                    ))}
                  </nav>
                </aside>

                {/* Payment details */}
                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                  <HeadingCard
                    title="Detalles usuario"
                    headClasses="w-full !justify-center text-2xl text-blue-dark mt-2"
                    hideCheck={true}
                  >
                    {errorMessage && showAlert.show && (
                      <div
                        className={classNames(
                          "p-4 rounded-md border",
                          showAlert.bgcolor
                        )}
                      >
                        <div className="flex">
                          <div className="ml-3">
                            <p
                              className={classNames(
                                "text-sm font-medium",
                                showAlert.color
                              )}
                            >
                              {errorMessage}
                            </p>
                          </div>
                          <div className="pl-3 ml-auto">
                            <div className="-mx-1.5 -my-1.5">
                              <button
                                onClick={() =>
                                  setShowAlert({ show: false, bgcolor: "bg-red-50 border-red-950", color: "bg-red-800" })
                                }
                                type="button"
                                className={classNames(
                                  "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-50",
                                  showAlert.color,
                                  showAlert.bgcolor,
                                )}
                              >
                                <span className="sr-only">Dismiss</span>
                                <Icon className="w-5 h-5" icon="cancel" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <p className="pb-2 font-bold">
                        Todos los campos marcados con <span className='text-red-700'>*</span> son obligatorios.
                      </p>
                      <div className="flex flex-col gap-6 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                          <Textbox
                            id="name"
                            name="name"
                            type="text"
                            label="Nombres"
                            className="form-input"
                            isError={!!errors.name}
                            errorMessage={errors?.name?.message}
                            autoComplete="on"
                            {...register("name")}
                            isRequired={true}
                          />

                          <Textbox
                            id="lastName"
                            type="text"
                            label="Apellidos"
                            className="form-input"
                            isError={!!errors.lastName}
                            errorMessage={errors?.lastName?.message}
                            autoComplete="on"
                            {...register("lastName")}
                            isRequired={true}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                          <SelectInput
                            selectOptions={selectOptions}
                            className=""
                            label="Tipo Documento"
                            id="documentType"
                            isError={!!errors.documentType}
                            errorMessage={errors?.documentType?.message}
                            {...register("documentType")}
                            isRequired={true}
                          />

                          <Textbox
                            id="documentNumber"
                            type="text"
                            label="Número Documento"
                            className="form-input"
                            isError={!!errors.documentNumber}
                            errorMessage={errors?.documentNumber?.message}
                            autoComplete="on"
                            {...register("documentNumber")}
                            isRequired={true}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                          <Textbox
                            id="email"
                            type="email"
                            label="Correo Electrónico"
                            className="form-input text-grey-60"
                            isError={!!errors.email}
                            errorMessage={errors?.email?.message}
                            autoComplete="on"
                            {...register("email")}
                            readOnly
                            disabled
                            isRequired={false}
                          />

                          <Textbox
                            id="cellPhone"
                            type="text"
                            label="Celular"
                            className="form-input"
                            isError={!!errors.cellPhone}
                            errorMessage={errors?.cellPhone?.message}
                            autoComplete="on"
                            {...register("cellPhone")}
                            isRequired={true}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                          <Textbox
                            id="contractNumber"
                            type="text"
                            placeholder='0000-00'
                            label="Número de Cuenta Contrato"
                            className="form-input"
                            isError={!!errors.contractNumber}
                            errorMessage={errors?.contractNumber?.message}
                            autoComplete="on"
                            {...register("contractNumber")}
                            isRequired={true}
                            onKeyDown={(event) => formatToPhone(event)}
                          />
                        </div>
                      </div>
                      <div className="self-end mt-[25px]">
                        <button
                          type="submit"
                          disabled={!isValid}
                          className="button button-primary"
                        >
                          Actualizar
                        </button>
                      </div>
                    </form>
                  </HeadingCard>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
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
        name: "Mi cuenta",
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

export default Dashboard;
