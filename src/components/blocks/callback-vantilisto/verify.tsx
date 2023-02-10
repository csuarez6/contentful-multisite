import React, { createRef, LegacyRef } from 'react';
import Image from "next/image";

import SelectAtom, { IListContent } from '@/components/atoms/select-atom/SelectAtom';
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { classNames } from "@/utils/functions";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IForm {
  amountOfFees: string;
}

const schema = yup.object({
  amountOfFees: yup.string().required("Dato requerido"),
});

const options: IListContent[] = [
  {
    text: "12 cuotas",
    value: "12"
  },
  {
    text: "24 cuotas",
    value: "24"
  },
  {
    text: "36 cuotas",
    value: "36"
  },
  {
    text: "48 cuotas",
    value: "48"
  }
];

const Verify = ({ handleNext, formData, setFormData, productData, quantity, setQuantity }) => {
  const refForm: LegacyRef<HTMLFormElement> = createRef();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IForm) => {
    setFormData({ ...formData, ...data });
    handleNext();
  };

  return (
    <HeadingCard title="2. Verificar tu compra" isCheck={true} icon="personal-data" classes='mb-44'>
      <div className="bg-white rounded-lg mb-1">
        <form ref={refForm} className="w-full flex flex-wrap gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full flex flex-col divide-y divide-grey-60'>
            <div className="flex flex-nowrap gap-5 pb-[22px]">
              <div className="grow">
                <p className='text-size-subtitle1 text-blue-dark font-bold'>Productos</p>
              </div>
              <div className="w-40 shrink-0 grow-0">
                <p className='text-size-subtitle1 text-blue-dark font-bold text-center'>Cantidad</p>
              </div>
              <div className="w-40 shrink-0 grow-0">
                <p className='text-size-subtitle1 text-blue-dark font-bold text-right'>Precio</p>
              </div>
            </div>
            <div className="flex flex-nowrap gap-5 py-[22px] items-center">
              <div className="grow flex gap-3">
                <figure className="aspect-square w-16 shrink-0">
                  <Image
                    src={productData.promoImage.url}
                    alt={productData.promoImage.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <p className='text-size-p2 text-grey-30'>{productData.productName}</p>
              </div>
              <div className="w-40 shrink-0 grow-0">
                <div className="w-32 custom-number-input h-9 mx-auto">
                  <div className="relative flex flex-row w-full h-full mt-1 bg-transparent rounded-lg">
                    <button
                      type="button"
                      className="w-20 h-full border border-r-0 outline-none cursor-pointer rounded-l-3xl"
                      onClick={() => {
                        if (quantity > 1) setQuantity(quantity - 1);
                      }}
                    >
                      <span className={classNames("m-auto", quantity === 1 && "opacity-25 cursor-not-allowed")}>−</span>
                    </button>
                    <input
                      type="text"
                      className="flex items-center w-full text-center outline-none border-y focus:outline-none text-md md:text-basecursor-default"
                      name="custom-input-number"
                      defaultValue={1}
                      value={quantity}
                    />
                    <button
                      type="button"
                      className="w-20 h-full border border-l-0 cursor-pointer rounded-r-3xl"
                      onClick={() => {
                        if (parseInt(productData.productsQuantity) > quantity) setQuantity(quantity + 1);
                      }}
                    >
                      <span className={classNames("m-auto", parseInt(productData.productsQuantity) === quantity && "opacity-25 cursor-not-allowed")}>+</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-40 shrink-0 grow-0">
                <p className='title is-4 !font-semibold text-blue-dark text-right'>{productData.price}</p>
              </div>
            </div>
            <div className="grid gap-5 py-[22px]">
              <div className="text-size-p1 text-grey-30">
                <p>Elige el número de cuotas a las cuales quieres pagar</p>
              </div>
              <div className="w-full">
                <SelectAtom
                  listedContents={options}
                  placeholder="Selecciona un opción"
                  name="amountOfFees"
                  firstOptionSelected={true}
                  handleChange={(value) => {
                    setValue("amountOfFees", value);
                    clearErrors('amountOfFees');
                  }}
                  {...register("amountOfFees", { required: true, validate: (value) => value !== "" })}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <button type="submit" className="w-fit button button-primary">
              Continuar
            </button>
          </div>
        </form>
      </div>
    </HeadingCard>
  );
};

export default Verify;