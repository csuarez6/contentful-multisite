import React, { useState } from 'react';
import Textbox from '@/components/atoms/input/textbox/TextBox';
import CheckBox from '@/components/atoms/input/checkbox/CheckBox';
import SelectInput from '@/components/atoms/selectInput/SelectInput';
import { IForm } from './SignUpForm.mocks';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import HeadingCard from '../../cards/heading-card/HeadingCard';
import ModalSuccess from '../../modal-success/ModalSuccess';
import CustomLink from '@/components/atoms/custom-link/CustomLink';
import { customerSchema } from '@/schemas/customer';
import ReCaptchaBox from '@/components/atoms/recaptcha/recaptcha';

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

    const [tokenReCaptcha, setTokenReCaptcha] = useState<string>('');
    const [refreshTokenReCaptcha, setRefreshTokenReCaptcha] = useState(0);
    const { register, handleSubmit, formState: { errors, isValid, isSubmitSuccessful }, reset
    } = useForm<ITemsForm>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        shouldUnregister: true,
        defaultValues
    });

    const onSubmit = (data: ITemsForm) => {
        if (onSubmitForm) onSubmitForm({ ...data, tokenReCaptcha });
        reset();
        setRefreshTokenReCaptcha(refreshTokenReCaptcha + 1);
    };

    const formatToPhone = (event) => {
        if ((event.keyCode < 48 || event.keyCode > 57) &&
            (event.keyCode < 96 || event.keyCode > 105) &&
            event.keyCode !== 190 && event.keyCode !== 110 &&
            event.keyCode !== 8 && event.keyCode !== 9) {
            event.preventDefault();
            return false;
        }
        setTimeout(() => {
            const target = event.target;
            const input = event.target.value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
            const first = input.substring(0, 4);
            const middle = input.substring(4, 6);
            if (input.length > 4) { target.value = `${first}-${middle}`; }
            else if (input.length > 0) { target.value = `${first}`; }
            return true;
        }, 200);
    };

    return (
        <HeadingCard title='Crea tu cuenta vanti' icon='customer-service' isCheck={isValid}>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
                        {...register('name')}
                        isRequired={true}
                    />
                    <Textbox
                        id='lastName'
                        label='Escribe tus apellidos'
                        placeholder='Apellidos'
                        className='form-input'
                        isError={!!errors.lastName}
                        errorMessage={errors?.lastName?.message}
                        autoComplete="on"
                        {...register("lastName")}
                        isRequired={true}
                    />
                    <SelectInput
                        selectOptions={selectOptions}
                        label='Elige el tipo de documento de identidad'
                        id='documentType'
                        isError={!!errors.documentType}
                        errorMessage={errors?.documentType?.message}
                        {...register('documentType')}
                        isRequired={true}
                    />
                    <Textbox
                        id='documentNumber'
                        label='Escribe tu documento de identidad'
                        placeholder='100000000000'
                        className='form-input'
                        isError={!!errors.documentNumber}
                        errorMessage={errors?.documentNumber?.message}
                        autoComplete="on"
                        {...register('documentNumber')}
                        type="number"
                        isRequired={true}
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
                        {...register('email')}
                        isRequired={true}
                    />
                    <Textbox
                        id='cellPhone'
                        label='Escribe tu numero de celular'
                        placeholder='300 000 000'
                        className='form-input'
                        isError={!!errors.cellPhone}
                        errorMessage={errors?.cellPhone?.message}
                        autoComplete="on"
                        {...register("cellPhone")}
                        type="number"
                        isRequired={true}
                    />
                    <Textbox
                        id='password'
                        label='Crea la contraseña'
                        type='password'
                        placeholder='********'
                        className='form-input'
                        autoComplete="on"
                        isError={!!errors.password}
                        errorMessage={errors?.password?.message}
                        {...register("password")}
                        isRequired={true}
                    />
                    <Textbox
                        id='confirmPassword'
                        label='Confirma la contraseña'
                        type='password'
                        placeholder='********'
                        className='form-input'
                        autoComplete="on"
                        isError={!!errors.confirmPassword}
                        errorMessage={errors?.confirmPassword?.message}
                        {...register("confirmPassword")}
                        isRequired={true}
                    />
                </div>
                <div className="flex flex-col">
                    <Textbox
                        id='contractNumber'
                        label='Escribe tu numero de cuenta contrato (lo encuentras en la parte superior izquierda de tu factura)'
                        placeholder='0000-00'
                        className='form-input'
                        isError={!!errors.contractNumber}
                        errorMessage={errors?.contractNumber?.message}
                        autoComplete="on"
                        {...register("contractNumber")}
                        isRequired={true}
                        onKeyDown={(event) => formatToPhone(event)}
                    />
                    <div className='-mt-[6px]'>
                        <CheckBox
                            id='authorize'
                            label={(<p className=''>
                                Autorizo de manera libre, expresa, inequívoca e informada el tratamiento de
                                mis datos personales de acuerdo con lo dispuesto en la Ley 1581/2012 y
                                conforme a la política de tratamiento de datos personales publicada en el
                                <CustomLink
                                    linkClassName='inline-block ml-1'
                                    className='underline'
                                    content={{ internalLink: { urlPath: '/terminos-y-condiciones' } }}
                                >
                                    siguiente link
                                </CustomLink>.
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
                            <button type="submit" disabled={!isValid} className={`button ${cta?.className}`}>
                                {cta?.text}
                            </button>
                        }
                    </div>
                </div>
            </form>
            {isSubmitSuccessful && (<ModalSuccess {...modal} isActive={isSubmitSuccessful} />)}
        </HeadingCard>
    );
};

export default SignUpForm;