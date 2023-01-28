import { GetStaticProps } from "next";
import getPageContent from "@/lib/services/page-content.service";
import { getMenu } from "@/lib/services/menu-content.service";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from "@/constants/contentful-ids.constants";
import LoginFormBlock, { IForm } from "@/components/blocks/login-form/LoginFormBlock";
import { getCustomerTokenCl } from "@/lib/services/commerce-layer.service";
import { useState } from "react";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";


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

    const [dataModal, setDataModal] = useState<IPromoContent>({
        children: <ModalContent modalMsg="..." />,
        promoIcon: 'loader',
        promoTitle: 'Espere...',
    });

    const onSubmit = async (data) => {
        console.log("formData: ", data);
        try {
            const resp = await getCustomerTokenCl(data);
            if (resp && resp.status === 200) {
                setDataModal({
                    children: <ModalContent modalMsg="Holaaaaaa!" />,
                    promoIcon: 'check',
                    promoTitle: '¡Acceso exitoso a Vanti!',
                    subtitle: '¡Bienvenido al universo de Vanti!',
                });
            } else {
                setDataModal({
                    children: <ModalContent modalMsg={resp.error ?? "Ha ocurrido un error, por favor intente nuevamente."} />,
                    promoIcon: 'cancel',
                    promoTitle: 'Error durante el Login!',
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

    return (
        <>
            <LoginFormBlock {...formData} />
        </>
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

export default Login;