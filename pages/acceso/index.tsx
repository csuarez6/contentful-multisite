import { GetStaticProps } from "next";
import { getHeader, getNavigation } from "@/lib/services/menu-content.service";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID } from "@/constants/contentful-ids.constants";
import LoginFormBlock, { IForm } from "@/components/blocks/login-form/LoginFormBlock";
import { useState } from "react";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import Breadcrumbs from "@/components/blocks/breadcrumbs-block/Breadcrumbs";

const ModalContent = ({ modalMsg }) => {
    return (
        <div className="flex flex-col gap-12">
            <p className="text-center">
                {modalMsg}
            </p>
        </div>
    );
};

const Login = () => {
    const router = useRouter();
    const modalDefault = {
        children: <ModalContent modalMsg="..." />,
        promoIcon: 'loader',
        promoTitle: 'Espere...',
        isClosable: false
    };
    const [dataModal, setDataModal] = useState<IPromoContent>(modalDefault);

    const onSubmit = async (data) => {
        try {
            setDataModal(modalDefault);
            const destination = router.query.p?.toString() || '/';
            const resp = await signIn("credentials", {
                username: data.email,
                password: data.password,
                tokenReCaptcha: data.tokenReCaptcha,
                redirect: false
            });
            if (resp?.ok) {
                router.replace(destination);
            } else {
                setDataModal({
                    children: <ModalContent modalMsg={resp.error ?? "Ha ocurrido un error, por favor intente nuevamente."} />,
                    promoIcon: 'cancel',
                    promoTitle: 'Error durante el acceso!',
                });
            }
        } catch (error) {
            setDataModal({
                children: <ModalContent modalMsg="Ha ocurrido un error, por favor intente nuevamente." />,
                promoIcon: 'cancel',
                promoTitle: 'Error durante el proceso - Customer!',
            });
        }
    };

    const formData: IForm = {
        formData: {
            cta: {
                className: 'button-primary',
                text: 'Iniciar sesión'
            },
            onSubmitForm: onSubmit,
            modal: dataModal
        }
    };

    const breadcrumbs = {
        items: [
            {
                promoTitle: 'Hogares',
                internalLink: {
                    urlPaths: ['/']
                }
            },
            {
                promoTitle: 'Iniciar sesión',
                internalLink: {
                    urlPaths: ['#']
                }
            },
        ],
    };

    return (
        <div className="overflow-hidden">
            <div className="main-container">
                <Breadcrumbs ctaCollection={breadcrumbs} />
                <LoginFormBlock {...formData} />
            </div>
        </div>
    );
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {
    const headerInfo = await getHeader(DEFAULT_HEADER_ID, context.preview ?? false);
    const footerInfo = await getNavigation(DEFAULT_FOOTER_ID, context.preview ?? false);
    const helpButton = await getNavigation(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

    return {
        props: {
            layout: {
                name: 'Iniciar sesión',
                footerInfo,
                headerInfo,
                helpButton,
            },
        },
        revalidate,
    };
};

export default Login;