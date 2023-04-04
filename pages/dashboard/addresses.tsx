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
import Icon from "@/components/atoms/icon/Icon";

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

const EmptyBlock = (): JSX.Element => {
    return (
        <div className="flex flex-col items-center content-center">
            <Icon className="w-[168px] h-[127px] text-blue-dark" icon="place" />
            <p className="mt-4 text-sm font-semibold md:text-lg text-blue-dark">No existen direcciones</p>
            <p className="mt-1 text-gray-500">Por favor, intenta registrar una dirección</p>
        </div>
    );
};

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
                endpoint: process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT
            });
        }
    }, [status, session]);

    const [address, setAddress] = useState<any>({});
    const [showForm, setShowForm] = useState(false);

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
                        <div className="space-y-3 sm:px-6 lg:col-span-9 lg:px-0">
                            <div>
                                <h2 className="text-lg font-medium text-blue-dark">
                                    Direcciones
                                </h2>
                            </div>
                            <CommerceLayer {...config}>
                                <CustomerContainer>
                                    <AddressesContainer>
                                        <AddressesEmpty>{() => (!showForm) ? (<EmptyBlock />) : <></>}</AddressesEmpty>
                                        <div className="w-full">
                                            {!showForm ? (
                                                <>
                                                    <div className="flex flex-wrap w-full mx-auto">
                                                        <Address className="relative flex w-1/3 p-4 m-2 bg-white border rounded-lg shadow-sm focus:outline-none">
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
                                                                            className="text-sm font-medium text-indigo-300 cursor-pointer hover:text-indigo-600"
                                                                            type="edit"
                                                                            label="Editar"
                                                                            onClick={(address) => {
                                                                                setAddress(address);
                                                                                setShowForm(true);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <AddressField
                                                                            className="text-sm font-medium text-red-300 cursor-pointer hover:text-red-600"
                                                                            type="delete"
                                                                            label="Eliminar"
                                                                            onClick={() => { console.info("Remove Address"); }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Address>
                                                    </div>
                                                    <div className="flex justify-center mt-3 ml-2">
                                                        <div
                                                            className="flex items-center justify-center w-full px-2 py-2 text-center text-gray-500 transition duration-200 ease-in border border-gray-300 rounded cursor-pointer bg-grey-90 hover:border-gray-400"
                                                            onClick={() => {
                                                                setAddress({});
                                                                setShowForm(true);
                                                            }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256" className="w-5 md:w-6">
                                                                <rect width="256" height="256" fill="none"></rect>
                                                                <path d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm40,112H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z"></path>
                                                            </svg>
                                                            <p className="text-xs px-0.5">Agregar dirección</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : null}
                                            {showForm ? (
                                                <HeadingCard
                                                    title="Dirección"
                                                    headClasses="w-full !justify-center text-2xl text-blue-dark mt-2"
                                                    hideCheck={true}
                                                >
                                                    <BillingAddressForm
                                                        errorClassName="border-red-600 focus:ring-red-600 focus:border-red-600"
                                                        autoComplete="on"
                                                        className="p-2"
                                                    >
                                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3'>
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
                                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3'>
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
                                                            onClick={() => setShowForm(false)}
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
