import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "src/context/Checkout";
import { useLastPath } from "src/hooks/utils/useLastPath";
import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";
import { Address } from "@commercelayer/sdk";
import { State } from "@/pages/api/static/states";
import TextBox from "@/components/atoms/input/textbox/TextBox";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import CheckBox from "@/components/atoms/input/checkbox/CheckBox";
import SelectInput from "@/components/atoms/input/selectInput/SelectInput";

interface IAddress {
  id?: string;
  stateCode: string;
  cityCode: string;
  address: string;
  phone: string;
  isSameAsBillingAddress?: boolean
}

interface IAddresses {
  shippingAddress: IAddress,
  billingAddress?: IAddress
}

const toAddressForm = (addr: Address): IAddress => {
  return {
    id: addr.id,
    address: addr.line_1,
    cityCode: addr.city,
    stateCode: addr.state_code,
    phone: addr.phone
  };
};

const schema = yup.object({
  shippingAddress: yup.object({
    stateCode: yup.string().required("Dato Requerido"),
    cityCode: yup.string().required("Dato Requerido"),
    address: yup.string().required("Dato Requerido"),
    phone: yup.string().required("Dato Requerido"),
    isSameAsBillingAddress: yup.boolean()
  }),
  billingAddress: yup.object().when('shippingAddress.isSameAsBillingAddress', {
    is: false,
    then: yup.object({
      stateCode: yup.string().required("Dato Requerido"),
      cityCode: yup.string().required("Dato Requerido"),
      address: yup.string().required("Dato Requerido"),
      phone: yup.string().required("Dato Requerido"),
    }).required('Requerido'),
    otherwise: yup.object().notRequired()
  })
});


const STEP_META_FIELD = "hasAddresses";
const DEFAULT_COUNTRY = 'CO';
const DEFAULT_ZIP_CODE = '000000';

const getCitiesByState = async (state: string) =>
  (await fetch(`/api/static/cities/${state}`)).json();

const CheckoutAddresses = () => {
  const router = useRouter();
  const lastPath = useLastPath();
  const [states, setStates] = useState<State[]>([]);
  const [shippingCities, setShippingCities] = useState([]);
  const [billingCities, setBillingCities] = useState([]);

  const { order, flow, addAddresses, getAddresses } =
    useContext(CheckoutContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IAddresses>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
    defaultValues: {
      shippingAddress: {
        isSameAsBillingAddress: true,
        stateCode: '',
        cityCode: ''
      },
    },
  });

  useEffect(() => {
    (async () => {
      const states = await (await fetch(`/api/static/states`)).json();
      setStates(states);
    })();
  }, []);

  const isSameAsBillingAddress = useWatch({
    control,
    name: "shippingAddress.isSameAsBillingAddress",
  });

  const shippingStateWatched = useWatch({
    control,
    name: "shippingAddress.stateCode",
  });

  useEffect(() => {
    if (!shippingStateWatched) return;
    (async () => {
      const cities: string[] = await getCitiesByState(shippingStateWatched);
      setShippingCities(cities);
    })();
  }, [shippingStateWatched]);

  const billingStateWatched = useWatch({
    control,
    name: "billingAddress.stateCode",
  });

  useEffect(() => {

    if (!billingStateWatched) return;
    (async () => {
      const cities: string[] = await getCitiesByState(billingStateWatched);
      setBillingCities(cities);
    })();
  }, [billingStateWatched]);

  useEffect(() => {
    Object.keys(errors).length && console.error(errors);
  }, [errors]);

  const isCompleted = useMemo(
    () => !!order?.metadata?.[STEP_META_FIELD],
    [order]
  );

  useEffect(() => {
    if (!isCompleted) return;
    (async () => {
      const { shippingAddress, billingAddress } = await getAddresses();

      reset({
        shippingAddress: {
          ...toAddressForm(shippingAddress),
          /**
           * When addresses exists this field is false because Commerce layer doesn't persist this flag
           * Anyway CommerceLayer duplicate the shipping address
           * if the _billing_address_same_as_shipping field is true,
           * it means billingAddress always will exist
           */
          isSameAsBillingAddress: false,
        },
        billingAddress: toAddressForm(billingAddress),
      });
    })();
  }, [isCompleted, getAddresses, order, reset]);

  const onSubmit = async (data: IAddresses) => {
    try {
      const { shippingAddress, billingAddress } = data;
      await addAddresses(
        {
          country_code: DEFAULT_COUNTRY,
          state_code: shippingAddress.stateCode,
          city: shippingAddress.cityCode,
          first_name: order.metadata.firstName,
          last_name: order.metadata.lastName,
          line_1: shippingAddress.address,
          phone: shippingAddress.phone,
          zip_code: DEFAULT_ZIP_CODE,
        },
        billingAddress
          ? {
            country_code: "CO",
            state_code: billingAddress.stateCode,
            city: billingAddress.cityCode,
            first_name: order.metadata.firstName,
            last_name: order.metadata.lastName,
            line_1: billingAddress.address,
            phone: billingAddress.phone,
            zip_code: DEFAULT_ZIP_CODE,
          }
          : undefined
      );

      await handleNext();
    } catch (error) {
      console.error(error);
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
      <HeadingCard
        classes="col-span-2"
        title="3. Ingresar dirección para recibir el pedido"
        icon="location"
        isCheck={isCompleted}
      >
        <div className="bg-white rounded-lg">
          <form
            className="max-w-full flex flex-wrap gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full">
              <SelectInput
                label="Escoge tu Departamento"
                id="shipping-state-code"
                options={states.map((state) => ({
                  label: state.name,
                  value: state.name,
                }))}
                {...register("shippingAddress.stateCode")}
                placeholder="Departamento"
              />
              {errors.shippingAddress?.stateCode && (
                <p className="text-red-600">
                  {errors.shippingAddress?.stateCode?.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <SelectInput
                id="shipping-city-code"
                label="Escoge tu municipio"
                options={shippingCities.map((city) => ({
                  label: city,
                  value: city,
                }))}
                {...register("shippingAddress.cityCode")}
                placeholder="Municipio"
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
            </div>
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
                  Direccion de facturacion
                </h4>
                <div className="w-full">
                  <SelectInput
                    label="Escoge tu Departamento"
                    id="billingAddress-state-code"
                    options={states.map((state) => ({
                      label: state.name,
                      value: state.name,
                    }))}
                    {...register("billingAddress.stateCode")}
                    placeholder="Departamento"
                  />
                  {errors.billingAddress?.stateCode && (
                    <p className="text-red-600">
                      {errors.billingAddress?.stateCode?.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <SelectInput
                    id="billingCities-city-code"
                    label="Escoge tu municipio"
                    options={billingCities.map((city) => ({
                      label: city,
                      value: city,
                    }))}
                    {...register("billingAddress.cityCode")}
                    placeholder="Municipio"
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
                </div>
              </>
            )}
            <div className="flex justify-end gap-3 w-full">
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
    </>
  );
};

CheckoutAddresses.getInitialProps = () => {
  return {
    layout: {
      name: mockPageLayoutProps.data.name,
      footerInfo: mockPageLayoutProps.data.layout.footerInfo,
      headerInfo: mockPageLayoutProps.data.layout.headerInfo,
    },
  };
};

CheckoutAddresses.getLayout = (page: ReactElement, pageProps: any) => {
  return defaultLayout(<CheckoutLayout>{page}</CheckoutLayout>, pageProps);
};

export default CheckoutAddresses;
