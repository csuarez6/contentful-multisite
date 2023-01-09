import Icon from '@/components/atoms/icon/Icon';
import Link from 'next/link';
import { classNames } from '@/utils/functions';

import { Fragment } from 'react';
import { Popover, Transition } from "@headlessui/react";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import { getUrlPath } from '@/utils/link.utils';

const LinkElement = ({ item, isOpen }) => {
  return (
    <>
      {item.promoIcon && (
        <span className="flex items-center shrink-0 w-6 h-6">
          <Icon icon={item.promoIcon} className="w-full h-full" aria-hidden="true" />
        </span>
      )}
      {item.promoTitle ?? item.name}
      {item.mainNavCollection?.items?.length > 0 && (
        <span className={classNames(
          isOpen ? 'transform rotate-180' : '',
          'flex items-center w-6 h-6 shrink-0 text-blue-dark'
        )}>
          <Icon icon="arrow-down" className="w-full h-full" aria-hidden="true" />
        </span>
      )}
    </>
  );
};

const MegaMenu: React.FC<INavigation> = ({ mainNavCollection }) => {
  if (mainNavCollection.items?.length <= 0) return;

  return (
    <div className="relative hidden lg:block">
      <Popover className="relative bg-white">
        <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true" />
        <div className="relative z-20">
          <div className="mx-auto flex items-center">
            <div className="flex flex-1 items-center py-2 min-h-[60px]">
              <Popover.Group as="nav" className="flex gap-6">
                {mainNavCollection.items.map((item) => (
                  <Popover key={item.sys.id}>
                    {({ open }) => (
                      <>
                        {(!item.internalLink?.slug && !item.externalLink && getUrlPath(item) === "/") && (
                          <Popover.Button
                            className={classNames(
                              open ? 'border-blue-dark' : 'border-transparent',
                              'flex items-center gap-1 pb-1 font-semibold leading-tight text-center border-b text-blue-dark hover:border-blue-dark focus:outline-none'
                            )}
                          >
                            <LinkElement item={item} isOpen={open} />
                          </Popover.Button>
                        )}
                        {(item.internalLink?.slug || item.externalLink || getUrlPath(item) !== "/") && (
                          <Link
                            href={getUrlPath(item)}
                            target={item.externalLink ? '_blank' : '_self'}
                            className={'flex items-center gap-1 pb-1 font-semibold leading-tight text-center border-b border-transparent text-blue-dark hover:border-blue-dark focus:outline-none'}
                          >
                            <LinkElement item={item} isOpen={false} />
                          </Link>
                        )}

                        {item.mainNavCollection?.items?.length > 0 && (
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full mt-px z-10 transform">
                              <div className="bg-white min-w-[100vw] -mx-[50vw] absolute h-full inset-x-0 shadow"></div>
                              <div className="relative flex pt-6 my-6 gap-6">
                                <nav className="grid gap-6 grid-cols-5">
                                  {item.mainNavCollection.items.map((item) => (
                                    <div key={item.name}>
                                      <p className="text-size-subtitle1 font-bold text-blue-dark border-b border-neutral-70 pb-4">
                                        {item.promoTitle ?? item.name}
                                      </p>
                                      <ul role="list" className="flex flex-col gap-5 mt-5">
                                        {item.mainNavCollection.items.map((item) => (
                                          <li key={item.name} className="flow-root">
                                            <Link
                                              href={getUrlPath(item)}
                                              className="flex items-center text-base text-blue-dark hover:text-lucuma-60"
                                            >
                                              <span>{item.promoTitle ?? item.name}</span>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </nav>
                                {/* <div className="py-8 sm:py-12 pl-6 border-l border-neutral-70">
                                <div>
                                  Cards
                                </div>
                              </div> */}
                              </div>
                            </Popover.Panel>
                          </Transition>
                        )}
                      </>
                    )}
                  </Popover>
                ))}
              </Popover.Group>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default MegaMenu;