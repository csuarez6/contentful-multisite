import { useState } from "react";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";
import { iconCallback } from "@/components/blocks/product-details/ProductConfig";
import {
  IProductOverviewDetails,
  PaymentMethodType,
} from "@/lib/interfaces/product-cf.interface";
import InformationModal from "@/components/organisms/Information-modal/InformationModal";
import { isGasAppliance } from "@/utils/functions";

const ProductActions: React.FC<IProductOverviewDetails> = ({
  sku,
  price,
  productsQuantity,
  marketId,
  callbackURL,
  onBuyHandler,
}) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    icon: "",
    type: "",
    title: "",
  });
  return (
    <>
      <div className="flex flex-row sm:flex-col gap-4 sm:gap-[22px] sm:pt-[5px] sm:my-5">
        {sku &&
        price &&
        productsQuantity &&
        Number(productsQuantity) > 0 &&
        isGasAppliance(marketId) ? (
          <button
            className="button button-primary justify-center w-1/2 sm:w-full text-[13px] sm:text-size-p2"
            type="button"
            onClick={async () => {
              if ( Boolean(await onBuyHandler(PaymentMethodType.pse)) === false ) {
                setError(true);
                setErrorMessage({
                  icon: "alert",
                  type: "warning",
                  title: `No hay unidades disponibles`,
                });
              }
            }}
          >
            Agregar al carro
          </button>
        ) : (
          ""
        )}
        <CustomLink
          linkClassName="button button-outline w-1/2 sm:w-full flex justify-center items-center gap-1 text-[13px] sm:text-size-p2"
          content={{ urlPath: callbackURL }}
        >
          <span className="hidden sm:inline-block">Financiar con Vantilisto</span>
          <span className="inline-block sm:hidden">Con Vantilisto</span>
          <Icon {...iconCallback} />
        </CustomLink>
      </div>
      {error && (
        <InformationModal
          icon={errorMessage.icon}
          type={errorMessage.type}
          title={errorMessage.title}
          close={() => setError(false)}
        />
      )}
    </>
  );
};

export default ProductActions;
