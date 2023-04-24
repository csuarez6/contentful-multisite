import { GetStaticProps } from "next";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import TextBox from "@/components/atoms/input/textbox/TextBox";
import CheckBox from "@/components/atoms/input/checkbox/CheckBox";

import React, { useState, createRef, LegacyRef } from "react";
import { useLastPath } from "@/hooks/utils/useLastPath";
import CustomModal from "@/components/organisms/custom-modal/CustomModal";
import Breadcrumbs from "@/components/blocks/breadcrumbs-block/Breadcrumbs";
import ReCaptchaBox from "@/components/atoms/recaptcha/recaptcha";

const modalBody = (isSuccess, errorMessage, closeModal) => {
  return (
    <>
      {errorMessage && (
        <div className="mt-2">
          <p>{errorMessage}</p>
        </div>
      )}
      {!errorMessage && (
        <div className="grid mt-2 gap-9">
          {isSuccess ? (
            <p className="lg:text-size-p1 text-grey-30">
              En unos minutos te estaremos contactando.
              <br />
              <br />
              Adquiere más servicios Vanti con nuestros asesores.
            </p>
          ) : (
            <p className="lg:text-size-p1 text-grey-30">
              Si tienes alguna inquietud o petición sobre tu afiliación,
              escribenos al correo: xxx@grupovanti.com, o comunicate a nuestra
              línea de WhatsApp 15 416 4164 opción 2 -1.
            </p>
          )}
        </div>
      )}

      <div className="mt-4 text-right">
        <button
          type="button"
          className="button button-primary"
          onClick={closeModal}
        >
          Aceptar
        </button>
      </div>
    </>
  );
};

interface IForm {
  fullName: string;
  cellPhone: string;
  email: string;
  agreeHD: boolean;
  acceptHD: boolean;
}

const regexCellPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
const schema = yup.object({
  fullName: yup.string().required("Dato requerido"),
  cellPhone: yup.string().required("Dato requerido").matches(regexCellPhone, {
    message:
      "Formatos validos: ### ### #### / (###) ### #### / +## ###-###-#### / +## (###)-###-####",
  }),
  email: yup.string().email("Email no válido").required("Dato requerido"),
  agreeHD: yup.bool().oneOf([true], "Dato requerido"),
  acceptHD: yup.bool().oneOf([true], "Dato requerido"),
});

const CallbackPage = () => {
  const refForm: LegacyRef<HTMLFormElement> = createRef();
  const lastPath = useLastPath();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenReCaptcha, setTokenReCaptcha] = useState<string>('');
  const [refreshTokenReCaptcha, setRefreshTokenReCaptcha] = useState(0);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onSubmit = async (data: IForm) => {
    setErrorMessage("");

    fetch("/api/callback", {
      method: "POST",
      body: JSON.stringify({
        type: lastPath,
        ...data,
        tokenReCaptcha
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const { result } = json;
        setIsSuccess(result.success);

        if (result.errors > 0 || !result.success) setErrorMessage(result.message);
        else reset();
      })
      .catch((err) => {
        setIsSuccess(false);
        if (!navigator.onLine)
          setErrorMessage(
            "Comprueba tu conexión a internet e intenta de nuevo por favor."
          );
        console.warn(err);
      })
      .finally(() => {
        openModal();
        setRefreshTokenReCaptcha(refreshTokenReCaptcha + 1);
      });
  };

  const breadcrumbs = {
    items: [
      {
        promoTitle: "Hogares",
        internalLink: {
          urlPath: "/",
        },
      },
      {
        promoTitle: "Nuevo punto de gas",
        internalLink: {
          urlPath: "/nuevo-punto-de-gas",
        },
      },
      {
        promoTitle: "Te llamamos",
        internalLink: {
          urlPath: "#",
        },
      },
    ],
  };

  return (
    <>
      <div className="overflow-hidden">
        <div className="main-container">
          <Breadcrumbs ctaCollection={breadcrumbs} />
          <section className="section">
            <HeadingCard
              title="1. ¡Comencemos!"
              isCheck={isValid}
              icon="personal-data"
            >
              <div className="bg-white rounded-lg">
                <div className="mb-6">
                  <p className="title is-4 !font-semibold text-grey-30">
                    Cuéntanos sobre ti
                  </p>
                </div>

                <form
                  ref={refForm}
                  className="flex flex-wrap max-w-full gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="w-full">
                    <TextBox
                      id="fullName"
                      name="fullName"
                      label="Escribe tu nombre"
                      placeholder="Nombre completo *"
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-red-600">
                        {errors.fullName?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <TextBox
                      id="cellPhone"
                      name="cellPhone"
                      label="Escribe tu número de celular para poder contactarte"
                      placeholder="300 0000000"
                      {...register("cellPhone")}
                    />
                    {errors.cellPhone && (
                      <p className="mt-1 text-red-600">
                        {errors.cellPhone?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <TextBox
                      id="email"
                      name="email"
                      type="email"
                      label="Escribe tu correo electrónico"
                      placeholder="Correo electrónico *"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-600">{errors.email?.message}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <CheckBox
                      id="agreeHD"
                      name="agreeHD"
                      label="Acepto el tratamiento de datos personales conforme a la política de tratamiento de datos personales"
                      {...register("agreeHD")}
                    />
                    {errors.agreeHD && (
                      <p className="mt-1 text-red-600">{errors.agreeHD?.message}</p>
                    )}

                    <CheckBox
                      id="acceptHD"
                      name="acceptHD"
                      label="Autorizo que me contacten para agendar tu servicio"
                      type="checkbox"
                      value={true}
                      {...register("acceptHD")}
                    />
                    {errors.acceptHD && (
                      <p className="mt-1 text-red-600">
                        {errors.acceptHD?.message}
                      </p>
                    )}
                  </div>
                  <ReCaptchaBox key={refreshTokenReCaptcha} handleChange={setTokenReCaptcha} />

                  <div className="w-full">
                    <p className="font-medium text-black text-size-p2">
                      NOTA: Al hacer click en “Enviar datos” serás contactado por un
                      agente de Vanti
                    </p>
                  </div>
                  <div className="flex justify-end w-full">
                    <button type="submit" className="w-fit button button-primary">
                      Enviar datos
                    </button>
                  </div>
                </form>

                {isOpen && (
                  <CustomModal
                    close={closeModal}
                    icon={isSuccess ? "alert" : "close"}
                    title={
                      isSuccess
                        ? "Espera nuestra llamada"
                        : "Intenta en otro momento"
                    }
                  >
                    {modalBody(isSuccess, errorMessage, closeModal)}
                  </CustomModal>
                )}
              </div>
            </HeadingCard>
          </section>
        </div>
      </div>
    </>
  );
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {
  const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 3);
  const helpButton = await getMenu(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

  return {
    props: {
      layout: {
        name: "Callback Nuevo Punto",
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

export default CallbackPage;
