import { classNames } from '@/utils/functions';
import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { dataModal } from "./ModalWarnning.mock";

interface IModal {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}
const ModalWarnning: React.FC<IModal> = ({ open, setOpen }) => {

  function closeModal() {
    setOpen(!open);
  }

  return (
    <>
      <div className={classNames("fixed inset-0  z-[60] items-center justify-center", open ? "flex" : "hidden")}>
        <Transition appear show={open} as={Fragment}>
          <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
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
              <div className="min-h-full  p-4 flex justify-center items-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-[90%] lg:max-w-[60%] relative overflow-hidden gap-5 flex-col flex rounded-2xl bg-white p-6 h-fit shadow-xl transition-all">
                    <button className='absolute right-5 top-2' onClick={closeModal}>x</button>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {dataModal?.title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {dataModal?.description}
                      </p>
                    </div>
                    <div className='relative pb-[56.25%] h-0 overflow-hidden max-w-full'>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={dataModal?.urlVideo}
                        title="Video: Lineas de emergencia"
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        height="400"
                        width="300" />
                    </div>
                    <div className='text-sm text-gray-500 flex flex-col gap-3'>
                      <p>
                        {dataModal?.descriptionFooter.title}
                      </p>
                        <ul className='list-[disclosure-closed] list-inside pl-3'>
                          {dataModal?.descriptionFooter?.listDescription.map((el, i) => (
                            <li key={i}>{el}</li>
                          ))}
                        </ul>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        {dataModal?.button_text}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default ModalWarnning;
