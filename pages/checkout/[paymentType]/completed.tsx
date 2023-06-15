import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "@/context/Checkout";
import { Address } from "@commercelayer/sdk";
import { PSE_STEPS_TO_VERIFY } from '@/constants/checkout.constants';
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { GetStaticPaths, GetStaticProps } from "next";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID } from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";
import AuthContext from "@/context/Auth";

const CheckoutCompleted = () => {
    const router = useRouter();
    const { isLogged, user } = useContext(AuthContext);
    const { order, getAddresses } = useContext(CheckoutContext);

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
        () => order && PSE_STEPS_TO_VERIFY.map((step) => !!order.metadata?.[step]).every((i) => i),
        [order]
    );

    return (
        <HeadingCard
            classes="col-span-2"
            title="6. Resumen"
            icon="quotation"
            isCheck={isCompleted && true}
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
                </dl>
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

    const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
    const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 3);
    const helpButton = await getMenu(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

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

CheckoutCompleted.getLayout = (page: ReactElement, pageProps: any) => {
    return defaultLayout(<CheckoutLayout>{page}</CheckoutLayout>, pageProps);
};

export default CheckoutCompleted;
