import Icon from "@/components/atoms/icon/Icon";
import { ModalIntall, ModalShipping } from "@/components/blocks/product-details/ProductConfig";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { useState } from "react";
import ModalSuccess from "../modal-success/ModalSuccess";
import { IProductOverviewDetails } from "@/lib/interfaces/product-cf.interface";

const ProductServices: React.FC<IProductOverviewDetails> = ({
    warranty
}) => {

    const [isActivedModal, setIsActivedModal] = useState(false);
    const [paramModal, setParamModal] = useState<IPromoContent>();
    const [modalChild, setmodalChild] = useState<any>();

    const openModal = (service: string) => {
        if (service === "shipping") {
            setParamModal({
                promoTitle: "Tipo de envío",
            });
            setmodalChild(<ModalShipping />);
        } else {
            setParamModal({
                promoTitle: "Instala tu gasodoméstico",
            });
            setmodalChild(<ModalIntall />);
        }
        setmodalChild(service === "shipping" ? <ModalShipping /> : <ModalIntall />);
        setIsActivedModal(false);
        setTimeout(() => {
            setIsActivedModal(true);
        }, 200);
    };

    return (<ul className="flex flex-col gap-y-[11px]">
        {/* Start shipping section */}
        <li className="flex flex-col gap-3">
            <p className="text-size-subtitle1 text-blue-dark">
                Instala tu gasodoméstico
            </p>
            <div className="px-3 py-2">
                <p
                    onClick={() => openModal("install")}
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
            <p className="text-size-subtitle1 text-blue-dark">
                Tipo de envío
            </p>
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
        {
            warranty && (
                <li className="flex flex-col gap-3 w-full">
                    <p className="text-size-subtitle1 text-blue-dark">Garantía extendida</p>
                    <div className="px-3 py-[10px] gap-2 border-b border-neutral-70 grid grid-cols-1 sm:grid-cols-2">
                        {[
                            {
                                label: "1 año",
                                price: "$ 300.000,00"
                            },
                            {
                                label: "2 año",
                                price: "$ 60.000,00"
                            },
                            {
                                label: "3 año",
                                price: "$ 90.000,00"
                            },
                            {
                                label: "Sin garantía",
                                price: "$ 0"
                            }
                        ].map((item, index) => {
                            return (<button className="button button-outline flex flex-col items-center" key={index}>
                                <span className="text-size-span font-bold">{item.label}</span>
                                <span className="text-size-small">{item.price}</span>
                            </button>);
                        })}
                    </div>
                </li>
            )
        }
        {/* End warranty section */}
        {isActivedModal && (
            <ModalSuccess {...paramModal} isActive={isActivedModal}>
                {modalChild}
            </ModalSuccess>
        )}
    </ul>);
};

export default ProductServices;
