import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import HeadingCard from '@/components/organisms/cards/heading-card/HeadingCard';
import TextBox from '@/components/atoms/input/textbox/TextBox';
import CheckBox from "@/components/atoms/input/checkbox/CheckBox";

import React, { useState, createRef, LegacyRef } from 'react';
import { useLastPath } from "@/hooks/utils/useLastPath";
import CustomModal from "@/components/organisms/custom-modal/CustomModal";

const modalBody = (isSuccess, errorMessage, closeModal) => {
  return (
    <>
      {errorMessage && (
        <div className="mt-2">
          <p>{errorMessage}</p>
        </div>
      )}
      {!errorMessage && (
        <div className="mt-2 grid gap-9">
          {isSuccess
            ? (
              <p className="lg:text-size-p1 text-grey-30">
                En unos minutos te estaremos contactando.
                <br /><br />
                Si quieres otros productos y servicios, pídelo a nuestros asesores.
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
        <button type="button" className="button button-primary" onClick={closeModal}>
          Aceptar
        </button>
      </div>
    </>
  );
};

interface IForm {
  cellPhone: string;
  agreeHD: boolean;
}

const regexCellPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
const schema = yup.object({
  cellPhone: yup.string().required("Dato requerido").matches(regexCellPhone, {
    message: "Formatos validos: ### ### #### / (###) ### #### / +## ###-###-#### / +## (###)-###-####"
  }),
  agreeHD: yup.bool().oneOf([true], "Dato requerido")
});

const CallbackPage = () => {
  const refForm: LegacyRef<HTMLFormElement> = createRef();
  const lastPath = useLastPath();
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
  const [errorMessage, setErrorMessage] = useState('');

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onSubmit = async (data: IForm) => {
    setErrorMessage('');

    fetch('/api/callback', {
      method: 'POST',
      body: JSON.stringify({
        type: lastPath,
        ...data,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const { result } = json;
        setIsSuccess(result.success);

        if (result.errors > 0) setErrorMessage(result.message);
        else reset();
      })
      .catch(err => {
        setIsSuccess(false);
        if (!navigator.onLine) setErrorMessage("Comprueba tu conexión a internet e intenta de nuevo por favor.");
        console.log(err);
      })
      .finally(() => openModal());
  };

  return (
    <section className="section">
      <HeadingCard title="1. Diligencia tus datos para llamarte" isCheck={isValid} icon="personal-data">
        <div className="bg-white rounded-lg">
          <form ref={refForm} className="max-w-full flex flex-wrap gap-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <TextBox
                id="cellPhone"
                name="cellPhone"
                label="Escribe tu número de celular"
                placeholder="300 0000000"
                {...register("cellPhone")}
              />
              {errors.cellPhone && <p className="text-red-600 mt-1">{errors.cellPhone?.message}</p>}
            </div>

            <div className="w-full -mt-6">
              <CheckBox
                id="agreeHD"
                name="agreeHD"
                label="Acepto el tratamiento de datos personales conforme a la política de tratamiento de datos personales y autorizo que me contacten para realizar la compra."
                {...register("agreeHD")}
              />
              {errors.agreeHD && <p className="text-red-600 mt-1">{errors.agreeHD?.message}</p>}
            </div>

            <div className="w-full">
              <p className='text-size-p2 font-medium text-black'>NOTA: Al hacer click en “Enviar datos” serás contactado por un agente de Vanti</p>
            </div>
            <div className="w-full flex justify-end">
              <button type="submit" className='w-fit button button-primary'>
                Enviar datos
              </button>
            </div>
          </form>

          {isOpen && (
            <CustomModal
              close={closeModal}
              icon={isSuccess ? "alert" : "close"}
              title={isSuccess ? "Espera nuestra llamada" : "Intenta en otro momento"}
            >
              {modalBody(isSuccess, errorMessage, closeModal)}
            </CustomModal>
          )}
        </div>
      </HeadingCard>
    </section>
  );
};

CallbackPage.getInitialProps = async (context: any) => {
  const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 2);

  return {
    layout: {
      name: "Callback Mantenimiento y Reparación",
      footerInfo,
      headerInfo,
    },
  };
};

export default CallbackPage;
