import React from 'react';
import { IPromoContent } from '@/lib/interfaces/promo-content-cf.interface';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/atoms/icon/Icon';


const ModalSuccess: React.FC<IPromoContent> = ({
    promoTitle,
    promoIcon,
    children,
    subtitle,
    isActive = true
}) => {
    const [open, setOpen] = useState(isActive);
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-[20px] bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[500px] sm:p-6 flex flex-col justify-end">
                                <div>
                                    <div className="absolute top-[-1px] right-0 hidden pt-4 pr-[22px] sm:block">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white text-neutral-30 hover:text-gray-500 focus:outline-none focus:ring-offset-2"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                                        </button>
                                    </div>
                                    {promoIcon &&
                                        <div className="mx-auto flex items-center justify-center rounded-full">
                                            <Icon icon={promoIcon} size={76} className="text-category-sky-blue-50" />
                                        </div>
                                    }
                                    <div className="mt-3 text-center flex flex-col">
                                        <Dialog.Title as="h3" className="title is-3 text-blue-dark">
                                            {promoTitle}
                                        </Dialog.Title>
                                        <div className='mt-[17px]  text-grey-30 lg:text-lg text-base'>
                                            <p className='!leading-[22px]'>
                                                {subtitle}
                                            </p>
                                        </div>
                                        {children &&
                                            <div className='mt-[17px] text-grey-30 text-lg'>
                                                {children}
                                            </div>
                                        }
                                    </div>
                                </div>
                                {/* <div className="mt-5 sm:mt-[47px] self-end">
                                    <button type="button" className="button button-primary !px-10" onClick={() => setOpen(false)}>
                                        {ctaLabel}
                                    </button>
                                </div> */}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ModalSuccess;