import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/utils/functions';
import { IPromoContent } from '@/lib/interfaces/promo-content-cf.interface';
import Icon from '@/components/atoms/icon/Icon';
import CustomLink from '@/components/atoms/custom-link/CustomLink';

export interface IModal {
  title?: string,
  subtitle?: string,
  isCentered?: boolean,
  icon?: string,
  children?: React.ReactNode,
  close?: () => void,
  ctaCollection?: {
    items?: IPromoContent[]
  },
  containerClass?: string
}

const CustomModal: React.FC<IModal> = ({
  title,
  subtitle,
  icon,
  containerClass,
  children = null,
  ctaCollection,
  isCentered = true,
  close = () => null
}) => {
  return (
    <Transition appear show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-auto">
          <div className={
            classNames(
              "flex items-center min-h-screen mx-auto",
              containerClass ?? "max-w-lg"
            )
          }>
            <div className="w-full flex justify-center items-center p-2 sm:p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={
                  classNames(
                    "relative transform w-full overflow-hidden rounded-[20px] bg-white p-8 pt-12 align-middle shadow-xl transition-all flex flex-col gap-12 justify-end",
                    isCentered && "text-center"
                  )}
                >
                  <div>
                    <div className="absolute -top-px right-0 pt-4 pr-[22px]">
                      <button
                        type="button"
                        className="rounded-md bg-white text-neutral-30 hover:text-gray-500 focus:outline-none focus:ring-offset-2"
                        onClick={close}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    {icon &&
                      <div className="mx-auto flex items-center justify-center rounded-full mt-10 mb-3">
                        <span className="text-category-sky-blue-50 w-[60px] h-[60px] md:w-20 md:h-20">
                          <Icon icon={icon} className="w-full h-full" />
                        </span>
                      </div>
                    }
                    {(title || subtitle || children) && (
                      <div className="flex flex-col gap-3">
                        {title && (
                          <Dialog.Title as="h3" className="text-blue-dark">
                            {title}
                          </Dialog.Title>
                        )}
                        {subtitle && (
                          <div className='text-grey-30 text-size-p3 md:text-size-p1'>
                            <p>{subtitle}</p>
                          </div>
                        )}
                        {children && (<>{children}</>)}
                      </div>
                    )}
                  </div>
                  {ctaCollection?.items?.length > 0 && (
                    ctaCollection.items.map((item) =>
                      (item.externalLink || item.internalLink?.urlPaths?.[0]) && (
                        <div className="flex justify-center" key={item.name}>
                          <CustomLink content={item} className="w-fit button button-primary">
                            {item.promoTitle ?? item.name}
                          </CustomLink>
                        </div>
                      )
                    )
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomModal;