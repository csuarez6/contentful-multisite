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

import React, { useState, createRef, LegacyRef } from "react";
import { useLastPath } from "@/hooks/utils/useLastPath";
import CustomModal from "@/components/organisms/custom-modal/CustomModal";
import Icon from "@/components/atoms/icon/Icon";
import Breadcrumbs from "@/components/blocks/breadcrumbs-block/Breadcrumbs";
import ReCaptchaBox from "@/components/atoms/recaptcha/recaptcha";
import CheckBox from "@/components/atoms/input/checkbox/CheckBox";
import { gaEventForm } from "@/utils/ga-events--forms";

const modalBody = (data, isSuccess, errorMessage, closeModal) => {
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
            <>
              <div className="px-[14px] py-3 bg-neutral-90 rounded-[10px] flex gap-3 justify-between items-center text-blue-dark">
                <p className="title is-4 !font-semibold flex gap-3 items-center">
                  <span className="w-12 h-12 shrink-0">
                    <Icon icon="alert" className="w-full h-full" />
                  </span>
                  {data.date}
                </p>
                <p className="title is-3">{data.hour}</p>
              </div>
              <p className="lg:text-size-p1 text-neutral-20">
                En caso de tener inconvenientes con la visita, te contactaremos
                al numero que nos has brindado.
                <br />
                <br />
                ¡Gracias por confiar en Vanti!
              </p>
            </>
          ) : (
            <p className="lg:text-size-p1 text-grey-30">
              Si tienes alguna inquietud o petición sobre tu afiliación,
              escribenos al correo: xxx@grupovanti.com, o comunicate a nuestra
              línea de WhatsApp 15 416 4164 opción 2 -1.
            </p>
          )}
        </div>
      )
      }

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
  contractAccount: boolean;
  date: string;
  hour: string;
  cellPhone: string;
  agreeHD: boolean;
  acceptHD: boolean;
}

const regexCellPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
const regexTime = /^([0-1]?\d|2[0-4]):([0-5]\d)(:[0-5]\d)?$/;
const schema = yup.object({
  contractAccount: yup
    .number()
    .typeError("Dato Requerido: El valor debe ser numérico")
    .positive("Valor no valido, deben ser números positivos")
    .required("Dato Requerido"),
  date: yup
    .date()
    .typeError("El valor debe ser una fecha (mm/dd/yyy)")
    .required("Dato requerido"),
  hour: yup
    .string()
    .matches(regexTime, {
      message: "No es una hora valida",
    })
    .required("Dato requerido"),
  cellPhone: yup.string().required("Dato requerido").matches(regexCellPhone, {
    message:
      "Formatos validos: ### ### #### / (###) ### #### / +## ###-###-#### / +## (###)-###-####",
  }),
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
    getValues,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [hourValue, setHourValue] = useState("");
  const [tokenReCaptcha, setTokenReCaptcha] = useState<string>('');
  const [refreshTokenReCaptcha, setRefreshTokenReCaptcha] = useState(0);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onSubmit = async (data: IForm) => {
    setDateValue("");
    setHourValue("");
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
        console.info(result);
        setIsSuccess(result.success);
        setDateValue(getValues("date"));
        setHourValue(getValues("hour"));

        if (result.success) {
          gaEventForm({
            category: "Callback",
            label: "Reparación Obligatoria Periódica",
            contractAccount: data.contractAccount
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
        promoTitle: "Hogares",
        internalLink: {
          urlPaths: ["/"],
        },
      },
      {
        promoTitle: "RPO",
        internalLink: {
          urlPaths: ["/rpo"],
        },
      },
      {
        promoTitle: "Agenda tu cita",
        internalLink: {
          urlPaths: ["#"],
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
              title="1. Agenda tu cita"
              isCheck={isValid}
              icon="personal-data"
            >
              <div className="bg-white rounded-lg">
                <div className="mb-6">
                  <p className="title is-4 !font-semibold text-grey-30">
                    Completa tus datos para agendar tu cita para la Revisión
                    Periódica Obligatoria
                  </p>
                </div>
                <form
                  ref={refForm}
                  className="flex flex-wrap max-w-full gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="w-full">
                    <label
                      className="block text-lg text-grey-30"
                      htmlFor="contractAccount"
                    >
                      Escribe tu número de cuenta contrato
                    </label>
                    <TextBox
                      id="contractAccount"
                      name="contractAccount"
                      label="(Lo encuentras en la parte superior izquierda de tu factura del gas)"
                      placeholder="00000000"
                      {...register("contractAccount")}
                    />
                    {errors.contractAccount && (
                      <p className="mt-1 text-red-600">
                        {errors.contractAccount?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <TextBox
                      id="date"
                      name="date"
                      type="date"
                      label="Elige la fecha disponible en la cual quieres recibir la visita"
                      placeholder="Fechas disponibles"
                      {...register("date")}
                    />
                    {errors.date && (
                      <p className="mt-1 text-red-600">{errors.date?.message}</p>
                    )}
                  </div>
                  <div className="w-full">
                    <TextBox
                      id="hour"
                      name="hour"
                      type="time"
                      label="Elige la hora disponible para recibir al técnico"
                      placeholder="HH:MM"
                      {...register("hour")}
                    />
                    {errors.hour && (
                      <p className="mt-1 text-red-600">{errors.hour?.message}</p>
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
                      Agendar cita
                    </button>
                  </div>
                </form>

                {isOpen && (
                  <CustomModal
                    close={closeModal}
                    icon={isSuccess ? "alert" : "close"}
                    title={
                      isSuccess
                        ? "¡Has agendado tu cita con éxito!"
                        : "Intenta en otro momento"
                    }
                    subtitle={
                      isSuccess &&
                      "Recuerda tener presente la visita del técnico a la hora y dia que agendaste"
                    }
                  >
                    {modalBody(
                      { date: dateValue, hour: hourValue },
                      isSuccess,
                      errorMessage,
                      closeModal
                    )}
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
        name: "Callback RPO",
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

export default CallbackPage;
