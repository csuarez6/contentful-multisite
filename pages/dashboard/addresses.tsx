import { GetStaticProps } from "next";
import { getHeader, getNavigation } from "@/lib/services/menu-content.service";
import TextBox from "@/components/atoms/input/textbox/TextBox";
import CheckBox from "@/components/atoms/input/checkbox/CheckBox";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { gaEventPaymentInfo } from "@/utils/ga-events--checkout";
import citiesFile from "@/utils/static/cities-co.json";
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
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { IAddress, IAddresses } from "../checkout/[paymentType]/addresses";
import CheckoutContext from "@/context/Checkout";
import { Address, AddressCreate } from "@commercelayer/sdk";
import AuthContext from "@/context/Auth";
import SelectAtom, {
  IListContent,
} from "@/components/atoms/select-atom/SelectAtom";
import { gaEventForm } from "@/utils/ga-events--forms";

const subNavigation = [
  { name: "Perfíl", href: "/dashboard", icon: UserCircleIcon, current: false },
  {
    name: "Compras",
    href: "/dashboard/orders",
    icon: ShoppingCartIcon,
    current: false,
  },
  { name: "Direcciones", href: "#", icon: MapPinIcon, current: true },
  {
    name: "Actualizar Contraseña",
    href: "/dashboard/upgradePassword",
    icon: ArrowPathIcon,
    current: false,
  },
];

const toAddressForm = (addr: Address): IAddress => {
  const line2Tmp = addr && addr.line_2 ? addr.line_2.split(", ") : [];
  return {
    id: addr?.id ?? "",
    address: addr?.line_1 ?? "",
    cityCode: addr?.city ?? "",
    stateCode: addr?.state_code ?? "",
    phone: addr?.phone ?? "",
    street: line2Tmp.length > 0 ? line2Tmp[0] : "",
    residence: line2Tmp.length > 0 ? line2Tmp[1] : "",
    receiver: addr?.notes ?? "",
  };
};

const DEFAULT_COUNTRY = "CO";
const DEFAULT_ZIP_CODE = "000000";

const getCitiesByState = async (state: string) =>
  (await fetch(`/api/static/cities/${state}`)).json();

