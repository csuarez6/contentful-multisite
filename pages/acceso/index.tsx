import { GetStaticProps } from "next";
import getPageContent from "@/lib/services/page-content.service";
import { getMenu } from "@/lib/services/menu-content.service";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from "@/constants/contentful-ids.constants";
import LoginFormBlock, { IForm } from "@/components/blocks/login-form/LoginFormBlock";
import { useState } from "react";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';


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
    };

    const [dataModal, setDataModal] = useState<IPromoContent>(modalDefault);

    const onSubmit = async (data) => {
        try {
            setDataModal(modalDefault);
            const destination = router.query.p?.toString() || '/';
            const resp = await signIn("credentials", {
                username: data.email,
                password: data.password,
                redirect: false
            });
            if (resp && resp.ok) {
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