import React, { createRef, LegacyRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextBox from '@/components/atoms/input/textbox/TextBox';
import Icon from "@/components/atoms/icon/Icon";
import { IFormBlock } from "@/lib/interfaces/promo-content-cf.interface";
import RadioBox from '@/components/atoms/input/radiobox/RadioBox';
import CustomModal from "@/components/organisms/custom-modal/CustomModal";
import { classNames } from '@/utils/functions';
import ReCaptchaBox from '@/components/atoms/recaptcha/recaptcha';

interface IForm {
  contractAccount: string;
  cellPhone: string;
  identity: string;
  property: string;
}

const regexCellPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
const schema = yup.object({
  contractAccount: yup.string().required("Dato Requerido"),
  cellPhone: yup.string().required("Dato requerido").matches(regexCellPhone, {
    message: "Formatos validos: ### ### #### / (###) ### #### / +## ###-###-#### / +## (###)-###-####"
  }),
  identity: yup
    .number()
    .typeError("Dato Requerido: El valor debe ser numérico")
    .positive("Valor no valido, deben ser números positivos")
    .required("Dato Requerido")
});

const InquiryForm: React.FC<IFormBlock> = ({ simpleView }) => {
  const isRPO = simpleView === "RPO";
  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenReCaptcha, setTokenReCaptcha] = useState<string>("");
  const [refreshTokenReCaptcha, setRefreshTokenReCaptcha] = useState(0);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
    return formatter.format(price);
  };

  const refForm: LegacyRef<HTMLFormElement> = createRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const resetAll = () => {
    setErrorMessage('');
    setShowInfo(false);
    setResponse(null);
    setIsSending(false);
    reset();
    closeModal();
  };

  const onSubmit = (data: IForm) => {
    setErrorMessage('');
    setResponse(null);
    setIsSending(true);
    setShowInfo(false);

    fetch('/api/forms', {
      method: 'POST',
      body: JSON.stringify({
        type: simpleView,
        tokenReCaptcha,
        ...data,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const { result } = json;
        if (result.success) {
          setResponse(result);
          setShowInfo(true);
        } else {
          setErrorMessage(result.message);
          openModal();
        }
      })
      .catch(err => {
        if (!navigator.onLine) setErrorMessage("Comprueba tu conexión a internet e intenta de nuevo por favor.");
        else if (err?.message) setErrorMessage(err.message);
        else setErrorMessage("Ocurrió un error inesperado, intenta de nuevo por favor.");

        openModal();
        console.error(err);
      })
      .finally(() => {
        setIsSending(false);
        setRefreshTokenReCaptcha(refreshTokenReCaptcha + 1);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
      <form ref={refForm} className="max-w-full flex flex-wrap gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <label className="block text-lg text-grey-30" htmlFor="contractAccount">
            Escribe el número de tu cuenta contrato*
          </label>
          <TextBox
            id="contractAccount"
            name="contractAccount"
            label="*(Lo encuentras en la parte superior izquierda de tu factura del gas)."
            placeholder="00000-000"
            {...register("contractAccount")}
          />
          {errors.contractAccount && <p className="text-red-600 mt-1">{errors.contractAccount?.message}</p>}
        </div>
        <div className="w-full">
          <TextBox
            id="cellPhone"
            name="cellPhone"
            label="Escribe tu número celular"
            placeholder="300 0000000"
            {...register("cellPhone")}
          />
          {errors.cellPhone && <p className="text-red-600 mt-1">{errors.cellPhone?.message}</p>}
        </div>
        <div className="w-full">
          <TextBox
            id="identity"
            name="identity"
            label="Escribe tu número de cédula"
            placeholder="1001010101"
            {...register("identity")}
          />
          {errors.identity && <p className="text-red-600 mt-1">{errors.identity?.message}</p>}
        </div>
        {!isRPO && (
          <div className="w-full">
            <p className='text-size-p2 font-medium text-neutral-30'>Selecciona tu relación con el predio</p>
            <div className="w-full flex -ml-4">
              <RadioBox name="property" label="Soy el dueño" />
              <RadioBox name="property" label="Soy arrendatario" />
            </div>
          </div>
        )}
        <ReCaptchaBox key={refreshTokenReCaptcha} handleChange={setTokenReCaptcha} />

        <div className="w-full flex gap-6">
          <button type="submit" className='w-fit button button-primary flex items-center gap-1' disabled={isSending}>
            {isRPO ? "Consulta la fecha" : "Consulta tu cupo"}
            <span className='flex items-center w-6 h-6'>
              <Icon icon='arrow-right' className={classNames('w-full h-full text-neutral-30', isSending && "text-opacity-50")} />
            </span>
          </button>
          <button type="button" className='w-fit button button-outline' disabled={isSending} onClick={resetAll}>
            Vuelve atrás
          </button>
        </div>
        <div className="w-full">
          <p className='text-size-p3 text-neutral-20'>Al dar click en consultar aceptas las políticas de financiación y de tratamiento de datos personales.</p>
        </div>
      </form>

      <div className="relative">
        <div className='p-11 bg-neutral-90 rounded-xl'>
          <div className="flex flex-col gap-6">
            <div className='flex gap-6'>
              <span className='flex items-center w-10 h-10'>
                <Icon icon='check-filled' className='w-full h-full' />
              </span>
              <p className='text-[#113455] text-2xl font-bold'>{isRPO ? "Tu Próxima revisión RPO es en" : "Cupo preaprobado"}</p>
            </div>
            <div className="rounded-xl bg-neutral-30 p-3 flex items-center justify-center">
              <p className='text-white title is-1 text-center'>
                {showInfo && response ? (isRPO ? response.date : `${formatPrice(response.quota)}*`) : "-----"}
              </p>
            </div>

            <hr className='rounded-xl border-2 border-category-sky-blue-50 mt-[18px]' />

            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 sm:grid-cols-5">
                <p className='text-size-subtitle1 font-bold text-blue-dark sm:col-span-2'>Nombre del titular</p>
                <p className='text-size-p1 text-blue-dark text-right col-span-3'>
                  {showInfo && response ? response.name : "-----"}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5">
                <p className='text-size-subtitle1 font-bold text-blue-dark sm:col-span-2'>Dirección del predio</p>
                <p className='text-size-p1 text-blue-dark text-right sm:col-span-3'>
                  {showInfo && response?.address ? response.address : "-----"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {!isRPO && (
          <div className='ml-[14px] mt-5'>
            <p className='text-size-p3 text-neutral-20'>*Puedes agrandar tu cupo consultando los términos y condiciones <a href="#" className='underline'>aquí</a></p>
          </div>
        )}

        {isOpen && errorMessage && (
          <CustomModal
            close={resetAll}
            icon="close"
            title="¡Error!"
          >
            <>
              <div className="mt-2">
                <p>{errorMessage}</p>
              </div>

              <div className="mt-4 text-right">
                <button type="button" className="button button-primary" onClick={resetAll}>
                  Aceptar
                </button>
              </div>
            </>
          </CustomModal>
        )}
      </div>
    </div>
  );
};

export default InquiryForm;
