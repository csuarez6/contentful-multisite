import RadioBox from "@/components/atoms/input/radiobox/RadioBox";
import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const StepThree: React.FC<IPromoContent> = ({ }) => {

    return (
        <div className="grid grid-cols-3 gap-6 place-items-baseline">
            <HeadingCard
                classes="col-span-2"
                title="3. Elige el método de pago"
                icon="pay"
            >
                <div className="bg-white rounded-lg">
                    <form className="max-w-full flex flex-wrap gap-6" >
                        <p className="w-full text-grey-30">Elige una de las dos opciones para poder continuar</p>
                        <div className="w-full">
                            <RadioBox
                                label="PSE (Cuenta de ahorros)"
                                name="radioButton"
                            />
                        </div>
                        <div className="w-full">
                            <RadioBox
                                label="PSE (Cuenta de ahorros)"
                                name="radioButton"
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

export default StepThree;
