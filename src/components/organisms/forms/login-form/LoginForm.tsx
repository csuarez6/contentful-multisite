import React from "react";
import Textbox from "@/components/atoms/input/textbox/TextBox";
import { IForm } from "./LoginForm.mocks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HeadingCard from "../../cards/heading-card/HeadingCard";
import ModalSuccess from "../../modal-success/ModalSuccess";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import "@/styles/forms.css";
import { classNames } from "@/utils/functions";
import Icon from "@/components/atoms/icon/Icon";

export interface ITemsForm {
    email: string;
    password: string;
}
const defaultValues: ITemsForm = {
    email: "",
    password: "",
};

const schema = yup.object({
    email: yup.string()
        .email("Email no válido")
        .required("Dato Requerido"),
    password: yup.string()
        .required("Dato Requerido")
        .min(6, "Minimo 6 caracteres")
});

const LoginForm: React.FC<IForm> = ({ onSubmitForm, cta, modal }) => {

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
        <HeadingCard
            title="Inicia sesión"
            headClasses="w-full !justify-center text-2xl text-blue-dark"
            hideCheck={true}
        >
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-5 gap-x-10">
                    <Textbox
                        id="email"
                        placeholder="correo@correo.com"
                        type="email"
                        label="Escribe tu correo electrónico"
                        className="form-input"
                        isError={!!errors.email}
                        errorMessage={errors?.email?.message}
                        autoComplete="on"
                        {...register("email")}
                    />
                    <Textbox
                        id="password"
                        label="Escribe tu contraseña"
                        type="password"
                        placeholder="********"
                        className="form-input"
                        autoComplete="on"
                        isError={!!errors.password}
                        errorMessage={errors?.password?.message}
                        {...register("password")}
                    />
                </div>
                <div className='self-end mt-[25px] w-full'>
                    {cta &&
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={classNames(
                                "w-full button",
                                cta?.className
                            )}
                        >
                            {cta?.text}
                        </button>
                    }
                </div>
                <div className='self-end w-full'>
                    <CustomLink
                        className="button text-blue-dark text-center block"
                        onClick={(e) => { e.preventDefault(); }}
                        content={{ urlPath: "/" }}
                    >
                        Crear cuenta
                    </CustomLink>
                </div>
            </form>
            {isSubmitSuccessful && (<ModalSuccess {...modal} isActive={isSubmitSuccessful} />)}

            <hr className="border-neutral-80 block mt-6" />

            <div className='w-full flex flex-col gap-2'>
                <CustomLink
                    className="button text-grey-30 flex justify-between"
                    onClick={(e) => { e.preventDefault(); }}
                    content={{ urlPath: "/" }}
                >
                    Recupera tu contraseña
                    <span className="flex text-neutral-30 items-center shrink-0 w-6 h-6">
                        <Icon icon="personal-data" className="w-full h-full" aria-hidden="true" />
                    </span>
                </CustomLink>
                <CustomLink
                    className="button text-grey-30 flex justify-between"
                    onClick={(e) => { e.preventDefault(); }}
                    content={{ urlPath: "/" }}
                >
                    Reporta el robo de tu cuenta
                    <span className="flex text-neutral-30 items-center shrink-0 w-6 h-6">
                        <Icon icon="personal-data" className="w-full h-full" aria-hidden="true" />
                    </span>
                </CustomLink>
            </div>
        </HeadingCard>
    );
};

export default LoginForm;