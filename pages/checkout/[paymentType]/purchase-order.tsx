import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "@/context/Checkout";
import { Address, Order } from '@commercelayer/sdk';
import { VantiOrderMetadata } from '@/constants/checkout.constants';
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { GetStaticPaths, GetStaticProps } from "next";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID } from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";
import AuthContext from "@/context/Auth";
import Icon from "@/components/atoms/icon/Icon";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Spinner from "@/components/atoms/spinner/Spinner";
import { IP2PRequestInformation } from "@/lib/interfaces/p2p-cf-interface";
const DEFAULT_SHIPPING_METHOD_ID = "dOLWPFmmvE"; //Temp - pass using env varible

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
    const { getOrderById } = useContext(CheckoutContext);
    const [billingAddress, setBillingAddress] = useState<Address>();
    const orderId = router.query.id?.toString();
    const [orderInfoById, setOrderInfoById] = useState<Order>();
    const [statusError, setStatusError] = useState(false);

    const fullName = useMemo(() => {
        return (
            (resource) => `${resource?.metadata?.name} ${resource?.metadata.lastName}`
        )(isLogged ? user : orderInfoById);

    }, [user, orderInfoById, isLogged]);

    useEffect(() => {
        (async () => {
            if (!orderId) { setStatusError(true); console.info('no orderId'); return; }
            const orderData = await getOrderById(orderId);
            if (orderData["status"] === 200) {
                setOrderInfoById(orderData.data);
                setBillingAddress(orderData.data["billing_address"]);
                console.info({ orderData });
            } else {
                console.info('status', orderData["status"]);
                setStatusError(true);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isCompleted = useMemo(
        () => !!orderInfoById?.metadata?.[VantiOrderMetadata.HasPersonalInfo],
        [orderInfoById]
    );

    const shipments = () => {
        const shipments = orderInfoById.shipments;
        const shipmentItems = [];
        shipments.forEach(async (el) => {
            const availableMethods = el.available_shipping_methods;
            const methods = availableMethods.map((item) => { if (item.id != DEFAULT_SHIPPING_METHOD_ID) return item.name; });
            shipmentItems.push(methods);
        });
        return (shipmentItems.length > 1) ? shipmentItems.toString() : shipmentItems[0];
    };

    const paymentEntity = () => {
        const paymentInfo: IP2PRequestInformation = orderInfoById?.captures?.at(0).metadata?.paymentInfo;
        return {
            paymentMethod: paymentInfo?.payment.at(0)?.paymentMethodName ?? "-----",
            paymentEntity: paymentInfo?.payment.at(0)?.issuerName ?? "-----"
        };
    };

    return (
        <HeadingCard
            classes="col-span-2"
            title={!statusError ? orderStatus(orderInfoById?.status).text : "Comprobación..."}
            icon={orderStatus(orderInfoById?.status).leftIcon}
            isCheck={isCompleted}
            rightIcon={orderStatus(orderInfoById?.status).rightIcon}
        >

            {/* Display spinner if statusError and orderInfoById are undefined  */}
            {!statusError && !orderInfoById && <Spinner position="absolute" size="large" />}

            {/* Display notification if Error */}
            {statusError &&
                <div className="bg-white rounded-lg">
                    <div className="text-center">
                        <span className="block w-12 h-12 m-auto shrink-0 text-lucuma">
                            <Icon icon="alert" className="w-full h-full" />
                        </span>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">Comprobación de orden</h3>
                        <p className="mt-1 text-sm text-gray-500">Ha ocurrido un error al consultar o no existe la orden.</p>
                        <div className="flex justify-center mt-6">
                            <CustomLink
                                content={{ urlPaths: ["/"] }}
                                linkClassName="relative button button-primary"
                            >
                                Ir a la tienda
                            </CustomLink>
                        </div>
                    </div>
                </div>
            }

            {/* Display order content if no Error and order data no empty*/}
            {!statusError && orderInfoById &&
                <div className="bg-white rounded-lg">
                    <dl className="space-y-5 text-sm">
                        <div className="flex justify-between">
                            <dt className="flex-1 text-grey-30">Cuenta contrato:</dt>
                            <dd className="flex-1 font-bold text-grey-30">{orderInfoById?.number ?? "-----"}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="flex-1 text-grey-30">Nombre del adquiriente:</dt>
                            <dd className="flex-1 font-bold text-grey-30">{fullName ?? "-----"}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="flex-1 text-grey-30">Cedula de ciudadania:</dt>
                            <dd className="flex-1 font-bold text-grey-30">
                                {orderInfoById?.metadata?.documentNumber}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="flex-1 text-grey-30">Método de pago:</dt>
                            <dd className="flex-1 font-bold text-grey-30">
                                {paymentEntity().paymentMethod ?? "-----"}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="flex-1 text-grey-30">Entidad bancaria:</dt>
                            <dd className="flex-1 font-bold text-grey-30">
                                {paymentEntity().paymentEntity ?? "-----"}
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
                                {shipments() ?? "-----"}
                            </dd>
                        </div>
                    </dl>
                </div>
            }
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
