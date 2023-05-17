import Icon from "@/components/atoms/icon/Icon";
import {
  ModalIntall,
  ModalShipping,
} from "@/components/blocks/product-details/ProductConfig";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { useState, useEffect } from "react";
import ModalSuccess from "../modal-success/ModalSuccess";
import { IProductOverviewDetails } from "@/lib/interfaces/product-cf.interface";
import { classNames } from "@/utils/functions";
import WarrantyModal from "../warranty-modal/WarrantyModal";

const ProductServices: React.FC<IProductOverviewDetails> = ({
  warranty,
  category,
}) => {
  console.warn(category);
  const [isActivedModal, setIsActivedModal] = useState(false);
  const [paramModal, setParamModal] = useState<IPromoContent>();
  const [modalChild, setmodalChild] = useState<any>();
  const [warrantyModal, setWarrantyModal] = useState<boolean>();
  const defaultInstallList = {
    id: "defInstall1",
    name: "Sin intalación",
    formatted_price_amount: "$0",
  };
  const defaultWarrantyList = {
    id: "defWarranty1",
    name: "Sin garantia",
    formatted_price_amount: "$0",
  };
  const [installList, setInstallList] = useState<any>([
    { ...defaultInstallList },
  ]);
  const [warrantyList, setWarrantyList] = useState<any>([
    { ...defaultWarrantyList },
  ]);

  const openModal = (service: string, optionsList?: any) => {
    if (service === "shipping") {
      setParamModal({
        promoTitle: "Tipo de envío",
      });
      setmodalChild(<ModalShipping />);
    } else {
      setParamModal({
        promoTitle: "Instala tu gasodoméstico",
      });
      setmodalChild(<ModalIntall optionsList={optionsList} />);
    }
    setmodalChild(
      service === "shipping" ? (
        <ModalShipping />
      ) : (
        <ModalIntall optionsList={optionsList} />
      )
    );
    setIsActivedModal(false);
    setTimeout(() => {
      setIsActivedModal(true);
    }, 200);
  };

  const getSkuList = (filter?: string, type?: string) => {
    fetch("/api/sku-options", {
      method: "POST",
      body: JSON.stringify({
        filter: filter,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 200) {
          switch (type) {
            case "warranty":
              setWarrantyList([defaultWarrantyList, ...json.data]);
              break;
            case "installation":
              setInstallList([defaultInstallList, ...json.data]);
              break;
            default:
              break;
          }
        } else {
          console.error("Error get sku-options");
        }
      });
  };

  useEffect(() => {
    if (category.clInstallationReference) {
      getSkuList(category.clInstallationReference, "installation");
    }
    if (category.clWarrantyReference) {
      getSkuList(category.clWarrantyReference, "warranty");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <ul className="flex flex-col gap-y-[11px]">
      {/* Start shipping section */}
      <li className="flex flex-col gap-3">
        <p className="text-size-subtitle1 text-blue-dark">
          Instala tu gasodoméstico
        </p>
        <div className="px-3 py-2">
          <p
            onClick={() => openModal("install", installList)}
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
      {/* End shipping section */}
      {/* Start shipping section */}
      <li className="flex flex-col gap-3">
        <p className="text-size-subtitle1 text-blue-dark">Tipo de envío</p>
        <div className="px-3 py-2">
          <p
            onClick={() => openModal("shipping")}
            className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer"
          >
            <span className="flex items-center w-6 h-6 shrink-0">
              <Icon
                icon="expert"
                className="flex items-center w-full h-full text-neutral-30"
              />
            </span>
            <span className="text-size-p2 leading-[1.2] text-grey-30 grow">
              Estándar (5 a 10 dias hábiles)
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
      {/* End shipping section */}
      {/* Start Warranty section */}
      {warranty && (
        <li className="flex flex-col w-full gap-3">
          <div className="flex gap-4 text-blue-dark items-center">
            <p className="text-size-subtitle1 w-1 flex-grow">Garantía extendida</p>
            <button onClick={() => setWarrantyModal(true)}>
              <Icon icon="add" className="w-7 h-7" />
            </button>
          </div>
          <div className="px-3 py-[10px] gap-2 border-b border-neutral-70">
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
                    <>
                      <li key={item.id}>
                        <input
                          type="radio"
                          id={`warrantybox-${index}`}
                          name="warrantybox"
                          className="hidden peer"
                          value=""
                          // checked={index === 0}
                          required
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
                              {item.formatted_price_amount}
                            </span>
                          </div>
                        </label>
                      </li>
                    </>
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
