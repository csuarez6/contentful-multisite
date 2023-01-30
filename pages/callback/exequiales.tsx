import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import HeadingCard from '@/components/organisms/cards/heading-card/HeadingCard';
import CheckBox from '@/components/atoms/input/checkbox/CheckBox';
import SelectAtom, { IListContent } from '@/components/atoms/select-atom/SelectAtom';
import TextBox from '@/components/atoms/input/textbox/TextBox';

import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, createRef, LegacyRef } from 'react';
import Icon from "@/components/atoms/icon/Icon";
import { useLastPath } from "@/hooks/utils/useLastPath";

const FinishModal = ({ isOpen, closeModal, isSuccess }) => (
  <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-[20px] bg-white px-6 py-14 text-center align-middle shadow-xl transition-all">
                <span className="flex items-center w-20 h-20 shrink-0 text-category-sky-blue-50 mx-auto mt-10 mb-6">
                  <Icon icon={isSuccess ? "alert" : "close"} className="w-full h-full" />
                </span>
                <Dialog.Title as="h3" className="text-blue-dark title is-3">
                  {isSuccess ? "Espera nuestra llamada" : "Intenta en otro momento"}
                </Dialog.Title>
                <div className="mt-2">
                  {isSuccess
                    ? (
                      <p className="lg:text-size-p1 text-grey-30">
                        En unos minutos te estaremos contactando.
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

                <div className="mt-4 text-right">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={closeModal}
                  >
                    Aceptar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>
);

interface IForm {
  fullName: string;
  cellPhone: number;
  email: string;
  servicioExequial?: string;
  agreeHD: boolean;
  acceptHD: boolean;
}

const regexCellPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
const schema = yup.object({
  fullName: yup.string().required("Dato requerido"),
  cellPhone: yup.string().required("Dato requerido").matches(regexCellPhone, {
    message: "Formatos validos: ### ### #### / (###) ### #### / +## ###-###-#### / +## (###)-###-####"
  }),
  email: yup.string().email("Email no válido").required("Dato requerido"),
  servicioExequial: yup.string().required("Dato requerido"),
  agreeHD: yup.bool().oneOf([true], "Dato requerido"),
  acceptHD: yup.bool().oneOf([true], "Dato requerido"),
});

const serviciosExequiales: IListContent[] = [
  {
    text: "Plan personas",
    value: "Plan personas"
  },
  {
    text: "Plan mascotas",
    value: "Plan Mascotas"
  }
];

const CallbackPage = () => {
  const refForm: LegacyRef<HTMLFormElement> = createRef();
  const lastPath = useLastPath();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    clearErrors,
    reset
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const dispatchSelectChange = () => {
    const event = new Event('change');
    const allSelect = refForm.current.querySelectorAll('select');
    allSelect.forEach(element => element.dispatchEvent(event));
  };

  const onSubmit = async (data: IForm) => {
    console.log(data);
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
        console.log(json);
        reset();
        dispatchSelectChange();
        setIsSuccess(true);
      })
      .catch(err => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => openModal());
  };

  return (
    <section className="section">
      <HeadingCard title="1. ¡Comencemos!" isCheck={isValid} icon="personal-data">
        <div className="bg-white rounded-lg">
          <div className='mb-6'>
            <p className='title is-4 !font-semibold text-grey-30'>Cuéntanos sobre ti</p>
          </div>

          <form ref={refForm} className="max-w-full flex flex-wrap gap-6" onSubmit={handleSubmit(onSubmit)}>
            {lastPath !== "mantenimiento-y-reparacion" && (
              <div className="w-full">
                <TextBox
                  id="fullName"
                  name="fullName"
                  label="Escribe tu nombre"
                  placeholder="Nombre completo *"
                  {...register("fullName")}
                />
                {errors.fullName && <p className="text-red-600 mt-1">{errors.fullName?.message}</p>}
              </div>
            )}
            <div className="w-full">
              <TextBox
                id="cellPhone"
                name="cellPhone"
                label="Escribe tu número de celular"
                placeholder="Teléfono móvil *"
                {...register("cellPhone")}
              />
              {errors.cellPhone && <p className="text-red-600 mt-1">{errors.cellPhone?.message}</p>}
            </div>
            {lastPath !== "mantenimiento-y-reparacion" && (
              <div className="w-full">
                <TextBox
                  id="email"
                  name="email"
                  type="email"
                  label="Escribe tu correo electrónico"
                  placeholder="Correo electrónico *"
                  {...register("email")}
                />
                {errors.email && <p className="text-red-600 mt-1">{errors.email?.message}</p>}
              </div>
            )}
            {lastPath === "exequiales" && (
              <div className="w-full">
                <SelectAtom
                  labelSelect="Servicio exequial"
                  listedContents={serviciosExequiales}
                  placeholder="Selecciona el servicio"
                  name="servicioExequial"
                  handleChange={(value) => {
                    setValue("servicioExequial", value);
                    clearErrors('servicioExequial');
                  }}
                  {...register("servicioExequial", { required: true, validate: (value) => value !== "" })}
                />
                {errors.servicioExequial?.message && <p className="text-red-600 mt-1">{errors.servicioExequial?.message}</p>}
              </div>
            )}
            <div className="w-full">
              <CheckBox
                id="agreeHD"
                name="agreeHD"
                label="Acepto el tratamiento de datos personales conforme a la política de tratamiento de datos personales"
                {...register("agreeHD")}
              />
              {errors.agreeHD && <p className="text-red-600 mt-1">{errors.agreeHD?.message}</p>}

              {lastPath !== "mantenimiento-y-reparacion" && (
                <>
                  <CheckBox
                    id="acceptHD"
                    name="acceptHD"
                    label="Autorizo que me contacten para agendar tu servicio"
                    type="checkbox"
                    value={true}
                    {...register("acceptHD")}
                  />
                  {errors.acceptHD && <p className="text-red-600 mt-1">{errors.acceptHD?.message}</p>}
                </>
              )}
            </div>
            <div className="w-full">
              <p className='text-size-p2 font-medium text-black'>NOTA: Al hacer click en “Enviar datos” serás contactado por un agente de Vanti</p>
            </div>
            <div className="w-full flex justify-center">
              <button type="submit" className='w-fit button button-primary'>
                Enviar datos
              </button>
            </div>
          </form>

          <FinishModal isOpen={isOpen} closeModal={closeModal} isSuccess={isSuccess} />
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
      name: "Callback Exequiales",
      footerInfo,
      headerInfo,
    },
  };
};

export default CallbackPage;
