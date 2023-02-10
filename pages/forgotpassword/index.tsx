import { GetStaticProps } from "next";
import getPageContent from "@/lib/services/page-content.service";
import { getMenu } from "@/lib/services/menu-content.service";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from "@/constants/contentful-ids.constants";
import Textbox from "@/components/atoms/input/textbox/TextBox";

const ForgotPassword = () => {
    return (
        <div className="py-12 bg-white ">
            <div className="relative sm:py-16">
                <div aria-hidden="true" className="hidden sm:block">
                    <div className="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-gray-50" />
                    <svg className="absolute -ml-3 top-8 left-1/2" width={404} height={392} fill="none" viewBox="0 0 404 392">
                        <defs>
                            <pattern
                                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
                    </svg>
                </div>
                <div className="max-w-md px-6 mx-auto sm:max-w-3xl lg:max-w-7xl lg:px-8">
                    <div className="relative px-6 py-10 overflow-hidden shadow-xl bg-grey-90 rounded-2xl sm:px-12 sm:py-20">
                        <div className="relative">
                            <div className="sm:text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-blue-dark sm:text-4xl">
                                    ¿Olvidaste tu contraseña?
                                </h2>
                                <p className="max-w-2xl mx-auto mt-6 text-lg text-blue-dark">
                                    Te enviaremos un correo electrónico con instrucciones sobre cómo restablecerlo.
                                </p>
                            </div>
                            <form action="#" className="flex flex-col gap-4 mt-12 sm:mx-auto sm:max-w-lg">
                                <div className="flex-1">
                                    <Textbox
                                        id="email"
                                        type="text"
                                        placeholder="Correo Electrónico"
                                        className="form-input"
                                        autoComplete="on"
                                    />
                                </div>
                                <div className="flex-1">
                                    <button
                                        type="submit"
                                        className="w-full button button-primary"
                                    >
                                        Recuperar Contraseña
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {
    const pageContent = await getPageContent(
        '/',
        context.preview ?? false
    );

    const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
    const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 2);

    return {
        props: {
            ...pageContent,
            layout: {
                name: pageContent.name,
                footerInfo,
                headerInfo,
            },
        },
        revalidate,
    };
};

export default ForgotPassword;