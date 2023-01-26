import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";
import SignUpFormBlock from "@/components/blocks/sigup-form/SignUpFormBlock";
import { IForm } from "@/components/organisms/forms/signup-form/SignUpForm.mocks";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockSidebarInformativeProps } from "@/components/organisms/cards/sidebar-informative/SidebarInformative.mock";
import { useState } from "react";

const ModalContent = ({ modalMsg }) => {
  return (
    <div className="flex flex-col gap-12">
      <p className="text-center">
        {modalMsg}
      </p>
    </div>
  );
};

const SignUp = () => {

  const [dataModal, setDataModal] = useState<IPromoContent>({
    children: <ModalContent modalMsg="..." />,
    promoIcon: 'loader',
    promoTitle: 'Espere...',
  });

  const onSubmit = async (data) => {
    await fetch('api/signup', {
      method: "POST",
      body: JSON.stringify(data)
    }).then(async (response) => {
      console.log("response ", response.status);
      if (response.status === 201) {
        const resp = await response.json();
        console.log("resp ", resp);
        setDataModal({
          children: <ModalContent modalMsg="Registro Exitoso!" />,
          promoIcon: 'check',
          promoTitle: '¡Has creado tu cuenta Vanti!',
          subtitle: '¡Bienvenido al universo de Vanti, más formas de avanzar!',
        });
      } else {
        setDataModal({
          children: <ModalContent modalMsg="Ha ocurrido un error o el usuario ya existe, por favor intente nuevamente." />,
          promoIcon: 'cancel',
          promoTitle: 'Error durante el proceso!',
        });
      }
    }).catch(err => {
      console.log(err);
      setDataModal({
        children: <ModalContent modalMsg="Ha ocurrido un error durante el proceso!" />,
        promoIcon: 'cancel',
        promoTitle: 'Error durante el proceso!',
      });
    });
  };

  const data: IForm = {
    cta: {
      className: 'button-primary',
      text: 'Crear cuenta'
    },
    onSubmitForm: onSubmit,
    modal: dataModal,
    selectOptions: [
      {
        label: 'Seleccione un tipo de documento',
        value: ''
      },
      {
        label: 'Cedula',
        value: 'cedula'
      },
      {
        label: 'Pasaporte',
        value: 'pasaporte'
      },
    ]
  };

  return (
    <>
      <SignUpFormBlock sidebar={mockSidebarInformativeProps.data} form={data} />
    </>
  );
};

SignUp.getInitialProps = () => {
  return {
    layout: {
      name: mockPageLayoutProps.data.name,
      footerInfo: mockPageLayoutProps.data.layout.footerInfo,
      headerInfo: mockPageLayoutProps.data.layout.headerInfo,
    },
  };
};

export default SignUp;