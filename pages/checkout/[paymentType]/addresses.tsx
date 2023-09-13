import {
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "@/context/Checkout";
import AuthContext from "@/context/Auth";
import { useLastPath } from "@/hooks/utils/useLastPath";
import { Address, AddressCreate } from "@commercelayer/sdk";
import TextBox from "@/components/atoms/input/textbox/TextBox";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import CheckBox from "@/components/atoms/input/checkbox/CheckBox";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import { getHeader, getNavigation } from "@/lib/services/menu-content.service";
import citiesFile from "@/utils/static/cities-co.json";
import ModalSuccess from "@/components/organisms/modal-success/ModalSuccess";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { PSE_STEPS_TO_VERIFY } from "@/constants/checkout.constants";
import Spinner from "@/components/atoms/spinner/Spinner";
import { gaEventPaymentInfo } from "@/utils/ga-events--checkout";
import SelectAtom, {
  IListContent,
} from "@/components/atoms/select-atom/SelectAtom";
import { useSession } from "next-auth/react";

export interface IAddress {
  id?: string;
  stateCode: string;
  cityCode: string;
  address: string;
  phone: string;
  street: string;
  residence: string;
  receiver: string;
  isSameAsBillingAddress?: boolean;
}

export interface IAddresses {
  shippingAddress: IAddress;
  billingAddress?: IAddress;
}

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
  billingAddress: yup.object().when("shippingAddress.isSameAsBillingAddress", {
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

const DEFAULT_COUNTRY = "CO";
const DEFAULT_ZIP_CODE = "000000";

const getCitiesByState = async (state: string) =>
  (await fetch(`/api/static/cities/${state}`)).json();

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

const CheckoutAddress = () => {
  const router = useRouter();
  const lastPath = useLastPath();
  const [states, setStates] = useState([]);
  const [shippingCities, setShippingCities] = useState([]);
  const [billingCities, setBillingCities] = useState([]);
  const { isLogged, user } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);
  const [isActivedModal, setIsActivedModal] = useState(false);
  const [paramModal, setParamModal] = useState<IPromoContent>();
  const [modalChild, setmodalChild] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const attempts = useRef(0);
  const { status, data: session } = useSession();

  const {
    order,
    flow,
    addAddresses,
    getAddresses,
    deleteItemService,
    onHasShipment,
    getCustomerAddresses,
  } = useContext(CheckoutContext);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },

    reset,
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
    (async () => {
      const states = await (await fetch(`/api/static/states`)).json();
      const mappedStates: IListContent[] = states.map((state) => ({
        text: state.name,
        value: state.name,
      }));
      setStates(mappedStates);
    })();
  }, []);

  useEffect(() => {
    if (!shippingStateWatched) return;
    (async () => {
      const citiesFinal: any[] = [
        { city: "Seleccione un Municipio", isCovered: "false" },
      ];
      const cities: any[] = await getCitiesByState(shippingStateWatched);
      const mappedCities = cities.map((city) => ({
        text: city.city,
        value: city.city,
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
    setShowAlert(false);
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
    setShowAlert(cityCheck[0]?.isCovered == "false");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingCityWatched]);

  useEffect(() => {
    if (!billingStateWatched) return;
    (async () => {
      const cities: any[] = await getCitiesByState(billingStateWatched);
      const mappedCities = cities.map((city) => ({
        text: city.city,
        value: city.city,
      }));
      setBillingCities(mappedCities);
    })();
  }, [billingStateWatched]);

  useEffect(() => {
    Object.keys(errors).length && console.error(errors);
  }, [errors]);

  const isCompleted = useMemo(
    () =>
      order &&
      PSE_STEPS_TO_VERIFY.map((step) => !!order.metadata?.[step]).every(
        (i) => i
      ),
    [order]
  );

  useEffect(() => {
    if (order) {
      (async () => {
        const { shippingAddress, billingAddress } = await getAddresses();
        const shippingAddressFormatted = toAddressForm(shippingAddress);
        const billingAddressFormatted = toAddressForm(billingAddress);
        if (status !== "authenticated" && !session) {
          reset({
            shippingAddress: {
              ...shippingAddressFormatted,
              isSameAsBillingAddress:
                (shippingAddressFormatted?.address == "" &&
                  billingAddressFormatted?.address == "") ||
                shippingAddressFormatted?.address ==
                  billingAddressFormatted?.address,
            },
            billingAddress: billingAddressFormatted,
          });
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session) {
      (async () => {
        const addresses: Address = await getCustomerAddresses(
          session?.user["accessToken"]
        );
        const addressesForm = toAddressForm(addresses);
        if (addressesForm) {
          setValue("shippingAddress.stateCode", addressesForm.stateCode);
          setValue("shippingAddress.cityCode", addressesForm.cityCode);
          setValue("shippingAddress.street", addressesForm.street);
          setValue("shippingAddress.address", addressesForm.address);
          setValue("shippingAddress.residence", addressesForm.residence);
          setValue("shippingAddress.receiver", addressesForm.receiver);
        }
      })();
    } else {
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
            setValue(
              "shippingAddress.address",
              shippingAddressFormatted.address
            );
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
            setValue(
              "billingAddress.cityCode",
              billingAddressFormatted.cityCode
            );
            setValue("billingAddress.address", billingAddressFormatted.address);
            setValue("billingAddress.street", billingAddressFormatted.street);
            setValue(
              "billingAddress.residence",
              billingAddressFormatted.residence
            );
          }
        })();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, status, session]);

  const checkAlphaNumeric = (e) => {
    const letters = /^[aA-zZ-z0-9-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    if (!e.key.match(letters)) e.preventDefault();
  };

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

  const sendData = async (data: IAddresses) => {
    try {
      setIsActivedModal(false);
      const checkCovered = checkCityCovered();
      if (
        !checkCovered["isCovered"] &&
        checkCovered["idItemsIntall"].length > 0
      ) {
        await deleteItemService(checkCovered["idItemsIntall"]);
      }
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

      await addAddresses(
        clShippingAddr,
        !isSameAsBillingAddress && clBillingAddr ? clBillingAddr : undefined
      );

      await handleNext();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const checkCityCovered = () => {
    let status = true;
    const adjustmentsList = order.line_items
      .filter(
        (item) =>
          item?.item_type === "skus" &&
          item?.["installlation_service"].length > 0
      )
      .map((itemInstall) => {
        return itemInstall?.["installlation_service"]?.[0]?.id;
      });
    const cityCheck = citiesFile.filter(
      (city) =>
        city.admin_name === shippingStateWatched &&
        city.city === shippingCityWatched
    );
    if (cityCheck[0]?.isCovered == "false") status = false;
    return { isCovered: status, idItemsIntall: adjustmentsList };
  };

  const onSubmit = async (data: IAddresses) => {
    setIsLoading(true);
    gaEventPaymentInfo(order?.line_items);

    try {
      const checkCovered = checkCityCovered();
      if (
        !checkCovered["isCovered"] &&
        checkCovered["idItemsIntall"].length > 0
      ) {
        setParamModal({ promoTitle: "Advertencia" });
        setmodalChild(
          <ModalConfirm
            data={data}
            onEventHandler={sendData}
            onActivedModal={setIsActivedModal}
          />
        );
        setIsActivedModal(false);
        setTimeout(() => {
          setIsActivedModal(true);
        }, 200);
      } else {
        await sendData(data);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    setIsLoading(true);
    router.push(
      `/checkout/${router.query.paymentType}/${flow.getNextStep(lastPath)}`
    );
  };

  const handlePrev = async () => {
    setIsLoading(true);
    router.push(
      `/checkout/${router.query.paymentType}/${flow.getPrevStep(lastPath)}`
    );
  };

  useEffect(() => {
    // subscribe to routeChangeStart event
    const onRouteChangeStart = () => setIsLoading(true);
    router.events.on("routeChangeStart", onRouteChangeStart);

    // unsubscribe on component destroy in useEffect return function
    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HeadingCard
      classes="col-span-2"
      title="3. Ingresar dirección para recibir el pedido"
      icon="location"
      isCheck={isCompleted}
    >
      <div className="bg-white rounded-lg">
        <form
          className="flex flex-wrap max-w-full gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {showAlert && (
            <div className="w-full">
              <div
                className="px-3 py-1 mb-1 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
                role="alert"
              >
                La ubicación que ha seleccionado no tiene cobertura para el
                servicio de instalación.
                <br />
                <strong>
                  Si continua con el proceso, el servicio de instalación será
                  removido automáticamente de la compra.
                </strong>
              </div>
            </div>
          )}
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
          {/* <div className="w-full">
            <TextBox
              {...register("shippingAddress.phone")}
              id="shippingAddress.phone"
              label="Escribe tu telefono"
              type="number"
              placeholder="000 000 0000"
            />
            {errors?.shippingAddress?.phone && (
              <p className="text-red-600">
                {errors?.shippingAddress.phone?.message}
              </p>
            )}
          </div> */}
          <div className="w-full">
            <CheckBox
              {...register("shippingAddress.isSameAsBillingAddress")}
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
                  currentValue={getValues("billingAddress.stateCode")}
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
                  currentValue={getValues("billingAddress.cityCode")}
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
              {/* <div className="w-full">
                <TextBox
                  {...register("billingAddress.phone")}
                  id="billingAddress.phone"
                  label="Escribe tu telefono"
                  type="number"
                  placeholder="000 000 0000"
                />
                {errors?.billingAddress?.phone && (
                  <p className="text-red-600">
                    {errors?.billingAddress.phone?.message}
                  </p>
                )}
              </div> */}
            </>
          )}
          <div className="flex justify-end w-full gap-3">
            <button
              className="relative button button-outline"
              type="button"
              onClick={handlePrev}
              disabled={isLoading}
            >
              Volver
            </button>
            <button
              className="relative button button-primary"
              type="submit"
              disabled={isLoading}
            >
              Continuar
            </button>
          </div>
        </form>
        {isLoading && <Spinner position="absolute" size="large" />}
      </div>
      {isActivedModal && (
        <ModalSuccess {...paramModal} isActive={isActivedModal}>
          {modalChild}
        </ModalSuccess>
      )}
    </HeadingCard>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [];
  return { paths, fallback: "blocking" };
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {
  const headerInfo = await getHeader(
    DEFAULT_HEADER_ID,
    context.preview ?? false
  );
  const footerInfo = await getNavigation(
    DEFAULT_FOOTER_ID,
    context.preview ?? false
  );
  const helpButton = await getNavigation(
    DEFAULT_HELP_BUTTON_ID,
    context.preview ?? false
  );

  return {
    props: {
      layout: {
        name: "Direcciones de la orden",
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

CheckoutAddress.getLayout = (page: ReactElement, pageProps: any) => {
  return defaultLayout(<CheckoutLayout>{page}</CheckoutLayout>, pageProps);
};

export default CheckoutAddress;
