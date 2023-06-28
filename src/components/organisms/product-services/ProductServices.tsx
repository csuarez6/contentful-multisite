import Icon from "@/components/atoms/icon/Icon";
import { ModalIntall } from "@/components/blocks/product-details/ProductConfig";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { useState, useEffect, useContext, useRef } from "react";
import ModalSuccess from "../modal-success/ModalSuccess";
import { IProductOverviewDetails } from "@/lib/interfaces/product-cf.interface";
import { classNames, formatPrice } from "@/utils/functions";
import WarrantyModal from "../warranty-modal/WarrantyModal";
import CheckoutContext from "@/context/Checkout";

const ProductServices: React.FC<IProductOverviewDetails> = ({
  warranty,
  category,
  onEventHandler,
  _priceGasodomestico,
  copyServices,
}) => {
  const { getSkuList } = useContext(CheckoutContext);
  const [isActivedModal, setIsActivedModal] = useState(false);
  const [paramModal, setParamModal] = useState<IPromoContent>();
  const [modalChild, setmodalChild] = useState<any>();
  const [warrantyModal, setWarrantyModal] = useState<boolean>();
  const defaultInstallList = {
    id: "defInstall1",
    name: "Sin servicio de instalación",
    formatted_price_amount: "$0",
  };
  const defaultWarrantyList = {
    id: "defWarranty1",
    name: "Sin garantía extendida",
    formatted_price_amount: "$0",
  };
  const [installList, setInstallList] = useState<any>([
    { ...defaultInstallList },
  ]);
  const [warrantyList, setWarrantyList] = useState<any>([
    { ...defaultWarrantyList },
  ]);
  const [installCurrent, setinstallCurrent] = useState<any>();
  const [checked, setChecked] = useState(0);
  const contRequestSku = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showWarranty, setShowWarranty] = useState<boolean>();
  const [showInstallation, setShowInstallation] = useState<boolean>();

  const updateInstallCurrent = (value) => {
    setinstallCurrent(value);
  };

  const servicesHandler = async (type: string, params) => {
    onEventHandler(type, params);
    setIsActivedModal(false);
  };

  const openModal = (optionsList?: any) => {
    setParamModal({
      promoTitle: "Instala tu gasodoméstico",
    });
    setmodalChild(
      <ModalIntall
        optionsList={optionsList}
        onEventHandler={servicesHandler}
        installCurrent={installCurrent}
        upInstallCurrent={updateInstallCurrent}
      />
    );

    setmodalChild(
      <ModalIntall
        optionsList={optionsList}
        onEventHandler={servicesHandler}
        installCurrent={installCurrent}
        upInstallCurrent={updateInstallCurrent}
      />
    );

    setIsActivedModal(false);
    setTimeout(() => {
      setIsActivedModal(true);
    }, 200);
  };

  useEffect(() => {
    if (contRequestSku.current > 0) return;
    contRequestSku.current = 1;
    (async () => {
      try {
        if (category.clInstallationReference) {
          const infoSkuInstall = await getSkuList(
            category.clInstallationReference
          );
          if (infoSkuInstall && infoSkuInstall.status == 200) {
            setInstallList([defaultInstallList, ...infoSkuInstall.data]);
          }
        }
        if (category.clWarrantyReference) {
          const infoSkuWarra = await getSkuList(category.clWarrantyReference);
          if (infoSkuWarra && infoSkuWarra.status == 200) {
            setWarrantyList([defaultWarrantyList, ...infoSkuWarra.data]);
          }
        }
      } catch (error) {
        console.error("Error at: ProductService", error);
      }
      setIsLoading(false);
    })();
    setShowWarranty(!!(copyServices.find(i => i.key === 'show.warranty')?.active));
    setShowInstallation(!!(copyServices.find(i => i.key === 'show.installation')?.active));
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);
 
  return (
    <ul className="flex flex-col gap-y-[11px]">
      {/* Start shipping section */}
      {showInstallation && (
        <li className="flex flex-col gap-3">
          <p className="text-size-subtitle1 text-blue-dark">
            Instala tu gasodoméstico
          </p>
          <div className="px-3 py-2">
            <p
              onClick={() => openModal(installList)}
              className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer"
            >
              <span className="flex items-center w-6 h-6 shrink-0">
                <Icon
                  icon="expert"
                  className="flex items-center w-full h-full text-neutral-30"
                />
              </span>
              <span className="text-size-p2 leading-[1.2] text-grey-30 grow">
                Contrata el servicio
              </span>
              <span className="flex items-center w-6 h-6 shrink-0">
                <Icon
                  icon="arrow-right"
                  className="flex items-center w-full h-full text-neutral-30"
                />
              </span>
            </p>
          </div>
        </li>
      )}

      {/* End shipping section */}
      {/* Start Warranty section */}
      {(showWarranty && warranty) && (
        <li className="flex flex-col w-full gap-3">
          <div className="flex items-center justify-between gap-4 text-blue-dark pr-3">
            <p className="text-size-subtitle1 text-blue-dark">
              Garantía extendida
            </p>
            <button
              onClick={() => setWarrantyModal(true)}
              className="align-right"
            >
              <Icon icon="add" className="w-6 h-6" />
            </button>
          </div>
          <div className="gap-2 border-b border-neutral-70">
            {isLoading ? (
              <div
                role="status"
                className="flex items-center justify-center w-full"
              >
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 text-gray-200 animate-spin fill-blue-dark"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                {/* List */}
                <ul
                  className={classNames(
                    "px-3 py-[10px] gap-2 grid",
                    warrantyList.length > 0
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1"
                  )}
                >
                  {warrantyList.length > 0 &&
                    warrantyList.map((item, index) => {
                      return (
                        <li
                          key={item.id}
                          onClick={() => {
                            setChecked(index);
                            onEventHandler("warranty", item);
                          }}
                          className="flex"
                        >
                          <input
                            type="radio"
                            id={`warrantybox-${index}`}
                            name="warrantybox"
                            className="hidden peer"
                            checked={checked === index}
                            readOnly
                          />
                          <label
                            htmlFor={`warrantybox-${index}`}
                            className="inline-flex items-center justify-center w-full p-2 cursor-pointer button button-outline peer-checked:bg-blue-dark peer-checked:text-white"
                          >
                            <div className="flex flex-col text-center">
                              <span className="font-bold text-size-span">
                                {item.name}
                              </span>
                              <span className="text-size-small">
                                {index === 0
                                  ? item.formatted_price_amount
                                  : formatPrice(
                                      (Number(item.price_amount_float) *
                                        Number(_priceGasodomestico)) /
                                        100
                                    )}
                              </span>
                            </div>
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </>
            )}
          </div>
        </li>
      )}
      {/* End warranty section */}
      {isActivedModal && (
        <ModalSuccess {...paramModal} isActive={isActivedModal}>
          {modalChild}
        </ModalSuccess>
      )}
      {warrantyModal && <WarrantyModal close={() => setWarrantyModal(false)} />}
    </ul>
  );
};

export default ProductServices;
