import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";
import { iconCallback } from "@/components/blocks/product-details/ProductConfig";
import { COMMERLAYER_MARKET_IDS } from "@/constants/commerceLayer.constants";
import { IProductOverviewDetails, PaymentMethodType } from "@/lib/interfaces/product-cf.interface";

const ProductActions: React.FC<IProductOverviewDetails> = ({
    sku,
    price,
    productsQuantity,
    marketId,
    callbackURL,
    onBuyHandler
}) => {
    return (
        <div className="flex flex-row sm:flex-col gap-4 sm:gap-[22px] sm:pt-[5px] sm:my-5">
            {sku &&
                price &&
                productsQuantity &&
                Number(productsQuantity) > 0 &&
                marketId &&
                marketId === COMMERLAYER_MARKET_IDS.GASODOMESTICOS ? (
                <button
                    className="button button-primary justify-center w-1/2 sm:w-full text-[13px] sm:text-size-p2"
                    type="button"
                    onClick={() => onBuyHandler(PaymentMethodType.pse)}
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
                Te llamamos
                <Icon {...iconCallback} />
            </CustomLink>
        </div>
    );
};

export default ProductActions;