import React from 'react';
import Image from "next/image";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { classNames } from "@/utils/functions";

const Verify = ({ handleNext, productData, quantity, setQuantity }) => {
  return (
    <HeadingCard title="2. Verificar tu compra" isCheck={true} icon="personal-data" classes='mb-44'>
      <div className="bg-white rounded-lg mb-1">
        <div className="w-full flex flex-wrap gap-3">
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
                      data-testid="minus"
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
                      data-testid="plus"
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
          </div>

          <div className="w-full flex justify-end">
            <button onClick={handleNext} data-testid="submit" className="w-fit button button-primary">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </HeadingCard>
  );
};

export default Verify;