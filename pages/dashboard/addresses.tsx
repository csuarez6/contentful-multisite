import { GetStaticProps } from "next";
import { getMenu } from "@/lib/services/menu-content.service";
import {
    DEFAULT_FOOTER_ID,
    DEFAULT_HEADER_ID,
    DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import {
    CommerceLayer,
    CustomerContainer,
    AddressesContainer,
    Address,
    AddressField,
    AddressInput,
    BillingAddressForm,
    Errors,
    AddressStateSelector,
    AddressCountrySelector,
    AddressesEmpty,
    SaveAddressesButton,
} from '@commercelayer/react-components';
import {
    UserCircleIcon,
    ShoppingCartIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/utils/functions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";

const subNavigation = [
    { name: "Perfíl", href: "/dashboard", icon: UserCircleIcon, current: false },
    { name: "Compras", href: "/dashboard/orders", icon: ShoppingCartIcon, current: false },
    { name: "Direcciones", href: "#", icon: MapPinIcon, current: true },
];

const messages: any = [
    {
        code: 'EMPTY_ERROR',
        resource: 'addresses',
        field: 'firstName',
        message: `Can't be blank`,
    },
    {
        code: 'VALIDATION_ERROR',
        resource: 'addresses',
        field: 'email',
        message: `Must be valid email`,
    },
];

const DashboardAddresses = () => {
    const [config, setConfig] = useState({
        accessToken: "",
        endpoint: ""
    });

    const { status, data: session } = useSession();
    useEffect(() => {
        if (status === "authenticated") {
            setConfig({
                accessToken: session?.user["accessToken"],
                endpoint: "https://vanti-poc.commercelayer.io"
            });
        }
    }, [status, session]);

    const [address, setAddress] = useState<any>({});
    const [showForm, setShowForm] = useState(false);

    return (
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
                            <h2 className="text-lg font-medium leading-6 text-gray-900">
                                Direcciones
                            </h2>
                        </div>
                        <CommerceLayer {...config}>
                            <CustomerContainer>
                                <AddressesContainer>
                                    <AddressesEmpty>{() => <p>No hay direcciones disponibles.</p>}</AddressesEmpty>
                                    <div className="w-full p-5">
                                        <div className="flex flex-wrap w-full mx-auto">
                                            <Address className="w-1/3 p-2 m-2 border rounded shadow-sm hover:border-blue-500">
                                                <div className="flex flex-col justify-between h-full">
                                                    <div className="flex font-bold">
                                                        <AddressField name="first_name" />
                                                        <AddressField name="last_name" className="ml-1" />
                                                    </div>
                                                    <div>
                                                        <AddressField className="w-2/3" name="full_address" />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <AddressField
                                                                className="cursor-pointer"
                                                                type="edit"
                                                                label="Edit"
                                                                onClick={(address) => {
                                                                    setAddress(address);
                                                                    setShowForm(true);
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <AddressField
                                                                className="cursor-pointer"
                                                                type="delete"
                                                                label="Delete"
                                                                onClick={() => { console.log("test Address"); }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Address>
                                        </div>
                                        <div className="flex justify-center mt-3 ml-2">
                                            <button
                                                title='button'
                                                type="button"
                                                className="w-[250px] justify-center gap-3 inline-flex items-center px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
                                                onClick={() => {
                                                    setAddress({});
                                                    setShowForm(true);
                                                }}
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span>Agregar</span>
                                            </button>
                                        </div>
                                        {showForm ? (
                                            <HeadingCard
                                                title="Llenar formulario"
                                                headClasses="w-full !justify-center text-2xl text-blue-dark mt-2"
                                                hideCheck={true}
                                            >
                                                <BillingAddressForm
                                                    errorClassName="border-red-600 focus:ring-red-600 focus:border-red-600"
                                                    autoComplete="on"
                                                    className="p-2"
                                                >
                                                    <div>
                                                        <label
                                                            htmlFor="billing_address_first_name"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Nombres
                                                        </label>
                                                        <div className="mt-1">
                                                            <AddressInput
                                                                data-cy="billing_address_first_name"
                                                                name="billing_address_first_name"
                                                                type="text"
                                                                className="border border-grey-60 rounded w-full py-2 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none"
                                                                placeholder="Ingresar Nombres"
                                                                value={address?.first_name || ''}
                                                            />
                                                        </div>
                                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                                            <Errors
                                                                data-cy="billing_address_first_name_error"
                                                                resource="addresses"
                                                                field="billing_address_first_name"
                                                                messages={messages}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="billing_address_last_name"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Apellidos
                                                        </label>
                                                        <div className="mt-1">
                                                            <AddressInput
                                                                data-cy="billing_address_last_name"
                                                                name="billing_address_last_name"
                                                                type="text"
                                                                className="border border-grey-60 rounded w-full py-2 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none"
                                                                placeholder="Ingresar Apellidos"
                                                                value={address?.last_name || ''}
                                                            />
                                                        </div>
                                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                                            <Errors
                                                                data-cy="billing_address_last_name_error"
                                                                resource="addresses"
                                                                field="billing_address_last_name"
                                                                messages={messages}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="billing_address_line_1"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Dirección
                                                        </label>
                                                        <div className="mt-1">
                                                            <AddressInput
                                                                data-cy="billing_address_line_1"
                                                                name="billing_address_line_1"
                                                                type="text"
                                                                className="border border-grey-60 rounded w-full py-2 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none"
                                                                placeholder="Ingresar Dirección"
                                                                value={address?.line_1 || ''}
                                                            />
                                                        </div>
                                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                                            <Errors
                                                                data-cy="billing_address_line_1_error"
                                                                resource="addresses"
                                                                field="billing_address_line_1"
                                                                messages={messages}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="billing_address_city"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Ciudad
                                                        </label>
                                                        <div className="mt-1">
                                                            <AddressInput
                                                                data-cy="billing_address_city"
                                                                name="billing_address_city"
                                                                type="text"
                                                                className="border border-grey-60 rounded w-full py-2 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none"
                                                                placeholder="Ingresar Ciudad"
                                                                value={address?.city || ''}
                                                            />
                                                        </div>
                                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                                            <Errors
                                                                data-cy="billing_address_city_error"
                                                                resource="addresses"
                                                                field="billing_address_city"
                                                                messages={messages}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="billing_address_country_code"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            País
                                                        </label>
                                                        <div className="mt-1">
                                                            <AddressCountrySelector
                                                                data-cy="billing_address_country_code"
                                                                name="billing_address_country_code"
                                                                className="border border-grey-60 rounded w-full py-2 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none"
                                                                placeholder={{
                                                                    value: '',
                                                                    label: 'Sleccionar País',
                                                                    disabled: true,
                                                                }}
                                                                value={address?.country_code || ''}
                                                            />
                                                        </div>
                                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                                            <Errors
                                                                data-cy="billing_address_country_code_error"
                                                                resource="addresses"
                                                                field="billing_address_country_code"
                                                                messages={messages}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="billing_address_state_code"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Estado
                                                        </label>
                                                        <div className="mt-1">
                                                            <AddressStateSelector
                                                                data-cy="billing_address_state_code"
                                                                name="billing_address_state_code"
                                                                className="border border-grey-60 rounded w-full py-2 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none"
                                                                placeholder={{
                                                                    value: '',
                                                                    label: 'Seleccionar estado',
                                                                    disabled: true,
                                                                }}
                                                                value={address?.state_code || ''}
                                                            />
                                                        </div>
                                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                                            <Errors
                                                                data-cy="billing_address_state_code_error"
                                                                resource="addresses"
                                                                field="billing_address_state_code"
                                                                messages={messages}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="billing_address_zip_code"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Código postal
                                                        </label>
                                                        <div className="mt-1">
                                                            <AddressInput
                                                                data-cy="billing_address_zip_code"
                                                                name="billing_address_zip_code"
                                                                type="text"
                                                                className="border border-grey-60 rounded w-full py-2 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none"
                                                                placeholder="Código Postal"
                                                                value={address?.zip_code || ''}
                                                            />
                                                        </div>
                                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                                            <Errors
                                                                data-cy="billing_address_zip_code_error"
                                                                resource="addresses"
                                                                field="billing_address_zip_code"
                                                                messages={messages}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="billing_address_phone"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Teléfono
                                                        </label>
                                                        <div className="mt-1">
                                                            <AddressInput
                                                                data-cy="billing_address_phone"
                                                                name="billing_address_phone"
                                                                type="tel"
                                                                className="border border-grey-60 rounded w-full py-2 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none"
                                                                placeholder="Ingresar Teléfono"
                                                                value={address?.phone || ''}
                                                            />
                                                        </div>
                                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                                            <Errors
                                                                data-cy="billing_address_phone_error"
                                                                resource="addresses"
                                                                field="billing_address_phone"
                                                                messages={messages}
                                                            />
                                                        </p>
                                                    </div>
                                                    {/* <div>
                    <label
                      htmlFor="billing_address_billing_info"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Billing info
                    </label>
                    <div className="mt-1">
                      <AddressInput
                        data-cy="billing_address_billing_info"
                        name="billing_address_billing_info"
                        type="text"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Billing info"
                      />
                    </div>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      <Errors
                        data-cy="billing_address_billing_info"
                        resource="addresses"
                        field="billing_address_billing_info"
                        messages={messages}
                      />
                    </p>
                  </div> */}
                                                </BillingAddressForm>
                                                <div className="flex justify-between p-2 mt-5">
                                                    <button
                                                        type="button"
                                                        className="block text-center underline button text-blue-dark"
                                                        onClick={() => setShowForm(false)}
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <SaveAddressesButton
                                                        data-cy="save-addresses-button"
                                                        className="button button-primary"
                                                        // onClick={() => setShowForm(false)}
                                                        addressId={address.id}
                                                        label="Guardar"
                                                    />
                                                </div>
                                            </HeadingCard>
                                        ) : null}
                                    </div>
                                </AddressesContainer>
                            </CustomerContainer>
                        </CommerceLayer>
                    </div>
                </div>
            </main>
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

export default DashboardAddresses;
