import { GetStaticPaths, GetStaticProps } from "next";
import { getHeader, getNavigation } from "@/lib/services/menu-content.service";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import {
  CommerceLayer,
  LineItemsContainer,
  LineItem,
  LineItemAmount,
  LineItemCode,
  LineItemImage,
  LineItemName,
  LineItemQuantity,
  OrderContainer,
  ShipmentsContainer,
  Shipment,
  ShipmentField,
  Parcels,
  ShipmentsCount,
  ParcelLineItemsCount,
  ParcelLineItem,
  ParcelField,
  ParcelLineItemField,
  SubTotalAmount,
  DiscountAmount,
  ShippingAmount,
  PaymentMethodAmount,
  TaxesAmount,
  GiftCardAmount,
  TotalAmount,
  OrderNumber,
  PaymentMethodsContainer,
  PaymentSource,
  PaymentSourceBrandIcon,
  PaymentSourceDetail,
  PaymentSourceBrandName,
} from "@commercelayer/react-components";
import {
  UserCircleIcon,
  ShoppingCartIcon,
  MapPinIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/utils/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AsteriskSimple } from "phosphor-react";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";

const subNavigation = [
  { name: "Perfíl", href: "/dashboard", icon: UserCircleIcon, current: false },
  {
    name: "Compras",
    href: "/dashboard/orders",
    icon: ShoppingCartIcon,
    current: true,
  },
  {
    name: "Dirección",
    href: "/dashboard/addresses",
    icon: MapPinIcon,
    current: false,
  },
  {
    name: "Actualizar Contraseña",
    href: "/dashboard/upgradePassword",
    icon: ArrowPathIcon,
    current: false,
  },
];

const handlerStatusColor = (status: string) => {
  switch (status) {
    case "placed": // Orders
    case "approved": // Orders
    case "shipped": // Shipments
    case "received": // Returns
      return "text-green-400 bg-green-400 bg-opacity-10";
    default:
      return "text-yellow-400 bg-yellow-400 bg-opacity-10";
  }
};

const getStatusTranslations = (value: string) => {
  switch (value) {
    case "on_hold":
    case "upcoming":
    case "draft":
      return "Próximo";
    case "picking":
    case "packing":
    case "ready_to_ship":
      return "En progreso";
    case "cancelled":
      return "Cancelado";
    case "shipped":
      return "Enviado";
    default:
      return value || "";
  }
};

const getTranslations = (value: string) => {
  switch (value) {
    case "Stripe Payment":
    case "Adyen Payment":
    case "Braintree Payment":
    case "Checkout Com Payment":
      return "creditCard";

    case "Paypal Payment":
      return "PayPal";

    case "Wire transfer":
    case "Wire Transfer":
      return "wireTransfer";

    default:
      return value || "";
  }
};

export type ShipmentStatus =
  | "draft"
  | "upcoming"
  | "cancelled"
  | "on_hold"
  | "picking"
  | "packing"
  | "ready_to_ship"
  | "shipped";

interface Props {
  status?: ShipmentStatus;
}

const ShipmentStatusChip = ({ status }: Props): JSX.Element => {
  if (status === undefined) return <></>;
  return (
    <p
      className={classNames(
        handlerStatusColor(status),
        "inline text-sm text-center text-3xs w-auto uppercase font-bold py-[2px] px-[8px] leading-snug rounded-xl align-middle"
      )}
    >
      {getStatusTranslations(status)}
    </p>
  );
};

const Parcel = (): JSX.Element => {
  return (
    <>
      <div className="py-2 pl-7">
        <div className="flex items-center justify-between pt-10">
          {/* <span className="relative pr-4 text-sm font-bold before:(bg-[#e6e7e7] content-[""] h-[1px] w-[20px] absolute top-[50%] left-[-28px]) max-w-1/3 md:max-w-full break-all"> */}
          <span className="relative pr-4 text-sm font-bold break-all max-w-1/3 md:max-w-full">
            Parcel <ParcelField attribute="number" tagElement="span" />
          </span>
          <div className="flex">
            <div className="relative hidden pl-10 mr-10 md:block">
              <label className="absolute right-0 font-bold text-right text-gray-300 uppercase -top-5 text-[12px]">
                ffffff
              </label>
              <div className="text-sm font-bold text-right break-all">
                <ParcelField attribute="tracking_number" tagElement="span" />
              </div>
            </div>
            {/* <ParcelLink /> */}
          </div>
        </div>
        <div className="py-3">
          <ParcelLineItemsCount>
            {(_props) => {
              return (
                // <ShowHideMenu itemsCounter={props?.quantity}>
                <ParcelLineItem>
                  <div className="flex flex-row py-4">
                    <div className="p-1 border rounded w-[45px]">
                      <ParcelLineItemField
                        tagElement="img"
                        attribute="image_url"
                      />
                    </div>
                    <div className="flex flex-col flex-1 pl-4">
                      <span className="text-sm font-bold">
                        <ParcelLineItemField
                          tagElement="span"
                          attribute="name"
                        />
                      </span>
                      <span className="mt-1 text-xs text-gray-500 uppercase">
                        Quantity:
                        <ParcelLineItemField
                          tagElement="span"
                          attribute="quantity"
                        />
                      </span>
                    </div>
                  </div>
                </ParcelLineItem>
                // </ShowHideMenu>
              );
            }}
          </ParcelLineItemsCount>
        </div>
      </div>
    </>
  );
};

