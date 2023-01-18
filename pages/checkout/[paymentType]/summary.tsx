import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "src/context/Checkout";
import { useLastPath } from "src/hooks/utils/useLastPath";
import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";
import { Address } from "@commercelayer/sdk";
import { VantiOrderMetadata } from '@/constants/checkout.constants';
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";

const CheckoutSummary = () => {
  const router = useRouter();
  const lastPath = useLastPath();

  const { order, flow, getAddresses } = useContext(CheckoutContext);

  const [billingAddress, setBillingAddress] = useState<Address>();


  useEffect(() => {
    if (!order) return;
    (async () => {
      const { billingAddress } = await getAddresses();
      setBillingAddress(billingAddress);
    })();
  }, [getAddresses, order]);

  const isCompleted = useMemo(
    () => !!order?.metadata?.[VantiOrderMetadata.HasPesonalInfo],
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
        isCheck={isCompleted}
      >
        <div className="bg-white rounded-lg">
          <dl className="space-y-5 text-sm">
            <div className="flex justify-between">
              <dt className="flex-1 text-grey-30">Cuenta contrato:</dt>
              <dd className="flex-1 text-grey-30 font-bold">{order?.number}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="flex-1 text-grey-30">Nombre del adquiriente:</dt>
              <dd className="flex-1 text-grey-30 font-bold">{order?.metadata?.firstName} {order?.metadata?.lastName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="flex-1 text-grey-30">Método de pago:</dt>
              <dd className="flex-1 text-grey-30 font-bold">{router.query.paymentType?.toString().toUpperCase()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="flex-1 text-grey-30">Banco seleccionado</dt>
              <dd className="flex-1 text-grey-30 font-bold">Banco Davivienda</dd>
            </div>
            <div className="flex justify-between">
              <dt className="flex-1 text-grey-30">Dirección de facturación:</dt>
              <dd className="flex-1 text-grey-30 font-bold">{billingAddress?.full_address}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-blue-dark">Sabemos que eres un humano, pero debemos confirmarlo.</dt>
            </div>
            <div className="flex justify-between">
              <dt className="">NOTA: Al hacer click en “Enviar datos” serás contactado por un agente de Vanti</dt>
            </div>
          </dl>
          <div className="flex mt-5 w-full justify-end">
            <button className="button button-outline" type="button" onClick={handlePrev}>
              Volver
            </button>
          </div>
        </div>
      </HeadingCard>
    </>
  );
};

CheckoutSummary.getInitialProps = () => {
  return {
    layout: {
      name: mockPageLayoutProps.data.name,
      footerInfo: mockPageLayoutProps.data.layout.footerInfo,
      headerInfo: mockPageLayoutProps.data.layout.headerInfo,
    },
  };
};

CheckoutSummary.getLayout = (page: ReactElement, pageProps: any) => {
  return defaultLayout(<CheckoutLayout>{page}</CheckoutLayout>, pageProps);
};

export default CheckoutSummary;
