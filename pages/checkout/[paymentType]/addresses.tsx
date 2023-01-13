import { ReactElement, useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "src/context/Checkout";
import { useLastPath } from "src/hooks/utils/useLastPath";
import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";

interface IAddress {
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

const CheckoutAddresses = () => {
  const router = useRouter();
  const lastPath = useLastPath();

  const { order, flow, addAddresses, getAddresses } = useContext(CheckoutContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAddresses>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
    defaultValues: {
      shippingAddress: {
        isSameAsBillingAddress: true
      }
    }
  });

  const isSameAsBillingAddress = useWatch({
    control,
    name: "shippingAddress.isSameAsBillingAddress",
  });

  useEffect(() => { Object.keys(errors).length && console.error(errors); }, [errors]);

  const isCompleted = useMemo(
    () => !!order?.metadata?.[STEP_META_FIELD],
    [order]
  );

  useEffect(() => {
    if (!isCompleted) return;
    getAddresses();
    // const {city, state_code, phone, line_1} = order.shipping_address;

    // reset({
    //   shippingAddress: {
    //     stateCode: state_code,
    //     address: line_1,
    //     phone,
    //     cityCode: city,
    //     isSameAsBillingAddress: !order.billing_address
    //   },
    //   ...(order.billing_address && {
    //     stateCode: order.billing_address.state_code,
    //     address: order.billing_address.line_1,
    //     phone: order.billing_address.phone,
    //     cityCode: order.billing_address.city
    //   })
    // });
  }, [isCompleted, getAddresses]);

  const onSubmit = async (data: IAddresses) => {
    try {
      const { shippingAddress, billingAddress} = data;
      await addAddresses({
        country_code: DEFAULT_COUNTRY,
        state_code: shippingAddress.stateCode,
        city: shippingAddress.cityCode,
        first_name: order.metadata.firstName,
        last_name: order.metadata.lastName,
        line_1: shippingAddress.address,
        phone: shippingAddress.phone,
        zip_code: DEFAULT_ZIP_CODE,
      }, billingAddress ? {
        country_code: 'CO',
        state_code: billingAddress.stateCode,
        city: billingAddress.cityCode,
        first_name: order.metadata.firstName,
        last_name: order.metadata.lastName,
        line_1: billingAddress.address,
        phone: billingAddress.phone,
        zip_code: DEFAULT_ZIP_CODE,
      } : undefined);

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
      <h2>
        <span>Ingresar La direccón para recbir el pedido</span>
        <input type="checkbox" checked={isCompleted} readOnly />
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="shipping-state-code">Departamento</label>
        <select className="bg-sky-200" {...register("shippingAddress.stateCode")} id="shipping-state-code">
          <option value="bog">Bogotá</option>
        </select>
        <p className="text-red-600">{errors.shippingAddress?.stateCode?.message}</p>
        
        <label htmlFor="shipping-city-code">Ciudad</label>
        <select className="bg-sky-200" {...register("shippingAddress.cityCode")} id="shipping-city-code">
          <option value="bog">Bogotá</option>
        </select>
        <p className="text-red-600">{errors.shippingAddress?.cityCode?.message}</p>

        <label htmlFor="shippingAddress.address">Dirección</label>
        <input className="bg-sky-200" {...register("shippingAddress.address")} id="shippingAddress.address" />
        <p className="text-red-600">{errors.shippingAddress?.address?.message}</p>
        
        <label htmlFor="billingAddress.phone">Teléfono</label>
        <input className="bg-sky-200" {...register("shippingAddress.phone")} id="shippingAddress.phone" />
        <p className="text-red-600">{errors.shippingAddress?.phone?.message}</p>

        <label>
          <input type="checkbox" className="mr-3" {...register("shippingAddress.isSameAsBillingAddress")} />
          Acepto usar la dirección de envió para el proceso de facturación
        </label>

        {
          !isSameAsBillingAddress && <>
            <hr />
            <h3>Dirección de facturación</h3>
            
            <label htmlFor="billing-state-code">Departamento</label>
            <select className="bg-sky-200" {...register("billingAddress.stateCode")} id="billing-state-code">
              <option value="bog">Bogotá</option>
            </select>
            <p className="text-red-600">{errors.billingAddress?.stateCode?.message}</p>
            
            <label htmlFor="billing-city-code">Ciudad</label>
            <select className="bg-sky-200" {...register("billingAddress.cityCode")} id="billing-city-code">
              <option value="bog">Bogotá</option>
            </select>
            <p className="text-red-600">{errors.billingAddress?.cityCode?.message}</p>

            <label htmlFor="billingAddress.address">Dirección</label>
            <input className="bg-sky-200" {...register("billingAddress.address")} id="billingAddress.address" />
            <p className="text-red-600">{errors.billingAddress?.address?.message}</p>
            
            <label htmlFor="billingAddress.phone">Teléfono</label>
            <input className="bg-sky-200" {...register("billingAddress.phone")} id="billingAddress.phone" />
            <p className="text-red-600">{errors.billingAddress?.phone?.message}</p>
          </>
        }
        <br />

        <button type="button" className="mr-4" onClick={handlePrev}>
          Volver
        </button>
        <button type="submit">Continuar</button>
      </form>
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
