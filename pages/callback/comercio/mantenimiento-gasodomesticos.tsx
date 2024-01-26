import React, { useState, createRef, LegacyRef } from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";

import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import { getHeader, getNavigation } from "@/lib/services/menu-content.service";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import TextBox from "@/components/atoms/input/textbox/TextBox";
import CheckBox from "@/components/atoms/input/checkbox/CheckBox";

import CustomModal from "@/components/organisms/custom-modal/CustomModal";
import Breadcrumbs from "@/components/blocks/breadcrumbs-block/Breadcrumbs";
import ReCaptchaBox from "@/components/atoms/recaptcha/recaptcha";
import { gaEventForm } from "@/utils/ga-events--forms";
import { AuthData } from "@/components/atoms/terms-n-conditions-text/terms-n-conditions-text";
import uuid from "react-uuid";

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
              Si quieres otros productos y servicios, pídelo a nuestros asesores.
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
  cellPhone: string;
  agreeHD: boolean;
}

const regexCellPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
const schema = yup.object({
  cellPhone: yup.string().required("Dato requerido").matches(regexCellPhone, {
    message:
      "Formatos validos: ### ### #### / (###) ### #### / +## ###-###-#### / +## (###)-###-####",
  }),
  agreeHD: yup.bool().oneOf([true], "Dato requerido"),
});

const CallbackPage = () => {
  const router = useRouter();
  const { pathname } = router;
  const typeName = pathname.split('/callback/')?.join('');

  const refForm: LegacyRef<HTMLFormElement> = createRef();
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
    const callbackId = uuid();

    fetch("/api/callback", {
      method: "POST",
      body: JSON.stringify({
        type: typeName,
        ...data,
        callbackId,
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

        if (result.success) {
          gaEventForm({
            category: "Callback",
            label: "Mantenimiento Gasodomésticos - Comercio",
            callbackId
          });
        }

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
        promoTitle: "Comercio",
        internalLink: {
          urlPaths: ["/comercio"],
        },
      },
      {
        promoTitle: "Otros servicios gasodomésticos",
        internalLink: {
          urlPaths: ["/comercio/otros-servicios"],
        },
      },
      {
        promoTitle: "Mantenimiento",
        internalLink: {
          urlPaths: ["/comercio/otros-servicios/mantenimiento"],
        },
      },
      {
        promoTitle: "Te llamamos",
        internalLink: {
          urlPaths: ["#"],
        },
      },
    ],
  };

  return (
    <>
      <div className="overflow-hidden">
        <h1 className="sr-only">Callback Mantenimiento Gasodomésticos - Comercio</h1>
        <div className="main-container">
          <Breadcrumbs ctaCollection={breadcrumbs} />
          <section className="section">
            <HeadingCard
              title="1. Diligencia tus datos para llamarte"
              isCheck={isValid}
              icon="personal-data"
            >
              <div className="bg-white rounded-lg">
                <form
                  ref={refForm}
                  className="flex flex-wrap max-w-full gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="w-full">
                    <TextBox
                      id="cellPhone"
                      name="cellPhone"
                      label="Escribe tu número de celular"
                      placeholder="300 0000000"
                      {...register("cellPhone")}
                    />
                    {errors.cellPhone && (
                      <p className="mt-1 text-red-600">
                        {errors.cellPhone?.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full -mt-6">
                    <CheckBox
                      id="agreeHD"
                      name="agreeHD"
                      label={<AuthData />}
                      {...register("agreeHD")}
                    />
                    {errors.agreeHD && (
                      <p className="mt-1 text-red-600">{errors.agreeHD?.message}</p>
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
  const headerInfo = await getHeader(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getNavigation(DEFAULT_FOOTER_ID, context.preview ?? false);
  const helpButton = await getNavigation(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

  return {
    props: {
      layout: {
        name: "Callback Mantenimiento Gasodomésticos - Comercio",
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

export default CallbackPage;
