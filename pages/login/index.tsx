import { GetStaticProps } from "next";
import getPageContent from "@/lib/services/page-content.service";
import { getMenu } from "@/lib/services/menu-content.service";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from "@/constants/contentful-ids.constants";
import LoginFormBlock, { IForm } from "@/components/blocks/login-form/LoginFormBlock";

const Login = () => {

    const onSubmit = async (data) => {
        console.log(data);
    };

    const formData: IForm = {
        formData: {
            cta: {
                className: 'button-primary',
                text: 'Iniciar sesión'
            },
            onSubmitForm: onSubmit,
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