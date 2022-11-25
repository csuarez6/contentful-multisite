import { IHeader } from "@/lib/interfaces/header-cf.interface";

import { Disclosure } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const HeaderBlock: React.FC<IHeader> = ({ logo, menu, utility }) => {
  return (
    <Disclosure as="header" id="header" className="container mx-auto bg-white">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-4 lg:divide-y lg:divide-gray-200">
            <div className="relative flex items-center min-h-[80px] justify-between">
              <div className="relative z-10 flex px-2 lg:px-0">
                <a href="#" className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto"
                    src={logo}
                    alt="Your Company"
                  />
                </a>
              </div>
              <nav aria-label="Utility">
                <ul className="relative hidden lg:flex lg:flex-nowrap rounded-lg overflow-hidden">
                  {utility.map((item, index) => (
                    <li className="flex" key={item.name}>
                      <a
                        className={classNames(
                          index === 0
                            ? "bg-[#143553] text-white"
                            : "bg-[#eef5fe] text-[#143553]",
                          "hover:bg-[#143553] hover:text-white px-[25px] py-2"
                        )}
                        href={item.href}
                        aria-current={index === 0 ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="relative z-10 flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            <nav
              className="hidden lg:flex lg:items-center lg:justify-between lg:space-x-8 lg:py-2 min-h-[60px]"
              aria-label="Global"
            >
              <ul className="flex gap-11 flex-nowrap">
                {menu.map((item, index) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        index === 0
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                        "rounded-md py-2 px-3 inline-flex items-center text-sm text-center font-medium"
                      )}
                      aria-current={index === 0 ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="relative z-0 flex items-center justify-center px-2">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <Disclosure.Panel
            as="nav"
            className="lg:hidden"
            aria-label="Menu mobile"
          >
            <ul className="space-y-1 px-2 pt-2 pb-3">
              {menu.map((item, index) => (
                <li key={item.name}>
                  <Disclosure.Button
                    as="a"
                    href={item.href}
                    className={classNames(
                      index === 0
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                    aria-current={index === 0 ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </li>
              ))}
              <hr />
              {utility.map((item, index) => (
                <li key={item.name}>
                  <Disclosure.Button
                    as="a"
                    href={item.href}
                    className={classNames(
                      index === 0
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                </li>
              ))}
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default HeaderBlock;
