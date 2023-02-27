import { GetStaticProps } from "next";
import { getMenu } from "@/lib/services/menu-content.service";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID } from "@/constants/contentful-ids.constants";

import { useState } from 'react';
import {
    UserCircleIcon,
    ShoppingCartIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import { classNames } from "@/utils/functions";
import { getCustomerInfo } from "@/lib/services/commerce-layer.service";
import { useSession } from "next-auth/react";

const subNavigation = [
    { name: 'Cuenta', href: '#', icon: UserCircleIcon, current: true },
    { name: 'Ordenes', href: '#', icon: ShoppingCartIcon, current: false },
    { name: 'Direcciones', href: '#', icon: MapPinIcon, current: false },
];

const Dashboard = () => {

    const [customerDataForm, setCustomerDataForm] = useState({
        name: "",
        lastName: "",
        email: "",
        docType: "",
        docNum: "",
        cellPhone: "",
    });

    const { status, data: session } = useSession();
    if (status === "authenticated" && customerDataForm.email === "") {
        getCustomerInfo(session.user["accessToken"]).then((data) => {
            const info = data.data;
            setCustomerDataForm({
                name: info?.metadata["name"],
                lastName: info?.metadata["lastName"],
                email: info?.email,
                docType: info?.metadata["documentType"],
                docNum: info?.metadata["documentNumber"],
                cellPhone: info?.metadata["cellPhone"],
            });
        });
    }

    return (
        <>
            <div className="h-full">
                <main className="mx-auto max-w-7xl pb-10 lg:py-12">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                        <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
                            <nav className="space-y-1">
                                {subNavigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-grey-90 text-blue-dark'
                                                : 'text-grey-60 hover:text-blue-dark hover:bg-grey-90',
                                            'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current
                                                    ? ''
                                                    : '',
                                                'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
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
                            <section aria-labelledby="payment-details-heading">
                                <form action="#" method="POST">
                                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                                        <div className="bg-white py-6 px-4 sm:p-6">
                                            <div>
                                                <h2 id="payment-details-heading" className="text-lg font-medium leading-6 text-gray-900">
                                                    Detalles usuario
                                                </h2>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Información
                                                </p>
                                            </div>

                                            <div className="mt-6 grid grid-cols-4 gap-6">
                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                        Nombres
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="cc-given-name"
                                                        value={customerDataForm.name}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                        readOnly
                                                    />
                                                </div>

                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                        Apellidos
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        id="last-name"
                                                        autoComplete="cc-family-name"
                                                        value={customerDataForm.lastName}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                        readOnly
                                                    />
                                                </div>

                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                        Correo Electrónico
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email-address"
                                                        id="email-address"
                                                        autoComplete="email"
                                                        value={customerDataForm.email}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                        readOnly
                                                    />
                                                </div>

                                                <div className="col-span-4 sm:col-span-1">
                                                    <label htmlFor="document-type" className="block text-sm font-medium text-gray-700">
                                                        Tipo Documento
                                                    </label>
                                                    <select
                                                        id="document-type"
                                                        name="document-type"
                                                        autoComplete="document-type"
                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                    >
                                                        <option>{customerDataForm.docType}</option>
                                                    </select>
                                                </div>

                                                <div className="col-span-4 sm:col-span-1">
                                                    <label htmlFor="document-num" className="block text-sm font-medium text-gray-700">
                                                        Número Documento
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="document-num"
                                                        id="document-num"
                                                        autoComplete="cc-csc"
                                                        value={customerDataForm.docNum}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                        readOnly
                                                    />
                                                </div>

                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="cellphone-num" className="block text-sm font-medium text-gray-700">
                                                        Celular
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="cellphone-num"
                                                        id="cellphone-num"
                                                        autoComplete="cellphone-num"
                                                        value={customerDataForm.cellPhone}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                            <button
                                                type="submit"
                                                disabled
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-dark py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                                            >
                                                Actualizar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {
    const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
    const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 2);
    const helpButton = await getMenu(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

    return {
        props: {
            layout: {
                name: 'Mi cuenta',
                footerInfo,
                headerInfo,
                helpButton,
            },
        },
        revalidate,
    };
};

export default Dashboard;