const DashboardAddresses = () => {
  // const [config, setConfig] = useState({
  //   accessToken: "",
  //   endpoint: "",
  // });

  const { status, data: session } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      // setConfig({
      //   accessToken: session?.user["accessToken"],
      //   endpoint: process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT,
      // });
    }
  }, [status, session]);

  const [isLoading, setIsLoading] = useState(false);
  const [billingCities, setBillingCities] = useState([]);
  const [states, setStates] = useState([]);
  const [shippingCities, setShippingCities] = useState([]);
  const attempts = useRef(0);

  const { order, addAddresses, getAddresses, onHasShipment } =
    useContext(CheckoutContext);
  const { isLogged, user } = useContext(AuthContext);

  const schema = yup.object({
    shippingAddress: yup.object({
      stateCode: yup.string().required("Dato Requerido"),
      cityCode: yup
        .string()
        .required("Dato Requerido")
        .notOneOf(["Seleccione un Municipio"], "opcion invalida"),
      address: yup.string().trim().required("Dato Requerido"),
      street: yup.string().required("Dato Requerido"),
      residence: yup.string().nullable().notRequired(),
      receiver: yup.string().nullable().notRequired(),
      isSameAsBillingAddress: yup.boolean(),
      // phone: yup.string().required("Dato Requerido"),
    }),
    billingAddress: yup
      .object()
      .when("shippingAddress.isSameAsBillingAddress", {
        is: false,
        then: yup
          .object({
            stateCode: yup.string().required("Dato Requerido"),
            cityCode: yup
              .string()
              .required("Dato Requerido")
              .notOneOf(["Seleccione un Municipio"], "opcion invalida"),
            address: yup.string().trim().required("Dato Requerido"),
            street: yup.string().required("Dato Requerido"),
            residence: yup.string().nullable().notRequired(),
            receiver: yup.string().nullable().notRequired(),
            // phone: yup.string().required("Dato Requerido"),
          })
          .required("Requerido"),
        otherwise: yup.object().notRequired(),
      }),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
    getValues,
  } = useForm<IAddresses>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
    defaultValues: {
      shippingAddress: {
        isSameAsBillingAddress: true,
        stateCode: "",
        cityCode: "",
      },
    },
  });

  const checkAlphaNumeric = (e) => {
    const letters = /^[aA-zZ-z0-9-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    if (!e.key.match(letters)) e.preventDefault();
  };

  const isSameAsBillingAddress = useWatch({
    control,
    name: "shippingAddress.isSameAsBillingAddress",
  });

  const shippingStateWatched = useWatch({
    control,
    name: "shippingAddress.stateCode",
  });

  const shippingCityWatched = useWatch({
    control,
    name: "shippingAddress.cityCode",
  });

  const billingStateWatched = useWatch({
    control,
    name: "billingAddress.stateCode",
  });

  useEffect(() => {
    if (order) {
      (async () => {
        const { shippingAddress, billingAddress } = await getAddresses();
        const shippingAddressFormatted = toAddressForm(shippingAddress);
        const billingAddressFormatted = toAddressForm(billingAddress);        
        if (shippingAddressFormatted) {
          setValue(
            "shippingAddress.stateCode",
            shippingAddressFormatted.stateCode
          );
          setValue(
            "shippingAddress.cityCode",
            shippingAddressFormatted.cityCode
          );
          setValue("shippingAddress.street", shippingAddressFormatted.street);
          setValue("shippingAddress.address", shippingAddressFormatted.address);
          setValue(
            "shippingAddress.residence",
            shippingAddressFormatted.residence
          );
          setValue(
            "shippingAddress.receiver",
            shippingAddressFormatted.receiver
          );
        }
        if (billingAddressFormatted) {
          setValue("shippingAddress.isSameAsBillingAddress", false);
          setValue(
            "billingAddress.stateCode",
            billingAddressFormatted.stateCode
          );
          setValue("billingAddress.cityCode", billingAddressFormatted.cityCode);
          setValue("billingAddress.address", billingAddressFormatted.address);
          setValue("billingAddress.street", billingAddressFormatted.street);
          setValue(
            "billingAddress.residence",
            billingAddressFormatted.residence
          );
        }
        reset({
          shippingAddress: {
            ...shippingAddressFormatted,
            isSameAsBillingAddress: (shippingAddressFormatted?.address == "" && billingAddressFormatted?.address == "") || (shippingAddressFormatted?.address == billingAddressFormatted?.address),
          },
          billingAddress: billingAddressFormatted,
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  useEffect(() => {
    (async () => {
      const states = await (await fetch(`/api/static/states`)).json();
      const mappedStates: IListContent[] = states.map((state) => ({
        text: state.name,
        value: state.name,
      }));
      setStates(mappedStates);
    })();
  }, []);

  const toCLAddress = (addr: IAddress): Partial<AddressCreate> => ({
    country_code: DEFAULT_COUNTRY,
    state_code: addr.stateCode,
    city: addr.cityCode,
    line_1: addr.address,
    line_2: addr.street + ", " + addr.residence,
    notes: addr?.receiver ?? "",
    phone: order?.metadata?.cellPhone ?? "0000",
    zip_code: DEFAULT_ZIP_CODE,
  });

  useEffect(() => {
    if (!shippingStateWatched) return;
    (async () => {
      const citiesFinal: any[] = [
        { city: "Seleccione un Municipio", isCovered: "false" },
      ];
      const cities: any[] = await getCitiesByState(shippingStateWatched);
      const mappedCities = cities.map((city, index) => ({
        text: city.city,
        value: index == 0 ? "" : city.city,
      }));
      setShippingCities(citiesFinal.concat(mappedCities));
      if (attempts.current != 0)
        reset({
          shippingAddress: {
            isSameAsBillingAddress: true,
            cityCode: "",
            stateCode: shippingStateWatched,
          },
        });
      attempts.current = 1;
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingStateWatched]);

  useEffect(() => {
    if (!shippingCityWatched) return;
    const cityCheck = citiesFile.filter(
      (city) =>
        city.admin_name === shippingStateWatched &&
        city.city === shippingCityWatched
    );
    onHasShipment(cityCheck[0]?.isCovered == "false");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingCityWatched]);

  useEffect(() => {
    if (!billingStateWatched) return;
    (async () => {
      const cities: string[] = await getCitiesByState(billingStateWatched);
      setBillingCities(cities);
    })();
  }, [billingStateWatched]);

  const sendData = async (data: IAddresses) => {
    try {
      const { shippingAddress, billingAddress } = data;
      const clShippingAddr = toCLAddress(shippingAddress) as AddressCreate;
      let clBillingAddr = undefined;

      if (billingAddress)
        clBillingAddr = toCLAddress(billingAddress) as AddressCreate;

      [clShippingAddr, clBillingAddr].forEach((add) => {
        if (!add) return;
        ((meta: any) => {
          (add.first_name = meta?.name), (add.last_name = meta?.lastName);
        })(isLogged ? user.metadata : order.metadata);
      });

      await addAddresses(clShippingAddr, clBillingAddr ?? undefined);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const onSubmit = async (data: IAddresses) => {
    setIsLoading(true);
    gaEventPaymentInfo(order?.line_items);
    try {
      await sendData(data);
      gaEventForm({
        category: "Profile",
        label: "Actualización de direcciones",
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
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

              {/* Payment details */}
              <div className="space-y-3 sm:px-6 lg:col-span-9 lg:px-0">
                <div>
                  <h2 className="text-lg font-medium text-blue-dark">
                    Direcciones
                  </h2>
                </div>
                <div className="w-full">
                  <HeadingCard
                    title="Dirección"
                    headClasses="w-full !justify-center text-2xl text-blue-dark mt-2"
                    hideCheck={true}
                  >
                    <form
                      className="flex flex-wrap max-w-full gap-6"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="w-full">
                        <SelectAtom
                          id="shipping-state-code"
                          labelSelect="Escoge tu departamento"
                          listedContents={states}
                          isRequired={true}
                          currentValue={getValues("shippingAddress.stateCode")}
                          handleChange={(value) => {
                            setValue("shippingAddress.stateCode", value);
                            clearErrors("shippingAddress.stateCode");
                          }}
                          {...register("shippingAddress.stateCode")}
                        />
                        {errors.shippingAddress?.stateCode && (
                          <p className="text-red-600">
                            {errors.shippingAddress?.stateCode?.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <SelectAtom
                          key={getValues("shippingAddress.cityCode")}
                          id="shipping-city-code"
                          labelSelect="Escoge tu municipio"
                          listedContents={shippingCities}
                          isRequired={true}
                          currentValue={getValues("shippingAddress.cityCode")}
                          handleChange={(value) => {
                            setValue("shippingAddress.cityCode", value);
                            clearErrors("shippingAddress.cityCode");
                          }}
                          {...register("shippingAddress.cityCode")}
                        />
                        {errors?.shippingAddress?.cityCode && (
                          <p className="text-red-600">
                            {errors?.shippingAddress?.cityCode?.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <TextBox
                          id="shippingAddress.address"
                          label="Escribe tu direccion"
                          isRequired={true}
                          {...register("shippingAddress.address")}
                          placeholder="Ejemplo carrera 00 # 0000"
                        />
                        {errors?.shippingAddress?.address && (
                          <p className="text-red-600">
                            {errors?.shippingAddress?.address?.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <TextBox
                          id="shippingAddress.street"
                          label="Escribir barrio"
                          isRequired={true}
                          onKeyPress={(e) => checkAlphaNumeric(e)}
                          {...register("shippingAddress.street")}
                          placeholder="Nombre del barrio"
                        />
                        {errors?.shippingAddress?.street && (
                          <p className="text-red-600">
                            {errors?.shippingAddress?.street?.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <TextBox
                          id="shippingAddress.residence"
                          label="Información adicional"
                          onKeyPress={(e) => checkAlphaNumeric(e)}
                          {...register("shippingAddress.residence")}
                          placeholder="Apartamento / nombre de unidad"
                        />
                        {errors?.shippingAddress?.residence && (
                          <p className="text-red-600">
                            {errors?.shippingAddress?.residence?.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <TextBox
                          id="shippingAddress.receiver"
                          label="Destinatario"
                          {...register("shippingAddress.receiver")}
                          placeholder="Si es diferente a quien recibe"
                        />
                        {errors?.shippingAddress?.receiver && (
                          <p className="text-red-600">
                            {errors?.shippingAddress?.receiver?.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <CheckBox
                          {...register(
                            "shippingAddress.isSameAsBillingAddress"
                          )}
                          id="shippingAddress.isSameAsBillingAddress"
                          label="Acepto usar la dirección de envió para el proceso de facturación"
                        />
                      </div>
                      {!isSameAsBillingAddress && (
                        <>
                          <h4 className="!font-semibold text-blue-dark">
                            Direccion de facturación
                          </h4>
                          <div className="w-full">
                            <SelectAtom
                              id="billingAddress-state-code"
                              labelSelect="Escoge tu departamento"
                              listedContents={states}
                              isRequired={true}
                              currentValue={getValues(
                                "billingAddress.stateCode"
                              )}
                              handleChange={(value) => {
                                setValue("billingAddress.stateCode", value);
                                clearErrors("billingAddress.stateCode");
                              }}
                              {...register("billingAddress.stateCode")}
                            />
                            {errors.billingAddress?.stateCode && (
                              <p className="text-red-600">
                                {errors.billingAddress?.stateCode?.message}
                              </p>
                            )}
                          </div>
                          <div className="w-full">
                            <SelectAtom
                              id="billingCities-city-code"
                              labelSelect="Escoge tu municipio"
                              listedContents={billingCities}
                              isRequired={true}
                              currentValue={getValues(
                                "billingAddress.cityCode"
                              )}
                              handleChange={(value) => {
                                setValue("billingAddress.cityCode", value);
                                clearErrors("billingAddress.cityCode");
                              }}
                              {...register("billingAddress.cityCode")}
                            />
                            {errors?.billingAddress?.cityCode && (
                              <p className="text-red-600">
                                {errors?.billingAddress?.cityCode?.message}
                              </p>
                            )}
                          </div>
                          <div className="w-full">
                            <TextBox
                              id="billingAddress.address"
                              label="Escribe tu direccion"
                              isRequired={true}
                              {...register("billingAddress.address")}
                              placeholder="Ejemplo carrera 00 # 0000"
                            />
                            {errors?.billingAddress?.address && (
                              <p className="text-red-600">
                                {errors?.billingAddress?.address?.message}
                              </p>
                            )}
                          </div>
                          <div className="w-full">
                            <TextBox
                              id="billingAddress.street"
                              label="Escribir barrio"
                              isRequired={true}
                              onKeyPress={(e) => checkAlphaNumeric(e)}
                              {...register("billingAddress.street")}
                              placeholder="Nombre del barrio"
                            />
                            {errors?.billingAddress?.street && (
                              <p className="text-red-600">
                                {errors?.billingAddress?.street?.message}
                              </p>
                            )}
                          </div>
                          <div className="w-full">
                            <TextBox
                              id="billingAddress.residence"
                              label="Información adicional"
                              onKeyPress={(e) => checkAlphaNumeric(e)}
                              {...register("billingAddress.residence")}
                              placeholder="Apartamento / nombre de unidad"
                            />
                            {errors?.billingAddress?.residence && (
                              <p className="text-red-600">
                                {errors?.billingAddress?.residence?.message}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                      <div className="flex justify-end w-full gap-3">
                        <button
                          type="button"
                          className="block text-center underline button text-blue-dark"
                          onClick={() => console.warn("cancelar")}
                          disabled={isLoading}
                        >
                          Cancelar
                        </button>
                        <button
                          className="relative button button-primary"
                          type="submit"
                          disabled={isLoading}
                        >
                          Guardar
                        </button>
                      </div>
                    </form>
                  </HeadingCard>
                </div>
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
  const headerInfo = await getHeader(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getNavigation(DEFAULT_FOOTER_ID, context.preview ?? false);
  const helpButton = await getNavigation(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

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

export const ModalConfirm: React.FC<any> = ({
  data,
  onEventHandler,
  onActivedModal,
}) => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="text-left">
          Recuerde que si continua con el proceso, el servicio de instalación
          será removido por falta de cobertura en la ubicación registrada.
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="button button-primary"
            onClick={() => {
              onEventHandler(data);
            }}
          >
            Continuar de todos modos
          </button>
          <button
            className="button button-outline"
            onClick={() => {
              onActivedModal(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardAddresses;
