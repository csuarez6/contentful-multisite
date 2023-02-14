import { GetStaticProps } from "next";
import getPageContent from "@/lib/services/page-content.service";
import { getMenu } from "@/lib/services/menu-content.service";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from "@/constants/contentful-ids.constants";
import Textbox from "@/components/atoms/input/textbox/TextBox";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { classNames } from "@/utils/functions";
import ModalSuccess from "@/components/organisms/modal-success/ModalSuccess";
import { useState } from "react";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

export interface ITemsForm {
    email: string;
}
const defaultValues: ITemsForm = {
    email: ""
};

const schema = yup.object({
    email: yup.string()
        .email("Email no válido")
        .required("Dato Requerido")
});

const ModalContent = ({ modalMsg = "", statusSubmit = false }) => {
    return (
        <div className="flex flex-col gap-12">
            <p className="text-center">
                {modalMsg}
            </p>
        </div>
    );
};

const ForgotPassword = ({ onSubmitForm, modal }) => {

    const [dataModal, setDataModal] = useState<IPromoContent>({
        children: <ModalContent modalMsg="..." />,
        promoIcon: 'cancel',
        promoTitle: 'Servicio no disponible temporalmente.',
    });

    const { register, handleSubmit, formState: { errors, isValid, isSubmitSuccessful }, reset
    } = useForm<ITemsForm>({
        mode: "onChange",
        resolver: yupResolver(schema),
        shouldUnregister: true,
        defaultValues
    });

    const onSubmit = (data: ITemsForm) => {
        if (onSubmitForm) onSubmitForm(data);
        reset();
    };

    return (
        <section className="block w-1/2 py-12 m-auto">
            <HeadingCard
                title="¿Olvidaste tu contraseña?"
                headClasses="w-full !justify-center text-2xl text-blue-dark"
                hideCheck={true}
            >
                <div className="py-2 text-center">
                    <p>Te enviaremos un correo electrónico con instrucciones sobre cómo restablecerlo.</p>
                </div>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-y-5 gap-x-10">
                        <Textbox
                            id="email"
                            placeholder="Ingrese su correo"
                            type="email"
                            className="form-input"
                            isError={!!errors.email}
                            errorMessage={errors?.email?.message}
                            autoComplete="on"
                            {...register("email")}
                        />
                    </div>
                    <div className='self-end w-full'>
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={classNames(
                                "w-full button button-primary"
                            )}
                        >
                            Recuperar contraseña
                        </button>
                    </div>
                </form>
                {isSubmitSuccessful && (<ModalSuccess {...dataModal} isActive={isSubmitSuccessful} />)}
            </HeadingCard>
        </section>
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