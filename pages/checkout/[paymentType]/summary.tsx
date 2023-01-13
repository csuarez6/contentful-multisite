import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "src/context/Checkout";
import { useLastPath } from "src/hooks/utils/useLastPath";
import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";
import { Address } from "@commercelayer/sdk";
import { VantiOrderMetadata } from '@/constants/checkout.constants';

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
      <h2>
        <span>Ingresar datos personales</span>
        <input type="checkbox" checked={isCompleted} readOnly />
      </h2>
      <ul>
        <li>
          <h5># {order?.number}</h5>
        </li>
        <li>
          <h5>Nombre del adquiriente:</h5>
          {order?.metadata?.firstName} {order?.metadata?.lastName}
        </li>
        <li>
          <h5>Método de pago:</h5>
          {router.query.paymentType?.toString().toUpperCase()}
        </li>
        <li>
          <h5>Dirección de facturación:</h5>
          {billingAddress?.full_address}
        </li>
        <li>
          <button type="button" className="mr-4" onClick={handlePrev}>
            Volver
          </button>
        </li>
      </ul>
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
