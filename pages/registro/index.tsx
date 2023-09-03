import { GetStaticProps } from "next";
import { getHeader, getNavigation } from "@/lib/services/menu-content.service";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import SignUpFormBlock from "@/components/blocks/sigup-form/SignUpFormBlock";
import { IForm } from "@/components/organisms/forms/signup-form/SignUpForm.mocks";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockSidebarInformativeProps } from "@/components/organisms/cards/sidebar-informative/SidebarInformative.mock";
import { useState } from "react";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Breadcrumbs from "@/components/blocks/breadcrumbs-block/Breadcrumbs";

const ModalContent = ({ modalMsg = "", statusSubmit = false }) => {
  if (statusSubmit) {
    return (
      <div className="flex flex-col gap-12">
        <p className="text-center">
          <strong>
            ¡Te damos la bienvenida al universo de Vanti, <br /> más formas de
            avanzar!
          </strong>
        </p>
        <div className="flex justify-end">
          <CustomLink
            content={{ urlPaths: ["/acceso"] }}
            linkClassName="button button-primary w-[140px] h-[42px]"
          >
            Aceptar
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

const SignUp = () => {
  const modalDefault = {
    children: <ModalContent modalMsg="..." />,
    promoIcon: "loader",
    promoTitle: "Espere...",
  };
  const [dataModal, setDataModal] = useState<IPromoContent>(modalDefault);

  const onSubmit = async (data): Promise<boolean> => {
    let resultBoolean = false;
    setDataModal(modalDefault);
    await fetch("api/signup", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const resp = await response.json();
        let msgError =
          "Ha ocurrido un error o el usuario ya existe, por favor intente nuevamente.";
        if (response.status === 201) {
          setDataModal({
            children: <ModalContent statusSubmit={true} />,
            promoIcon: "check",
            promoTitle: "¡Has creado tu cuenta Vanti!",
            subtitle:
              "Pronto recibirás en el correo electrónico registrado la confirmación de la creación de tu cuenta y los beneficios a los que tienes acceso.",
          });
          resultBoolean = true;
        } else {
          if (
            response.status === 400 &&
            resp.error?.code == "RE_CAPTCHA_ERROR_VALIDATION"
          ) {
            msgError = resp.error.message;
          }
          setDataModal({
            children: <ModalContent modalMsg={msgError} />,
            promoIcon: "cancel",
            promoTitle: "Error durante el proceso!",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setDataModal({
          children: (
            <ModalContent modalMsg="Ha ocurrido un error durante el proceso!" />
          ),
          promoIcon: "cancel",
          promoTitle: "Error durante el proceso!",
        });
      });
    return Promise.resolve(resultBoolean);
  };

  const data: IForm = {
    cta: {
      className: "button-primary",
      text: "Crear cuenta",
    },
    onSubmitForm: onSubmit,
    modal: dataModal,
    selectOptions: [
      {
        text: "Seleccione un tipo de documento",
        value: "",
      },
      {
        text: "Cedula",
        value: "cedula",
      },
      {
        text: "Pasaporte",
        value: "pasaporte",
      },
    ],
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
        promoTitle: "Registrarme",
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
          <SignUpFormBlock
            sidebar={mockSidebarInformativeProps.data}
            form={data}
          />
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
        name: "Registrarme",
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

export default SignUp;
