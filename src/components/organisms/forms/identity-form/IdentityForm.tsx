import React, { createRef, LegacyRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextBox from '@/components/atoms/input/textbox/TextBox';
import { IFormBlock } from "@/lib/interfaces/promo-content-cf.interface";
import Image from 'next/image';
import Icon from '@/components/atoms/icon/Icon';
import { classNames } from '@/utils/functions';

interface IForm {
  qrCode: string;
  identity: string;
}

const schema = yup.object({
  qrCode: yup
    .number()
    .typeError("Dato Requerido: El valor debe ser numérico")
    .positive("Valor no valido, deben ser números positivos")
    .required("Dato Requerido"),
  identity: yup
    .number()
    .typeError("Dato Requerido: El valor debe ser numérico")
    .positive("Valor no valido, deben ser números positivos")
    .required("Dato Requerido"),
});

const IdentityForm: React.FC<IFormBlock> = () => {
  const [isSending, setIsSending] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const refForm: LegacyRef<HTMLFormElement> = createRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const resetAll = () => {
    setShowInfo(false);
    setIsAuthorized(false);
    setIsSending(false);
    reset();
  };

  const onSubmit = (data: IForm) => {
    setIsAuthorized(false);
    setIsSending(true);
    setShowInfo(false);

    fetch('/api/forms', {
      method: 'POST',
      body: JSON.stringify({
        type: "Identidad",
        ...data,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const { result } = json;
        setIsAuthorized(result.isAuthorized);
        setShowInfo(true);
      })
      .catch(err => {
        // if (!navigator.onLine) setErrorMessage("Comprueba tu conexión a internet e intenta de nuevo por favor.");
        // TODO: Show Modal
        console.log(err);
      })
      .finally(() => setIsSending(false));
  };

  return (
    <div className={classNames("grid grid-cols-1 gap-6 md:gap-12", showInfo ? "md:grid-cols-2" : "justify-items-center")}>
      <div className={classNames("relative", !showInfo && "max-w-[50%]")}>
        <form ref={refForm} className="max-w-full flex flex-wrap gap-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <TextBox
              id="identity"
              name="identity"
              label="Ingresa el documento de identidad del técnico sin puntos."
              placeholder="1001010101"
              {...register("identity")}
            />
            {errors.identity && <p className="text-red-600 mt-1">{errors.identity?.message}</p>}
          </div>
          <div className="w-full">
            <TextBox
              id="qrCode"
              name="qrCode"
              label="Ingresa el número de 5 dígitos ubicado debajo del código QR del carné del técnico."
              placeholder="23456"
              {...register("qrCode")}
            />
            {errors.qrCode && <p className="text-red-600 mt-1">{errors.qrCode?.message}</p>}
          </div>

          <div className="w-full flex gap-6">
            {!showInfo && (
              <button type="submit" disabled={isSending} className='w-fit button button-primary'>
                Verificar identidad &gt;
              </button>
            )}
            {showInfo && (
              <button type="button" className='w-fit button button-outline' onClick={resetAll}>
                Verificar otra identidad &gt;
              </button>
            )}
          </div>
        </form>
      </div>

      {!isSending && showInfo && (
        <div className="relative">
          <div className='bg-neutral-90 rounded-xl overflow-hidden'>
            <div className='px-7 py-8 flex gap-6'>
              <div className="flex flex-col gap-6">
                <div className="flex gap-[30px]">
                  <figure className="relative aspect-square shrink-0 w-20">
                    <Image
                      className="w-full h-auto object-cover"
                      alt='Empresa de Contratista'
                      src="https://via.placeholder.com/80.png"
                      width={80}
                      height={80}
                      priority
                    />
                    <figcaption className='text-blue-dark text-sm text-center mt-[10px]'>78537</figcaption>
                  </figure>
                  <p className='title is-2 text-blue-dark'>Pedro Ramirez Rojas</p>
                </div>

                <div className='flex bg-neutral-70 px-5 py-2 rounded-xl'>
                  <p className='text-white text-xl font-semibold'>CC 2893447283</p>
                </div>
              </div>
              <div className="relative w-[214px] shrink-0">
                <figure className="relative aspect-[214/196] w-full">
                  <Image
                    className="w-full h-full object-cover"
                    alt='Empresa de Contratista'
                    src="https://via.placeholder.com/214x196.png"
                    width={214}
                    height={196}
                    priority
                  />
                </figure>
              </div>
            </div>

            {isAuthorized && (
              <div className="px-7 py-3 flex items-center justify-between gap-9 bg-neutral-80 min-h-[100px]">
                <p className='text-2xl leading-7 font-bold text-blue-dark'>Contratista</p>
                <div className="max-w-xs grow flex justify-center">
                  <figure className="relative w-full">
                    <Image
                      className="w-full h-auto object-cover"
                      alt='Empresa de Contratista'
                      src="https://via.placeholder.com/320x71.png"
                      width={320}
                      height={71}
                      priority
                    />
                  </figure>
                </div>
              </div>
            )}
            {!isAuthorized && (<div className="px-7 py-3 flex items-center justify-center gap-9 bg-blue-dark-8 min-h-[100px]">
              <p className='text-2xl leading-7 font-bold text-white'>Técnico NO autorizado</p>
              <span className="w-12 h-12">
                <Icon icon="cancel" className='w-full h-full text-white' />
              </span>
            </div>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentityForm;
