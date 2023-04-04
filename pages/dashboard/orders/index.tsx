import { GetStaticProps } from "next";
import { getMenu } from "@/lib/services/menu-content.service";
import {
    DEFAULT_FOOTER_ID,
    DEFAULT_HEADER_ID,
    DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import {
    OrderList,
    OrderListRow,
    CustomerContainer,
    CommerceLayer,
    OrderListEmpty,
    OrderListColumn,
} from "@commercelayer/react-components";
import { OrderListPaginationInfo } from "@commercelayer/react-components/orders/OrderListPaginationInfo";
import { OrderListPaginationButtons } from "@commercelayer/react-components/orders/OrderListPaginationButtons";
import {
    UserCircleIcon,
    ShoppingCartIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/utils/functions";
import Icon from "@/components/atoms/icon/Icon";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type OrderStatus =
    | "draft"
    | "pending"
    | "placed"
    | "approved"
    | "cancelled";

interface Props {
    status?: OrderStatus
};

const colClassName = "text-left text-sm font-medium border-b border-gray-200 md:border-none text-blue-dark md:relative";
const titleClassName = "flex flex-row items-center gap-3";
const columns: OrderListColumn[] = [
    {
        Header: 'Compra',
        accessor: 'number',
        className: colClassName,
        titleClassName,
    },
    {
        Header: 'Estado',
        accessor: 'status',
        className: colClassName,
        titleClassName,
    },
    {
        Header: 'Fecha',
        accessor: 'updated_at',
        className: colClassName,
        titleClassName,
    },
    {
        Header: 'Monto',
        accessor: 'formatted_total_amount_with_taxes',
        className: colClassName,
        titleClassName,
    },
];

const setOrderStatus = {
    draft: {
        classChip: "bg-grey-200 border-grey-200 text-grey-700",
        nameChip: "Borrador"
    },
    pending: {
        classChip: "bg-orange-200 border-orange-200 text-orange-700",
        nameChip: "Pendiente"
    },
    cancelled: {
        classChip: "bg-red-200 border-red-200 text-red-700",
        nameChip: "Cancelado"
    },
    placed: {
        classChip: "bg-green-200 border-green-200 text-green-700",
        nameChip: "Colocado"
    },
    approved: {
        classChip: "bg-green-200 border-green-200 text-green-700",
        nameChip: "Aprobado"
    }
};

const OrderStatusChip = ({ status }: Props): JSX.Element => {
    if (status === undefined) return <></>;
    return (
        <div className={
            classNames(
                "flex items-center px-2 py-1 m-1 font-medium border rounded-full w-fit",
                `${setOrderStatus[status]["classChip"]}`,
            )}
        >
            <div className="flex-initial max-w-full text-xs font-normal leading-none">{setOrderStatus[status]["nameChip"] ?? status}</div>
        </div>
    );
};

const EmptyBlock = (): JSX.Element => {
    return (
        <div className="flex flex-col items-center content-center">
            <Icon className="w-[168px] h-[127px] text-blue-dark" icon="shopping-cart" />
            <p className="mt-4 text-sm font-semibold md:text-lg text-blue-dark">No existen compras</p>
            <p className="mt-1 text-gray-500">Te invitamos a realizar tu primera compra!</p>
        </div>
    );
};

const subNavigation = [
    { name: "Perfíl", href: "/dashboard", icon: UserCircleIcon, current: false },
    { name: "Compras", href: "#", icon: ShoppingCartIcon, current: true },
    { name: "Direcciones", href: "/dashboard/addresses", icon: MapPinIcon, current: false },
];

const DashboardOrders = () => {

    const [config, setConfig] = useState({
        accessToken: "",
        endpoint: ""
    });

    const { status, data: session } = useSession();
    useEffect(() => {
        if (status === "authenticated") {
            setConfig({
                accessToken: session?.user["accessToken"],
                endpoint: process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT
            });
        }
    }, [status, session]);

    return (
        <div className="main-container overflow-hidden">
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

                        {/* Payment details */}
                        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                            <div>
                                <h2 className="text-lg font-medium text-blue-dark">
                                    Mis Compras
                                </h2>
                            </div>
                            <CommerceLayer {...config}>
                                <CustomerContainer>
                                    <OrderList
                                        className="w-full mb-8 table-fixed md:-mx-0"
                                        columns={columns}
                                        showActions={true}
                                        loadingElement={
                                            <div className="px-5 lg:p-0">
                                                <p>Espere por favor...</p>
                                            </div>
                                        }
                                        actionsContainerClassName="absolute right-1 order-5 align-top  md:relative md:align-middle py-5 text-center"
                                        theadClassName="md:table-row-group"
                                        rowTrClassName="flex justify-between items-center relative md:content-center bg-white shadow-bottom mb-4 pb-12 md:pb-0 px-5 md:p-0 md:border-b md:border-gray-300 md:table-row md:shadow-none h-[107px] md:h-[76px]"
                                        showPagination
                                        pageSize={5}
                                        paginationContainerClassName="flex justify-between items-center"
                                    >
                                        <OrderListEmpty>{() => <EmptyBlock />}</OrderListEmpty>
                                        <OrderListRow field="number">
                                            {({ cell, order, ...p }) => {
                                                if (!order) return <></>;
                                                return <>{cell?.map((cell) => {
                                                    return (
                                                        <td key={order.number} {...p} {...cell.getCellProps()} className="py-2 border-b">
                                                            <p className="text-sm font-bold text-blue-dark"># {cell.render('Cell')}</p>
                                                            <p className="text-xs text-gray-500">
                                                                contiene {order.skus_count} artículo(s)
                                                            </p>
                                                        </td>
                                                    );
                                                })}</>;
                                            }}
                                        </OrderListRow>
                                        <OrderListRow field="status" className="py-2 align-top border-b">
                                            {({ cell, row, ...p }) => {
                                                const order = row?.original;
                                                if (!order) return <></>;
                                                const cols = cell?.map((cell) => {
                                                    return (
                                                        <td key={order.number} {...p} {...cell.getCellProps()} className="py-2 border-b">
                                                            <OrderStatusChip status={order.status} />
                                                        </td>
                                                    );
                                                });
                                                return <>{cols}</>;
                                            }}
                                        </OrderListRow>
                                        <OrderListRow
                                            field="updated_at"
                                            className="py-2 text-sm align-top border-b"
                                        />
                                        <OrderListRow
                                            field="formatted_total_amount_with_taxes"
                                            className="py-2 text-sm font-bold align-top border-b text-blue-dark"
                                        />
                                        <OrderListPaginationInfo className="text-sm text-blue-dark" />
                                        <OrderListPaginationButtons
                                            previousPageButton={{
                                                className:
                                                    "w-[46px] h-[38px] mr-2 border rounded text-sm text-blue-dark",
                                                show: true,
                                                hideWhenDisabled: true,
                                                label: <Icon icon="arrow-left" />
                                            }}
                                            nextPageButton={{
                                                className:
                                                    "w-[46px] h-[38px] mr-2 border rounded text-sm text-blue-dark",
                                                show: true,
                                                hideWhenDisabled: true,
                                                label: <Icon icon="arrow-right" />
                                            }}
                                            navigationButtons={{
                                                className:
                                                    "w-[46px] h-[38px] mr-2 border rounded text-sm text-blue-dark",
                                                activeClassName:
                                                    "text-primary font-semibold text-white bg-blue-dark border-primary border-2",
                                            }}
                                            className="p-2"
                                        />
                                    </OrderList>
                                </CustomerContainer>
                            </CommerceLayer>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {
    const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
    const footerInfo = await getMenu(
        DEFAULT_FOOTER_ID,
        context.preview ?? false,
        2
    );
    const helpButton = await getMenu(
        DEFAULT_HELP_BUTTON_ID,
        context.preview ?? false
    );

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

export default DashboardOrders;
