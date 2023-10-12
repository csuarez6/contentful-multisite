import React, { LegacyRef, createRef, useEffect, useState } from 'react';
import Textbox from '@/components/atoms/input/textbox/TextBox';
import CheckBox from '@/components/atoms/input/checkbox/CheckBox';
import { IForm } from './SignUpForm.mocks';
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import HeadingCard from '../../cards/heading-card/HeadingCard';
import ModalSuccess from '../../modal-success/ModalSuccess';
import { customerSchema } from '@/schemas/customer';
import ReCaptchaBox from '@/components/atoms/recaptcha/recaptcha';
import SelectAtom from '@/components/atoms/select-atom/SelectAtom';
import { gaEventForm } from '@/utils/ga-events--forms';

export interface ITemsForm {
    name: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    email: string;
    cellPhone: string;
    password: string;
    confirmPassword: string;
    contractNumber: string;
    authorize: boolean;
    notificate: boolean;
    tokenReCaptcha: string;
}
const defaultValues: ITemsForm = {
    name: '',
    lastName: '',
    documentType: '',
    documentNumber: "",
    email: '',
    cellPhone: '',
    password: '',
    confirmPassword: '',
    contractNumber: '',
    authorize: false,
    notificate: false,
    tokenReCaptcha: ''
};

const schema = customerSchema;