interface PaymentSourceCreditCardExpiresProps {
  variant: "row" | "card";
}

const PaymentSourceCreditCardExpires = ({
  variant,
}: PaymentSourceCreditCardExpiresProps): JSX.Element => {
  const expiry_month = (
    <PaymentSourceDetail type="exp_month">
      {({ text }) =>
        text === "**" ? (
          <div className="flex items-center">
            <AsteriskSimple size={8} />
            <AsteriskSimple size={8} />
          </div>
        ) : (
          <span>{text}</span>
        )
      }
    </PaymentSourceDetail>
  );

  const exp_year = (
    <PaymentSourceDetail type="exp_year">
      {({ text }) =>
        text === "**" ? (
          <div className="flex items-center">
            <AsteriskSimple size={8} />
            <AsteriskSimple size={8} />
          </div>
        ) : (
          <span>{text.toString().slice(-2)}</span>
        )
      }
    </PaymentSourceDetail>
  );

  const label = (
    <div className="flex items-center gap-1">
      Expira
      <div className="flex">
        {expiry_month}/{exp_year}
      </div>
    </div>
  );

  return variant === "card" ? (
    <span className="antialiased text-[13px] leading-[20px] text-gray-400 mt-[4px]">
      {label}
    </span>
  ) : (
    <div className="font-light text-gray-500">{label}</div>
  );
};

const PaymentSourceRow = (): JSX.Element => {
  return (
    <div className="rounded flex bg-gray-50 items-center px-4 h-[57px]">
      <div>
        <PaymentSourceBrandIcon width={36} />
      </div>
      <div className="flex flex-col w-full ml-6 text-sm">
        <PaymentSourceDetail type="last4">
          {(props) => {
            if (props.text === null || props.text.length === 0)
              return (
                <div className="flex gap-1">
                  <PaymentSourceBrandName>
                    {(props) => {
                      return props?.brand ? (
                        <div className="font-bold break-all">
                          {getTranslations(props?.brand)}
                        </div>
                      ) : null;
                    }}
                  </PaymentSourceBrandName>
                </div>
              );
            return (
              <>
                <div className="flex gap-1">
                  <PaymentSourceBrandName>
                    {(props) => {
                      return props?.brand ? (
                        <div className="font-bold break-all">
                          {getTranslations(props?.brand)}
                        </div>
                      ) : null;
                    }}
                  </PaymentSourceBrandName>
                  <div className="font-bold break-all">
                    Terminado en <PaymentSourceDetail type="last4" />
                  </div>
                </div>
                <PaymentSourceCreditCardExpires variant="row" />
              </>
            );
          }}
        </PaymentSourceDetail>
      </div>
    </div>
  );
};

const DashboardOrder = () => {
  let orderId = "";
  const { query } = useRouter();
  if (query["id"]) {
    orderId = query["id"] as string;
  }
  const [config, setConfig] = useState({
    accessToken: "",
    endpoint: "",
  });

  const { status, data: session } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      setConfig({
        accessToken: session?.user["accessToken"],
        endpoint: process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT,
      });
    }
  }, [status, session]);

  return (
    <div className="overflow-hidden">
      <div className="main-container">
        <div className="h-full">
          <main className="pb-10 mx-auto max-w-7xl lg:py-12">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
              <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
                <nav className="space-y-1">
                  {subNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-grey-90 text-blue-dark"
                          : "text-grey-60 hover:text-blue-dark hover:bg-grey-90",
                        "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </aside>

              {/* Content details */}
              <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                <CommerceLayer {...config}>
                  <div className="container px-5 mx-auto mt-5">
                    <OrderContainer orderId={orderId}>
                      <div className="flex gap-3 mb-5">
                        <CustomLink
                          content={{
                            urlPaths: ["/dashboard/orders"],
                          }}
                          className="flex items-center justify-center w-8 h-8 font-bold text-center underline rounded-full bg-grey-80 text-blue-dark "
                        >
                          <Icon className="w-6" icon="arrow-left" />
                        </CustomLink>
                        <h2 className="text-lg font-medium text-blue-dark">
                          Compra # <OrderNumber />
                        </h2>
                      </div>
                      <div className="flex flex-col gap-5">
                        <div className="relative flex items-center justify-between text-black transition duration-500 cursor-pointer ease focus:bg-gray-400">
                          <span>RESUMEN</span>
                        </div>
                        <LineItemsContainer>
                          <LineItem type="skus">
                            <div className="flex flex-row w-full pt-6 pb-8 border-b">
                              <LineItemImage className="self-start p-1 border rounded w-[75px] md:w-[85px] bg-contrast" />
                              <div className="flex justify-between w-full pl-4 md:pl-8">
                                <div>
                                  <div className="flex h-4 gap-1 text-xs font-semibold text-gray-600">
                                    SKU{" "}
                                    <LineItemCode className="text-xs text-gray-600" />
                                  </div>
                                  <LineItemName className="block mb-1 font-bold" />
                                  <span className="text-xs font-semibold uppercase bg-gray-300 text-gray-600 py-[4px] px-[12px] rounded-full">
                                    <LineItemQuantity>
                                      {(props) => (
                                        <>
                                          {!!props.quantity &&
                                            `CANTIDAD: ${props.quantity}`}
                                        </>
                                      )}
                                    </LineItemQuantity>
                                  </span>
                                </div>
                                <LineItemAmount className="pt-4 text-lg font-extrabold" />
                              </div>
                            </div>
                          </LineItem>
                        </LineItemsContainer>
                        <div className="flex flex-row py-6 text-sm pl-[91px] md:pl-[117px]">
                          <div className="flex flex-col flex-1">
                            <div className="flex flex-row justify-between">
                              <p>Subtotal</p>
                              <SubTotalAmount />
                            </div>
                            <div className="flex flex-row justify-between">
                              <DiscountAmount>
                                {(props) => {
                                  if (props.priceCents === 0) return <></>;
                                  return (
                                    <>
                                      <p>Descuento</p>
                                      <div>{props.price}</div>
                                    </>
                                  );
                                }}
                              </DiscountAmount>
                            </div>
                            <div className="flex flex-row justify-between">
                              <p>Envío</p>
                              <ShippingAmount />
                            </div>
                            <div className="flex flex-row justify-between">
                              <PaymentMethodAmount>
                                {(props) => {
                                  if (props.priceCents === 0) return <></>;
                                  return (
                                    <>
                                      <p>Método de pago</p>
                                      {props.price}
                                    </>
                                  );
                                }}
                              </PaymentMethodAmount>
                            </div>
                            <div className="flex flex-row justify-between">
                              <p>Impuesto</p>
                              <TaxesAmount />
                            </div>
                            <div className="flex flex-row justify-between">
                              <GiftCardAmount>
                                {(props) => {
                                  if (props.priceCents === 0) return <></>;
                                  return (
                                    <>
                                      <p>Tarjeta regalo</p>
                                      <div>{props.price}</div>
                                    </>
                                  );
                                }}
                              </GiftCardAmount>
                            </div>
                            <div className="flex flex-row justify-between pt-6 border-t border-gray-300 mt-7">
                              <p className="invisible text-xl font-normal lg:visible">
                                Total
                              </p>
                              <TotalAmount className="font-extrabold" />
                            </div>
                          </div>
                        </div>
                        {/* ****************** */}
                      </div>
                      {/* Shipments */}
                      <div className="flex flex-col gap-9">
                        <div className="relative flex items-center justify-between text-black transition duration-500 cursor-pointer ease focus:bg-gray-400">
                          <span>ENVIOS</span>
                        </div>
                        <ShipmentsContainer>
                          <Shipment>
                            <div className="border-b border-gray-300 last:(border-b-0) pb-10 mb-10 last:(pb-8 mb-0)">
                              <div className="flex items-center">
                                <span className="font-bold text-gray-500 bg-gray-300 rounded-full py-0.5 px-1.5 text-[12px]">
                                  <ShipmentField name="key_number" />/
                                  <ShipmentsCount />
                                </span>
                                <div className="relative ml-3">
                                  <div className="flex items-center">
                                    <span className="pr-6 text-sm font-bold">
                                      Envío #
                                      <ShipmentField name="number" />
                                    </span>
                                    <ShipmentField name="number">
                                      {(props) => {
                                        return (
                                          <ShipmentStatusChip
                                            status={
                                              props?.shipment
                                                ?.status as ShipmentStatus
                                            }
                                          />
                                        );
                                      }}
                                    </ShipmentField>
                                  </div>
                                  <ShipmentField name="number">
                                    {(props) => {
                                      return (
                                        <span className="absolute left-0 text-sm text-gray-500 -bottom-5">
                                          {
                                            props?.shipment?.shipping_method
                                              ?.name
                                          }
                                        </span>
                                      );
                                    }}
                                  </ShipmentField>
                                </div>
                              </div>
                              <Parcels>
                                <div className="ml-[0.85rem] border-l border-gray-300">
                                  <Parcel />
                                </div>
                              </Parcels>
                            </div>
                          </Shipment>
                        </ShipmentsContainer>
                      </div>
                      {/* ***************** */}
                      {/* Payments */}
                      <div className="flex flex-col gap-9">
                        <div className="relative flex items-center justify-between text-black transition duration-500 cursor-pointer ease focus:bg-gray-400">
                          <span>PAGOS</span>
                        </div>
                        <PaymentMethodsContainer>
                          <PaymentSource readonly>
                            <PaymentSourceRow />
                          </PaymentSource>
                        </PaymentMethodsContainer>
                      </div>
                      {/* ***************** */}
                    </OrderContainer>
                  </div>
                </CommerceLayer>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
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
        name: "Mi cuenta",
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

export default DashboardOrder;
