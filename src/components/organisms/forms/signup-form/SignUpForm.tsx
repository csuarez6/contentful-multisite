import React from 'react';
import Textbox from '@/components/atoms/input/textbox/TextBox';
import CheckBox from '@/components/atoms/input/checkbox/CheckBox';
import SelectInput from '@/components/atoms/selectInput/SelectInput';
import { IForm } from './SignUpForm.mocks';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import HeadingCard from '../../cards/heading-card/HeadingCard';
import ModalSuccess from '../../modal-success/ModalSuccess';
import CustomLink from '@/components/atoms/custom-link/CustomLink';
import { customerSchema } from '../../../../schemas/customer';
// import "@/styles/forms.css";

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
    notificate: boolean
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
    notificate: false
};

const schema = customerSchema;

const SignUpForm: React.FC<IForm> = ({ onSubmitForm, cta, modal, selectOptions }) => {

    const { register, handleSubmit, formState: { errors, isValid, isSubmitSuccessful }, reset
    } = useForm<ITemsForm>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        shouldUnregister: true,
        defaultValues
    });

    const onSubmit = (data: ITemsForm) => {
        if (onSubmitForm) onSubmitForm(data);
        reset();
    };

    return (
        <HeadingCard title='Crea tu cuenta vanti' icon='customer-service' isCheck={isValid}>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10'>
                    <Textbox
                        id='name'
                        label='Escribe tu nombre'
                        placeholder='Nombre'
                        className='form-input'
                        isError={!!errors.name}
                        errorMessage={errors?.name?.message}
                        autoComplete="on"
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
                        {...register("lastName")}
                    />
                    <SelectInput
                        selectOptions={selectOptions}
                        label='Elige el tipo de documento de identidad'
                        id='documentType'
                        isError={!!errors.documentType}
                        errorMessage={errors?.documentType?.message}
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
                        {...register('documentNumber')}
                        type="number"
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
                    />
                    <div className='-mt-[6px]'>
                        <CheckBox
                            id='authorize'
                            label={(<p>
                                Autorizo el uso de mis datos de acuerdo a
                                la <CustomLink
                                    className='underline text-[#7DBFD3]'
                                    content={{ internalLink: { urlPath: '#' } }}>
                                    Politica de privacidad
                                </CustomLink> y acepto <CustomLink
                                    className='underline text-[#7DBFD3]'
                                    content={{ internalLink: { urlPath: '#' } }}>
                                    los terminos y condiciones</CustomLink> y la autorizacion
                                de <CustomLink className='underline text-[#7DBFD3]' content={{ internalLink: { urlPath: '#' } }}>tratamiento de datos</CustomLink>
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