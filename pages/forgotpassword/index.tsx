import { GetStaticProps } from "next";
import { getMenu } from "@/lib/services/menu-content.service";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import Textbox from "@/components/atoms/input/textbox/TextBox";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { classNames } from "@/utils/functions";
import ModalSuccess from "@/components/organisms/modal-success/ModalSuccess";
import { useEffect, useState } from "react";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import Breadcrumbs from "@/components/blocks/breadcrumbs-block/Breadcrumbs";

export interface ITemsForm {
  email: string;
}
const defaultValues: ITemsForm = {
  email: "",
};

const schema = yup.object({
  email: yup.string().email("Email no válido").required("Dato Requerido"),
});

const ModalContent = ({ modalMsg = "" }) => {
  return (
    <div className="flex flex-col gap-12">
      <p className="text-center">{modalMsg}</p>
    </div>
  );
};

const ForgotPassword = () => {
  const modalDefault = {
    children: <ModalContent modalMsg="..." />,
    promoIcon: "loader",
    promoTitle: "Espere...",
  };
  const [dataModal, setDataModal] = useState<IPromoContent>(modalDefault);
  const [btnSubmitReset, setBtnSubmitReset] = useState<string>(
    "Recuperar contraseña"
  );
  const [activeModal, setActiveModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isSubmitSuccessful,
      isSubmitting,
      submitCount,
    },
    reset,
  } = useForm<ITemsForm>({
    mode: "onChange",
    resolver: yupResolver(schema),
    shouldUnregister: true,
    defaultValues,
  });

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmit = async (data: ITemsForm) => {
    setBtnSubmitReset("Por favor espere...");
    try {
      setDataModal(modalDefault);
      await fetch("api/customer-password/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
      }).then(async (response) => {
        if (response.status === 201) {
          setDataModal({
            children: <ModalContent />,
            promoIcon: "check",
            promoTitle: "Recuperar contraseña",
            subtitle:
              "Estimado usuario, se han enviado las instrucciones a su correo electrónico para recuperar la contraseña.",
          });
        } else {
          setDataModal({
            children: (
              <ModalContent modalMsg="Ha ocurrido un error, por favor intente nuevamente." />
            ),
            promoIcon: "cancel",
            promoTitle: "Error durante el proceso!",
          });
        }
      });
    } catch (error) {
      setDataModal({
        children: (
          <ModalContent modalMsg="Ha ocurrido un error, por favor intente nuevamente." />
        ),
        promoIcon: "cancel",
        promoTitle: "Error durante el proceso - Reset!",
      });
    }
    setActiveModal(true);
    setBtnSubmitReset("Recuperar contraseña");
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
        promoTitle: "Recuperar contraseña",
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
          <section className="block w-1/2 py-12 m-auto">
            <HeadingCard
              title="¿Olvidaste tu contraseña?"
              headClasses="w-full !justify-center text-2xl text-blue-dark"
              hideCheck={true}
            >
              <div className="py-2 text-center">
                <p>
                  Te enviaremos un correo electrónico con instrucciones sobre cómo
                  restablecerlo.
                </p>
              </div>
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-y-5 gap-x-10">
                  <Textbox
                    id="email"
                    placeholder="Ingrese su correo"
                    type="email"
                    className="form-input"
                    isError={!!errors.email}
                    errorMessage={errors?.email?.message}
                    autoComplete="on"
                    {...register("email")}
                  />
                </div>
                <div className="self-end w-full">
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={classNames(
                      "w-full button button-primary",
                      isSubmitting ? "!opacity-75 !bg-lucuma !text-grey-30" : ""
                    )}
                  >
                    {btnSubmitReset}
                  </button>
                </div>
              </form>
              {activeModal && (
                <ModalSuccess
                  key={submitCount}
                  {...dataModal}
                  isActive={activeModal}
                />
              )}
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
  const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 2);
  const helpButton = await getMenu(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

  return {
    props: {
      layout: {
        name: "Recuperar contraseña",
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

export default ForgotPassword;
