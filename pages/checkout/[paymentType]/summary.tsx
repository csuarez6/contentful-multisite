import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "@/context/Checkout";
import { useLastPath } from "@/hooks/utils/useLastPath";
import { Address } from "@commercelayer/sdk";
import { VantiOrderMetadata } from '@/constants/checkout.constants';
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { GetStaticPaths, GetStaticProps } from "next";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID } from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";
import AuthContext from "@/context/Auth";
// import ReCAPTCHA from "react-google-recaptcha";
import ReCaptchaBox from '@/components/atoms/recaptcha/recaptcha';

const CheckoutSummary = () => {
  const router = useRouter();
  const lastPath = useLastPath();
  const { isLogged, user } = useContext(AuthContext);
  const { order, flow, getAddresses, onRecaptcha, tokenRecaptcha } = useContext(CheckoutContext);

  const [billingAddress, setBillingAddress] = useState<Address>();

  const fullName = useMemo(() => {
    return (
      (resource) => `${resource?.metadata?.name} ${resource?.metadata.lastName}`
    )(isLogged ? user : order);

  }, [user, order, isLogged]);

  useEffect(() => {
    if (!order) return;
    (async () => {
      const { billingAddress } = await getAddresses();
      setBillingAddress(billingAddress);
    })();
  }, [getAddresses, order]);

  const isCompleted = useMemo(
    () => !!order?.metadata?.[VantiOrderMetadata.HasPersonalInfo],
    [order]
  );

  const handlePrev = async () => {
    router.push(
      `/checkout/${router.query.paymentType}/${flow.getPrevStep(lastPath)}`
    );
  };
  return (
    <>
      <HeadingCard
        classes="col-span-2"
        title="5. Datos de compra"
        icon="quotation"
        isCheck={isCompleted && tokenRecaptcha && true}
      >
        <div className="bg-white rounded-lg">
          <dl className="space-y-5 text-sm">
            <div className="flex justify-between">
              <dt className="flex-1 text-grey-30">Cuenta contrato:</dt>
              <dd className="flex-1 font-bold text-grey-30">{order?.number}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="flex-1 text-grey-30">Nombre del adquiriente:</dt>
              <dd className="flex-1 font-bold text-grey-30">{fullName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="flex-1 text-grey-30">Método de pago:</dt>
              <dd className="flex-1 font-bold text-grey-30">
                {router.query.paymentType?.toString().toUpperCase()}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="flex-1 text-grey-30">Banco seleccionado</dt>
              <dd className="flex-1 font-bold text-grey-30">
                Banco Davivienda
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="flex-1 text-grey-30">Dirección de facturación:</dt>
              <dd className="flex-1 font-bold text-grey-30">
                {billingAddress?.full_address}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-blue-dark">
                Sabemos que eres un humano, pero debemos confirmarlo.
                {/* <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V2}
                  onChange={(e) => onRecaptcha(e)}
                  className="mt-6"
                /> */}
                <ReCaptchaBox
                  version={2}
                  handleChange={(e) => onRecaptcha(e)}
                  classNames="mt-6"
                />
              </dt>
            </div>
            <div className="flex justify-between">
              <dt>
                NOTA: Al hacer click en “Enviar datos” serás contactado por un
                agente de Vanti
              </dt>
            </div>
          </dl>
          <div className="flex justify-end w-full mt-5">
            <button
              className="button button-outline"
              type="button"
              onClick={handlePrev}
            >
              Volver
            </button>
          </div>
        </div>
      </HeadingCard>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [];
  return { paths, fallback: "blocking" };
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {

  const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 2);
  const helpButton = await getMenu(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

  return {
    props: {
      layout: {
        name: 'Orden - Resumen',
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
