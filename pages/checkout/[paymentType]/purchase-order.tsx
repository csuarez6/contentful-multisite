import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "@/context/Checkout";
import { Address } from "@commercelayer/sdk";
import { VantiOrderMetadata } from '@/constants/checkout.constants';
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { GetStaticPaths, GetStaticProps } from "next";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID } from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";
import AuthContext from "@/context/Auth";
import { getOrderByPaymentSourceToken } from "@/lib/services/commerce-layer.service";

const orderStatus = (value) => {
    switch (value) {
        case "cancelled":
            return {
                text: "¡Tu orden ha sido rechazada!",
                leftIcon: "order-cart-rejected",
                rightIcon: "order-rejected"
            };
        case "fulfilled":
            return {
                text: "¡Tu orden ha sido aprobada!",
                leftIcon: "order-cart-ok",
                rightIcon: "order-ok"
            };
        default:
            return {
                text: "¡Tu orden está pendiente!",
                leftIcon: "order-cart-pending",
                rightIcon: "order-pending"
            };
    }
};

const CheckoutPurchase = () => {
    const router = useRouter();
    const { isLogged, user } = useContext(AuthContext);
    const { order, getAddresses } = useContext(CheckoutContext);
    const [billingAddress, setBillingAddress] = useState<Address>();
    const transactionToken = router.query.id?.toString();

    console.info('transactionToken', transactionToken);

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

    return (
        <HeadingCard
            classes="col-span-2"
            title={orderStatus(order?.status).text}
            icon={orderStatus(order?.status).leftIcon}
            isCheck={isCompleted}
            rightIcon={orderStatus(order?.status).rightIcon}
        >
            <div className="bg-white rounded-lg">
                <dl className="space-y-5 text-sm">
                    <div className="flex justify-between">
                        <dt className="flex-1 text-grey-30">Cuenta contrato:</dt>
                        <dd className="flex-1 font-bold text-grey-30">{order?.number ?? "-----"}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="flex-1 text-grey-30">Nombre del adquiriente:</dt>
                        <dd className="flex-1 font-bold text-grey-30">{fullName ?? "-----"}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="flex-1 text-grey-30">Cedula de ciudadania:</dt>
                        <dd className="flex-1 font-bold text-grey-30">
                            0000 000 000
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="flex-1 text-grey-30">Método de pago:</dt>
                        <dd className="flex-1 font-bold text-grey-30">
                            {router.query.paymentType?.toString().toUpperCase() ?? "-----"}
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="flex-1 text-grey-30">Entidad bancaria:</dt>
                        <dd className="flex-1 font-bold text-grey-30">
                            Banco Davivienda
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="flex-1 text-grey-30">Direccion de envio:</dt>
                        <dd className="flex-1 font-bold text-grey-30">
                            {billingAddress?.line_1} {billingAddress?.city ?? "-----"}
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="flex-1 text-grey-30">Dirección de facturación:</dt>
                        <dd className="flex-1 font-bold text-grey-30">
                            {billingAddress?.full_address ?? "-----"}
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="flex-1 text-grey-30">Método de envio:</dt>
                        <dd className="flex-1 font-bold text-grey-30">
                            Estandar
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
                name: 'Estado de Orden',
                footerInfo,
                headerInfo,
                helpButton,
            },
        },
        revalidate,
    };
};

CheckoutPurchase.getLayout = (page: ReactElement, pageProps: any) => {
    return defaultLayout(<CheckoutLayout>{page}</CheckoutLayout>, pageProps);
};

export default CheckoutPurchase;
