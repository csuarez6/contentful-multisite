import { GetStaticPaths, GetStaticProps } from "next";
import { getHeader, getNavigation } from "@/lib/services/menu-content.service";
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { gaEventForm } from "@/utils/ga-events--forms";

export interface ITemsForm {
  password: string;
  confirmPassword: string;
  tID: string;
  resetT: string;
}

const schema = yup.object({
  password: yup
    .string()
    .required("Dato Requerido")
    .matches(
      //eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Contraseñas debe contener: Min 8 caracteres, Min 1 letra mayúscula, Min 1 letra minúscula, Min 1 número y 1 caracter especial."
    ),
  confirmPassword: yup
    .string()
    .required("Dato Requerido")
    .oneOf([yup.ref("password")], "Contraseñas no coinciden")
    .matches(
      //eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Contraseñas debe contener: Min 8 caracteres, Min 1 letra mayúscula, Min 1 letra minúscula, Min 1 número y 1 caracter especial."
    ),
  tID: yup.string(),
  resetT: yup.string(),
});

const ModalContent = ({ modalMsg = "", statusSubmit = false }) => {
  if (statusSubmit) {
    return (
      <div className="flex flex-col gap-12">
        <p className="text-center">{modalMsg}</p>
        <div className="flex justify-end">
          <CustomLink
            content={{ urlPaths: ["/acceso"] }}
            linkClassName="button button-primary w-[140px] h-[42px]"
          >
            Inicia sesión
          </CustomLink>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-12">
        <p className="text-center">{modalMsg}</p>
      </div>
    );
  }
};

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;

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

  const defaultValues: ITemsForm = {
    password: "",
    confirmPassword: "",
    tID: "",
    resetT: "",
  };

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
      await fetch("/api/customer-password/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
      }).then(async (response) => {
        if (response.status === 201) {
          const resp = await response.json();
          if (resp.status === 200) {
            setDataModal({
              children: <ModalContent statusSubmit={true} />,
              promoIcon: "check",
              promoTitle: "Recuperación Exitosa!",
              subtitle: "Estimado usuario, su contraseña ha sido actualizada!.",
            });
            gaEventForm({
              category: "Password",
              label: "Contraseña recuperada",
            });
            setTimeout(() => {
              router.push("/acceso");
            }, 3000);
          } else {
            setDataModal({
              children: (
                <ModalContent modalMsg="Ha ocurrido un error al actualizar contraseña, por favor intente nuevamente." />
              ),
              promoIcon: "cancel",
              promoTitle: "Error durante el proceso!",
            });
          }
        } else {
          setDataModal({
            children: (
              <ModalContent modalMsg="Ha ocurrido un error al actualizar contraseña, por favor intente nuevamente." />
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

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    `/api/customer-password/check-token-password?token=${token}`,
    fetcher
  );

  return (
    <div className="overflow-hidden">
      <div className="main-container">
        {/* waiting info */}
        {!data && !error && (
          <section className="block w-1/2 py-12 m-auto">
            <HeadingCard
              title="Verificando Link"
              headClasses="w-full !justify-center text-2xl text-blue-dark"
              hideCheck={true}
            >
              <p className="text-xl text-center">
                Espere por favor, comprobando información...
              </p>
            </HeadingCard>
          </section>
        )}
        {/* **************** */}

        {/* error info */}
        {error && (
          <section className="block w-1/2 py-12 m-auto">
            <HeadingCard
              title="Error de servicio"
              headClasses="w-full !justify-center text-2xl text-blue-dark"
              hideCheck={true}
            >
              <p className="text-xl text-center text-red-900">
                Estimado usuario, ha ocurrido un error al comprobar la
                información o el servicio no está disponible. <br />
                <br />
                Intente nuevamente o contacte al administrador.
              </p>
            </HeadingCard>
          </section>
        )}
        {/* **************** */}

        {/* validate link */}
        {data && !data?.isTokenValid && !error && (
          <section className="block w-1/2 py-12 m-auto">
            <HeadingCard
              title="Link Inválido"
              headClasses="w-full !justify-center text-2xl text-blue-dark"
              hideCheck={true}
            >
              <p className="text-xl text-center text-red-900">
                Estimado usuario, este link no es válido!
              </p>
              <div className="flex justify-center mt-5">
                <CustomLink
                  className="block m-auto button button-primary text-grey-30"
                  content={{ urlPaths: ["/forgotpassword"] }}
                >
                  Generar nuevo link
                </CustomLink>
              </div>
            </HeadingCard>
          </section>
        )}
        {/* **************** */}

        {/* form */}
        {data && data?.isTokenValid && (
          <section className="block w-1/2 py-12 m-auto">
            <HeadingCard
              title="Recuperar contraseña"
              headClasses="w-full !justify-center text-2xl text-blue-dark"
              hideCheck={true}
            >
              <div className="py-2 text-center">
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-y-5 gap-x-10">
                    <input
                      type="hidden"
                      id="tID"
                      name="tID"
                      {...register("tID", { value: data.tokenID })}
                    />
                    <input
                      type="hidden"
                      id="resetT"
                      name="resetT"
                      {...register("resetT", { value: data.resetToken })}
                    />
                    <Textbox
                      id="password"
                      label="Nueva contraseña"
                      type="password"
                      placeholder="********"
                      className="form-input"
                      autoComplete="on"
                      isError={!!errors.password}
                      errorMessage={errors?.password?.message}
                      {...register("password")}
                    />
                    <Textbox
                      id="confirmPassword"
                      label="Confirma nueva contraseña"
                      type="password"
                      placeholder="********"
                      className="form-input"
                      autoComplete="on"
                      isError={!!errors.confirmPassword}
                      errorMessage={errors?.confirmPassword?.message}
                      {...register("confirmPassword")}
                    />
                  </div>
                  <div className="self-end w-full">
                    <button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className={classNames(
                        "w-full button button-primary",
                        isSubmitting
                          ? "!opacity-75 !bg-lucuma !text-grey-30"
                          : ""
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
              </div>
            </HeadingCard>
          </section>
        )}
        {/* **************** */}
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [];
  return { paths, fallback: "blocking" };
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {
  const headerInfo = await getHeader(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getNavigation(DEFAULT_FOOTER_ID, context.preview ?? false);
  const helpButton = await getNavigation(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

  return {
    props: {
      layout: {
        name: "Reestablecer contraseña",
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

export default ResetPassword;
