import Icon from "@/components/atoms/icon/Icon";
import { ModalIntall } from "@/components/blocks/product-details/ProductConfig";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { useState } from "react";
import ModalSuccess from "../modal-success/ModalSuccess";
import { IProductOverviewDetails } from "@/lib/interfaces/product-cf.interface";
import { classNames, formatPrice } from "@/utils/functions";
import WarrantyModal from "../warranty-modal/WarrantyModal";

const ProductServices: React.FC<IProductOverviewDetails> = ({
  warranty,
  onEventHandler,
  _priceGasodomestico,
  showInstallation,
  showWarranty,
  installList,
  warrantyList,
}) => {
  const [isActivedModal, setIsActivedModal] = useState(false);
  const [paramModal, setParamModal] = useState<IPromoContent>();
  const [modalChild, setmodalChild] = useState<any>();
  const [warrantyModal, setWarrantyModal] = useState<boolean>();
  const [installCurrent, setinstallCurrent] = useState<any>();
  const [checked, setChecked] = useState(0);

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
  return (
    <ul className="flex flex-col gap-y-[11px] max-w-[311px]">
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