const SignUpForm: React.FC<IForm> = ({ onSubmitForm, cta, modal, selectOptions }) => {
    const refForm: LegacyRef<HTMLFormElement> = createRef();
    const [tokenReCaptcha, setTokenReCaptcha] = useState<string>('');
    const [refreshTokenReCaptcha, setRefreshTokenReCaptcha] = useState(0);
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        clearErrors,
        formState: { errors, isValid, submitCount },
        reset,
        control,
        trigger
    } = useForm<ITemsForm>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        shouldUnregister: true,
        defaultValues
    });

    const watchPassword = useWatch({
        control,
        name: "password",
    });

    const onSubmit = (data: ITemsForm) => {
        setActiveModal(false);
        setRefreshTokenReCaptcha(refreshTokenReCaptcha + 1);
        if (onSubmitForm) {
            setActiveModal(true);
            const result = onSubmitForm({ ...data, tokenReCaptcha });
            result.then((result) => {
                if (result) {
                    reset();
                    gaEventForm({
                        category: "SignUpForm",
                        label: "Registro de usuario",
                    });
                }
            }).catch((err) => {
                console.error(err);
            });
        }
    };

    const onError = (errors) => {
        const errorsKey = Object.keys(errors);
        if (errorsKey.length > 0) {
            const errorInput: HTMLElement = refForm.current?.querySelector(`.${errorsKey[0]}`);
            if (errorInput) {
                const header = document.getElementById('header');
                const scrollTop = errorInput.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 16;
                window.requestAnimationFrame(() => window.scrollTo({ top: scrollTop }));
            }
        }
    };

    useEffect(() => {
        const password = getValues("password");
        const confirmPassword = getValues("confirmPassword");
        if (confirmPassword !== "" && password !== confirmPassword) trigger("confirmPassword");
        //eslint-disable-next-line
    }, [watchPassword]);

    return (
        <HeadingCard title='Crea tu cuenta vanti' icon='customer-service' isCheck={isValid}>
            <p className="pb-5 font-bold">
                Todos los campos marcados con <span className='text-red-700'>*</span> son obligatorios.
            </p>
            <form ref={refForm} className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit, onError)}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10'>
                    <ReCaptchaBox key={refreshTokenReCaptcha} handleChange={setTokenReCaptcha} />
                    <Textbox
                        id='name'
                        label='Escribe tu nombre'
                        placeholder='Nombre'
                        className='form-input'
                        isError={!!errors.name}
                        errorMessage={errors?.name?.message}
                        autoComplete="on"
                        isRequired={true}
                        {...register('name')}
                    />
                    <Textbox
                        id='lastName'
                        label='Escribe tus apellidos'
                        placeholder='Apellidos'
                        className='form-input'
                        isError={!!errors.lastName}
                        errorMessage={errors?.lastName?.message}
                        autoComplete="on"
                        isRequired={true}
                        {...register("lastName")}
                    />
                    <SelectAtom
                        id='documentType'
                        labelSelect='Elige el tipo de documento de identidad'
                        firstOptionSelected
                        listedContents={selectOptions}
                        isError={!!errors.documentType}
                        errorMessage={errors?.documentType?.message}
                        isRequired={true}
                        currentValue={getValues("documentType")}
                        handleChange={(value) => {
                            setValue("documentType", value, { shouldValidate: true });
                            clearErrors('documentType');
                        }}
                        {...register('documentType')}
                    />
                    <Textbox
                        id='documentNumber'
                        label='Escribe tu documento de identidad'
                        placeholder='100000000000'
                        className='form-input'
                        isError={!!errors.documentNumber}
                        errorMessage={errors?.documentNumber?.message}
                        autoComplete="on"
                        type="number"
                        isRequired={true}
                        {...register('documentNumber')}
                    />
                    <Textbox
                        id='email'
                        placeholder='correo@correo.com'
                        type='email'
                        label='Escribe tu correo electrónico'
                        className='form-input'
                        isError={!!errors.email}
                        errorMessage={errors?.email?.message}
                        autoComplete="on"
                        isRequired={true}
                        {...register('email')}
                    />
                    <Textbox
                        id='cellPhone'
                        label='Escribe tu número de celular'
                        placeholder='300 000 000'
                        className='form-input'
                        isError={!!errors.cellPhone}
                        errorMessage={errors?.cellPhone?.message}
                        autoComplete="on"
                        type="number"
                        isRequired={true}
                        {...register("cellPhone")}
                    />
                    <Textbox
                        id='password'
                        label='Crea la contraseña'
                        type='password'
                        placeholder='********'
                        className='form-input'
                        autoComplete="off"
                        isError={!!errors.password}
                        errorMessage={errors?.password?.message}
                        isRequired={true}
                        {...register("password")}
                    />
                    <Textbox
                        id='confirmPassword'
                        label='Confirma la contraseña'
                        type='password'
                        placeholder='********'
                        className='form-input'
                        autoComplete="off"
                        isError={!!errors.confirmPassword}
                        errorMessage={errors?.confirmPassword?.message}
                        isRequired={true}
                        {...register("confirmPassword")}
                    />
                </div>
                <div className="flex flex-col">
                    <Textbox
                        id='contractNumber'
                        label='Escribe tu número de cuenta contrato (lo encuentras en la parte superior izquierda de tu factura)'
                        placeholder='00000000'
                        className='form-input'
                        isError={!!errors.contractNumber}
                        errorMessage={errors?.contractNumber?.message}
                        autoComplete="on"
                        type="number"
                        isRequired={true}
                        {...register("contractNumber")}
                    />
                    <div className='-mt-[6px]'>
                        <CheckBox
                            id='authorize'
                            label={(<p className=''>
                                Autorizo de manera libre, expresa, inequívoca e informada el tratamiento de
                                mis datos personales de acuerdo con lo dispuesto en la Ley 1581/2012 y
                                conforme a la política de tratamiento de datos personales publicada en el
                                <a
                                    href="/terminos-y-condiciones"
                                    target="_blank"
                                    className='inline-block ml-1 underline'
                                    rel="noopener noreferrer">
                                    siguiente link.
                                </a>
                                <span className='text-red-700'>*</span>
                            </p>)}
                            isError={!!errors.authorize}
                            errorMessage={errors?.authorize?.message}
                            {...register("authorize")}
                        />
                    </div>
                    <div className='-mt-1'>
                        <CheckBox
                            id='notificate'
                            label='Quiero recibir notificaciones por correo de noticias, actualizaciones y promociones en Vanti.'
                            isError={!!errors.notificate}
                            errorMessage={errors?.notificate?.message}
                            {...register("notificate")}
                        />
                    </div>
                    <div className='self-end mt-[25px]'>
                        {cta &&
                            <button type="submit" disabled={!isValid || Object.keys(errors).length > 0} className={`button ${cta?.className}`}>
                                {cta?.text}
                            </button>
                        }
                    </div>
                </div>
            </form>
            {activeModal && (<ModalSuccess key={submitCount} {...modal} isActive={activeModal} />)}
        </HeadingCard>
    );
};

export default SignUpForm;