import React, { useState, createRef, LegacyRef } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CheckBox from "@/components/atoms/input/checkbox/CheckBox";
import { ContactText } from "@/components/atoms/terms-n-conditions-text/terms-n-conditions-text";
import ReCaptchaBox from "@/components/atoms/recaptcha/recaptcha";
import HeadingCard from '@/components/organisms/cards/heading-card/HeadingCard';
import CustomModal from "@/components/organisms/custom-modal/CustomModal";

import { useLastPath } from "@/hooks/utils/useLastPath";
import { gaEventForm } from "@/utils/ga-events--forms";

const modalBody = (isSuccess, errorMessage, isSuccessEvent, isFailedEvent) => {
  return (
    <>
      {errorMessage && (
        <div className="mt-2">
          <p>{errorMessage}</p>
        </div>
      )}
      {!errorMessage && (
        <div className="grid mt-2 gap-9">
          {isSuccess
            ? (
              <p className="lg:text-size-p1 text-grey-30">
                En unos minutos te estaremos contactando al número que nos proporcionaste.
                <br /><br />
                Si quieres añadir más productos y servicios a tu compra, puedes pedirlo a nuestros asesores
              </p>
            )
            : (
              <p className="lg:text-size-p1 text-grey-30">
                Si tienes alguna inquietud o petición sobre tu afiliación, escribenos al correo: xxx@grupovanti.com, o comunicate a nuestra línea de WhatsApp 15 416 4164 opción 2 -1.
              </p>
            )
          }
        </div>
      )}

      <div className="mt-4 text-right">
        <button type="button" className="button button-primary" onClick={isSuccess ? isSuccessEvent : isFailedEvent}>
          Aceptar
        </button>
      </div>
    </>
  );
};

interface IForm {
  acceptHD: boolean;
}

const schema = yup.object({
  acceptHD: yup.bool().oneOf([true], "Dato requerido"),
});

const AcceptTerms = ({ formData, productData, setCurrentStep }) => {
  const refForm: LegacyRef<HTMLFormElement> = createRef();
  const lastPath = useLastPath(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenReCaptcha, setTokenReCaptcha] = useState<string>('');
  const [refreshTokenReCaptcha, setRefreshTokenReCaptcha] = useState(0);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const isSuccessEvent = () => {
    location.href = productData.urlProduct;
  };

  const isFailedEvent = () => {
    setCurrentStep(1);
    closeModal();
  };

  const onSubmit = () => {
    setErrorMessage('');
    setIsLoading(true);

    fetch('/api/callback', {
      method: 'POST',
      body: JSON.stringify({
        ...{ type: lastPath.split("?")[0] },
        ...formData,
        tokenReCaptcha
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const { result } = json;
        setIsSuccess(result.success);

        if (result.success) {
          gaEventForm({
            category: "Callback",
            label: "Catálogo VantiListo",
            contractAccount: formData.contractAccount,
            productsList: [{
              product: productData.productName,
              sku: productData.sku
            }]
          });
        }

        if (result.errors > 0 || !result.success) setErrorMessage(result.message);
        else reset();
      })
      .catch(err => {
        setIsSuccess(false);
        if (!navigator.onLine) setErrorMessage("Comprueba tu conexión a internet e intenta de nuevo por favor.");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
        openModal();
        setRefreshTokenReCaptcha(refreshTokenReCaptcha + 1);
      });
  };

  return (
    <HeadingCard title="3. Aceptar términos y condiciones" isCheck={isValid} icon="personal-data">
      <div className="bg-white rounded-lg">
        <div className='flex'>
          <p className='text-size-p1 text-grey-30'>Acepta los términos y condiciones para poder continuar</p>
        </div>

        <form ref={refForm} className="relative flex flex-wrap max-w-full gap-6" onSubmit={handleSubmit(onSubmit)}>
          {isLoading && (
            <div className="absolute inset-0 z-10">
              <div className="absolute inset-0 bg-white bg-opacity-75"></div>
              <div role="status" className="flex items-center justify-center w-full h-60">
                <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin fill-blue-dark" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          <div className="w-full">
            <CheckBox
              id="acceptHD"
              name="acceptHD"
              label={<ContactText />}
              type="checkbox"
              value={true}
              {...register("acceptHD")}
            />
            {errors.acceptHD && <p className="mt-1 text-red-600">{errors.acceptHD?.message}</p>}
          </div>
          <ReCaptchaBox key={refreshTokenReCaptcha} handleChange={setTokenReCaptcha} />

          <div className="w-full">
            <p className='font-medium text-black text-size-p2'>NOTA: Al hacer click en “Enviar datos” serás contactado por un agente de Vanti</p>
          </div>
          <div className="flex justify-end w-full">
            <button type="submit" className='w-fit button button-primary' disabled={isLoading}>
              Enviar datos
            </button>
          </div>
        </form>

        {isOpen && (
          <CustomModal
            close={closeModal}
            icon={isSuccess ? "alert" : "close"}
            title={isSuccess ? "Espera atento nuestra llamada" : "Intenta en otro momento"}
          >
            {modalBody(isSuccess, errorMessage, isSuccessEvent, isFailedEvent)}
          </CustomModal>
        )}
      </div>
    </HeadingCard>
  );
};

export default AcceptTerms;
