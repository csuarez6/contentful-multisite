import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "@/context/Checkout";
import { useLastPath } from "@/hooks/utils/useLastPath";
import { Address, Customer } from "@commercelayer/sdk";
import { PSE_STEPS_TO_VERIFY } from '@/constants/checkout.constants';
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { GetStaticPaths, GetStaticProps } from "next";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID } from "@/constants/contentful-ids.constants";
import { getHeader, getNavigation } from "@/lib/services/menu-content.service";
import AuthContext from "@/context/Auth";
import ReCaptchaBox from '@/components/atoms/recaptcha/recaptcha';
import Spinner from "@/components/atoms/spinner/Spinner";
import { Customers } from "@commercelayer/sdk/lib/cjs/api";
import { formatAddress } from "@/lib/services/commerce-layer.service";

const CheckoutSummary = () => {
  const router = useRouter();
  const lastPath = useLastPath();
  const { isLogged, user } = useContext(AuthContext);
  const { order, flow, getAddresses, onRecaptcha, tokenRecaptcha, isPaymentProcess } = useContext(CheckoutContext);
  const [billingAddress, setBillingAddress] = useState<Address>();
  const [shippingAddress, setShippingAddress] = useState<Address>();
  const [isLoading, setIsLoading] = useState(false);

  const isCustomer = (customer: any): customer is Customer => {
    return customer?.type === Customers.TYPE;
  };

  const fullName = useMemo(() => {
    return (
      (resource) => `${resource?.metadata?.name ?? "*****"} ${resource?.metadata?.lastName ?? "*****"}`
    )(isLogged ? user : order);
  }, [user, order, isLogged]);

  const clientId = useMemo(() => {
    return (
      (resource) => `${resource?.metadata?.documentNumber ?? "*****"}`
    )(isLogged ? user : order);
  }, [user, order, isLogged]);

  const clientPhone = useMemo(() => {
    return (
      (resource) => `${resource?.metadata?.cellPhone ?? "*****"}`
    )(isLogged ? user : order);
  }, [user, order, isLogged]);

  const clientEmail = useMemo(() => {
    return (
      (resource) => isCustomer(resource) ? `${resource?.email}` : `${resource?.customer_email ?? "*****"}`
    )(isLogged ? user : order);
  }, [user, order, isLogged]);

  useEffect(() => {
    if (!order) return;
    (async () => {
      const { shippingAddress, billingAddress } = await getAddresses();
      setBillingAddress(billingAddress);
      setShippingAddress(shippingAddress);
    })();
  }, [getAddresses, order]);

  const isCompleted = useMemo(
    () => order && PSE_STEPS_TO_VERIFY.map((step) => !!order.metadata?.[step]).every((i) => i),
    [order]
  );

  const handlePrev = async () => {
    setIsLoading(true);
    router.push(
      `/checkout/${router.query.paymentType}/${flow.getPrevStep(lastPath)}`
    );
  };

  useEffect(() => {
    // subscribe to routeChangeStart event
    const onRouteChangeStart = () => setIsLoading(true);
    router.events.on('routeChangeStart', onRouteChangeStart);

    // unsubscribe on component destroy in useEffect return function
    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HeadingCard
      classes="col-span-2"
      title="4. Datos de compra"
      icon="quotation"
      isCheck={isCompleted && !!tokenRecaptcha}
    >
      <div className="bg-white rounded-lg">
        <dl className="space-y-5 text-sm">
          <div className="flex justify-between">
            <dt className="flex-1 text-grey-30">Nombre del adquiriente:</dt>
            <dd className="flex-1 font-bold text-grey-30">{fullName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="flex-1 text-grey-30">Identificación del adquiriente:</dt>
            <dd className="flex-1 font-bold text-grey-30">{clientId}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="flex-1 text-grey-30">Teléfono del adquiriente:</dt>
            <dd className="flex-1 font-bold text-grey-30">{clientPhone}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="flex-1 text-grey-30">Correo electrónico del adquiriente:</dt>
            <dd className="flex-1 font-bold text-grey-30">{clientEmail}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="flex-1 text-grey-30">Dirección de envio:</dt>
            <dd className="flex-1 font-bold text-grey-30">
              {shippingAddress ? formatAddress(shippingAddress) : "*****"}
            </dd>
          </div>
          {shippingAddress?.notes &&
            <div className="flex justify-between">
              <dt className="flex-1 text-grey-30">Destinatario:</dt>
              <dd className="flex-1 font-bold text-grey-30">
                {shippingAddress?.notes}
              </dd>
            </div>
          }
          <div className="flex justify-between">
            <dt className="flex-1 text-grey-30">Dirección de facturación:</dt>
            <dd className="flex-1 font-bold text-grey-30">
              {billingAddress ? formatAddress(billingAddress) : "*****"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-blue-dark">
              Sabemos que eres un humano, pero debemos confirmarlo.
              <ReCaptchaBox
                version={2}
                handleChange={(e) => onRecaptcha(e)}
                classNames="mt-6"
              />
            </dt>
          </div>
          <div className="flex justify-between">
            <dt>
              <p className="font-bold text-blue-dark">Al continuar el proceso acepta el tratamiento de datos conforme a la política de tratamiento de datos personales de la compra.</p>
            </dt>
          </div>
          <div className="flex justify-between">
            <dt>
              <strong>NOTA:</strong> Al hacer click en “Enviar datos” serás contactado por un
              agente de Vanti
            </dt>
          </div>
        </dl>
        <div className="flex justify-end w-full mt-5">
          <button
            className="relative button button-outline"
            type="button"
            onClick={handlePrev}
            disabled={isLoading || isPaymentProcess}
          >
            Volver
          </button>
        </div>
        {isLoading && <Spinner position="absolute" size="large" />}
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
  const headerInfo = await getHeader(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getNavigation(DEFAULT_FOOTER_ID, context.preview ?? false);
  const helpButton = await getNavigation(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

  return {
    props: {
      layout: {
        name: 'Resumen de la orden',
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

CheckoutSummary.getLayout = (page: ReactElement, pageProps: any) => {
  return defaultLayout(<CheckoutLayout>{page}</CheckoutLayout>, pageProps);
};

export default CheckoutSummary;
