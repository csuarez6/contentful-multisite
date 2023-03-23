import { GetStaticProps } from "next";
import { getMenu } from "@/lib/services/menu-content.service";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";

import { useState } from "react";
import {
  UserCircleIcon,
  ShoppingCartIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/utils/functions";
import { getCustomerInfo } from "@/lib/services/commerce-layer.service";
import { useSession } from "next-auth/react";
import CustomLink from "@/components/atoms/custom-link/CustomLink";

const subNavigation = [
  { name: "Perfíl", href: "#", icon: UserCircleIcon, current: true },
  { name: "Compras", href: "/dashboard/orders", icon: ShoppingCartIcon, current: false },
  { name: "Direcciones", href: "#", icon: MapPinIcon, current: false },
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
        <main className="pb-10 mx-auto max-w-7xl lg:py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
              <nav className="space-y-1">
                {subNavigation.map((item) => (
                  <CustomLink
                    content={{ urlPath: item.href }}
                    key={item.name}
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
                  </CustomLink>
                ))}
              </nav>
            </aside>

            {/* Payment details */}
            <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
              <section aria-labelledby="payment-details-heading">
                <form action="#" method="POST">
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="px-4 py-6 bg-white sm:p-6">
                      <div>
                        <h2
                          id="payment-details-heading"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Detalles usuario
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Información
                        </p>
                      </div>

                      <div className="grid grid-cols-4 gap-6 mt-6">
                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nombres
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="cc-given-name"
                            value={customerDataForm.name}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            readOnly
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Apellidos
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="cc-family-name"
                            value={customerDataForm.lastName}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            readOnly
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Correo Electrónico
                          </label>
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            value={customerDataForm.email}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            readOnly
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-1">
                          <label
                            htmlFor="document-type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tipo Documento
                          </label>
                          <select
                            id="document-type"
                            name="document-type"
                            autoComplete="document-type"
                            className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          >
                            <option>{customerDataForm.docType}</option>
                          </select>
                        </div>

                        <div className="col-span-4 sm:col-span-1">
                          <label
                            htmlFor="document-num"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Número Documento
                          </label>
                          <input
                            type="text"
                            name="document-num"
                            id="document-num"
                            autoComplete="cc-csc"
                            value={customerDataForm.docNum}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            readOnly
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="cellphone-num"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Celular
                          </label>
                          <input
                            type="text"
                            name="cellphone-num"
                            id="cellphone-num"
                            autoComplete="cellphone-num"
                            value={customerDataForm.cellPhone}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                      <button
                        type="submit"
                        disabled
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2"
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

export default Dashboard;