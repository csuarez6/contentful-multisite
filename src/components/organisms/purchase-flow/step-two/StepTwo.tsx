import CheckBox from "@/components/atoms/input/checkbox/CheckBox";
import TextBox from "@/components/atoms/input/textbox/TextBox";
import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";


const StepTwo: React.FC<IPromoContent> = () => {
    const handleEvent = (data) => {
        console.log("object", data.target.value);
    };

    return (
        <div className="grid grid-cols-3 gap-6 place-items-baseline">
            <HeadingCard
                classes="col-span-2"
                title="2. Ingresar dirección para recibir el pedido"
                icon="location"
            >
                <div className="bg-white rounded-lg">
                    <form className="max-w-full flex flex-wrap gap-6">
                        <div className="w-full">
                            <TextBox
                                id=""
                                name=""
                                label="Diligencia la siguiente información para poder realizar el envío"
                                placeholder="Ciudad"
                                onChange={handleEvent}
                            />
                        </div>
                        <div className="w-full">
                            <TextBox
                                id=""
                                name=""
                                label="Escribe tu municipio"
                                placeholder="municipio"
                            />
                        </div>
                        <div className="w-full">
                            <TextBox
                                id=""
                                name=""
                                label="Escribe tu dirección"
                                placeholder="dirección"
                            />
                        </div>
                        <div className="w-full">
                            <CheckBox
                                id="testCheckboxID"
                                name="testCheckbox"
                                label="Acepto usar la dirección de envió para el proceso de facturación"
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

export default StepTwo;
