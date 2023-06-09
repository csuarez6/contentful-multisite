import { GetStaticProps } from "next";
import { getMenu } from "@/lib/services/menu-content.service";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import {
  UserCircleIcon,
  ShoppingCartIcon,
  MapPinIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/utils/functions";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Icon from "@/components/atoms/icon/Icon";
import Textbox from "@/components/atoms/input/textbox/TextBox";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ref, string } from "yup";

const subNavigation = [
  { name: "Perfíl", href: "#", icon: UserCircleIcon, current: false },
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
  {
    name: "Actualizar Contraseña",
    href: "/dashboard/upgradePassword",
    icon: ArrowPathIcon,
    current: true,
  },
];

interface ITemsForm {
  password: string;
  newPassword?: string;
  confirmNewPassword?: string;
  user?: string;
}

const schema = yup.object({
  newPassword: string()
    .required("Dato Requerido")
    .matches(
      //eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Contraseñas debe contener: Min 8 caracteres, Min 1 letra mayúscula, Min 1 letra minúscula, Min 1 número y 1 caracter especial."
    ),
  confirmNewPassword: string()
    .required("Dato Requerido")
    .oneOf([ref("newPassword")], "Contraseñas no coinciden")
    .matches(
      //eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Contraseñas debe contener: Min 8 caracteres, Min 1 letra mayúscula, Min 1 letra minúscula, Min 1 número y 1 caracter especial."
    ),
});

const DashboardUpgradePassword = () => {
  const { status, data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState(null);
  const [userSession, setUserSession] = useState('');
  const [showAlert, setShowAlert] = useState({
    show: false,
    bgcolor: "bg-red-50",
    color: "text-red-800",
  });

  useEffect(() => {
    if (status === "authenticated") {
      setUserSession(session.user["email"]);
    }
  }, [status, session]);

  useEffect(() => {
    setValue('user', userSession);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession]);

  const customerDataForm: ITemsForm = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    user: userSession
  };

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

  const onSubmit = (data: ITemsForm) => {
    fetch("/api/customer-password/upgrade-password", {
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
        const { status } = json;
        if (status === 200) {
          setErrorMessage("Datos guardados con éxito!");
          setShowAlert({
            show: true,
            bgcolor: "bg-green-50 border-green-950",
            color: "text-green-800",
          });
        } else {
          setErrorMessage("Contraseña invalida");
          setShowAlert({
            show: true,
            bgcolor: "bg-red-50 border-red-950",
            color: "text-red-800",
          });
        }
      })
      .catch((err) => {
        if (!navigator.onLine) {
          setErrorMessage(
            "Comprueba tu conexión a internet e intenta de nuevo por favor."
          );
          setShowAlert({
            show: true,
            bgcolor: "bg-red-50 border-red-950",
            color: "text-red-800",
          });
        }
        console.warn(err);
      });
  };

  return (
    <div className="overflow-hidden">
      <div className="main-container">
        <div className="h-full">
          <main className="pb-10 mx-auto max-w-7xl lg:py-12">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
              <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
                <nav className="space-y-1">
                  {subNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-grey-90 text-blue-dark"
                          : "text-grey-60 hover:text-blue-dark hover:bg-grey-90",
                        "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </aside>

              {/* upgrade password form */}
              <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                <HeadingCard
                  title="Actualizar contraseña"
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
                                setShowAlert({
                                  show: false,
                                  bgcolor: "bg-red-50 border-red-950",
                                  color: "bg-red-800",
                                })
                              }
                              type="button"
                              className={classNames(
                                "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-50",
                                showAlert.color,
                                showAlert.bgcolor
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
                      Todos los campos marcados con{" "}
                      <span className="text-red-700">*</span> son obligatorios.
                    </p>
                    <div className="flex flex-col gap-6 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                        <input
                          type="hidden"
                          id="user"
                          name="user"
                          value={userSession}
                          {...register("user", { value: userSession })}
                        />
                        <Textbox
                          id="password"
                          name="password"
                          type="text"
                          label="Contraseña actual"
                          className="form-input"
                          autoComplete="on"
                          isError={!!errors.password}
                          errorMessage={errors?.password?.message}
                          {...register("password")}
                          isRequired={true}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                        <Textbox
                          id="newPassword"
                          name="newPassword"
                          label="Crea la contraseña"
                          type="password"
                          placeholder="********"
                          className="form-input"
                          autoComplete="on"
                          isError={!!errors.newPassword}
                          errorMessage={errors?.newPassword?.message}
                          {...register("newPassword")}
                          isRequired={true}
                        />
                        <Textbox
                          id="confirmNewPassword"
                          name="confirmNewPassword"
                          label="Confirma la contraseña"
                          type="password"
                          placeholder="********"
                          className="form-input"
                          autoComplete="on"
                          isError={!!errors.confirmNewPassword}
                          errorMessage={errors?.confirmNewPassword?.message}
                          {...register("confirmNewPassword")}
                          isRequired={true}
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

export default DashboardUpgradePassword;
