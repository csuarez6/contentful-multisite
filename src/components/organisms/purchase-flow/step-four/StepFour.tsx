import RadioBox from "@/components/atoms/input/radiobox/RadioBox";
import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const StepFour: React.FC<IPromoContent> = ({ promoTitle }) => {

    return (
        <div className="grid grid-cols-3 gap-6 place-items-baseline">
            <HeadingCard
                classes="col-span-2"
                title="4. Elige tu banco"
                icon="pse"
            >
                <div className="bg-white rounded-lg">
                    <form className="max-w-full flex flex-wrap gap-6">
                        <p className="w-full text-grey-30">{promoTitle}</p>
                        <div className="w-full">
                            <RadioBox
                                label="Bancolombia"
                                icon="arrow-right"
                            />
                        </div>
                        <div className="w-full">
                            <RadioBox
                                label="Banco de Occidente"
                                icon="arrow-right"
                            />
                        </div>
                        <div className="w-full">
                            <RadioBox
                                label="Banco Davivienda"
                                icon="arrow-right"
                            />
                        </div>
                    </form>
                </div>
            </HeadingCard>
            <OrderCard
                promoTitle="Detalle de tu pedido"
                subtitle="Productos"
            />
        </div>
    );
};

export default StepFour;
