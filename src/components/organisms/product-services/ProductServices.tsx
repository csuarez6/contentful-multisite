import Icon from "@/components/atoms/icon/Icon";
import { ModalIntall, ModalShipping } from "@/components/blocks/product-details/ProductConfig";
import { COMMERLAYER_MARKET_IDS } from "@/constants/commerceLayer.constants";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { useState } from "react";
import ModalSuccess from "../modal-success/ModalSuccess";
import { IProductOverviewDetails } from "@/lib/interfaces/product-cf.interface";

const ProductServices: React.FC<IProductOverviewDetails> = ({
    marketId,
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

    return <>
        {/* Start shipping section */}
        {marketId &&
            marketId === COMMERLAYER_MARKET_IDS.GASODOMESTICOS && (
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
            )
        }
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
                <li className="flex flex-col gap-3">
                    <p className="text-size-subtitle1 text-blue-dark">
                        Garantía
                    </p>
                    <div className="px-3 pb-2 pt-[10px]">
                        <p
                            // onClick={() => {
                            //     scrollContent("content-warranty");
                            // }}
                            className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer"
                        >
                            <span className="flex items-center w-6 h-6 shrink-0">
                                <Icon
                                    icon="expert"
                                    className="flex items-center w-full h-full text-neutral-30"
                                />
                            </span>
                            <span className="text-size-p2 leading-[1.2] text-grey-30 grow">
                                {warranty.name}
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
            )
        }
        {/* End warranty section */}
        {isActivedModal && (
            <ModalSuccess {...paramModal} isActive={isActivedModal}>
                {modalChild}
            </ModalSuccess>
        )}
    </>;
};

export default ProductServices;
