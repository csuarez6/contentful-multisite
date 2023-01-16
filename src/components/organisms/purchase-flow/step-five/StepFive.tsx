import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const cta = {
    href: "#",
    name: "Comprar",
    buttonType: "button-primary"
};

const StepFive: React.FC<IPromoContent> = () => {
    return (
        <div className="grid grid-cols-3 gap-6 place-items-baseline">
            <HeadingCard
                classes="col-span-2"
                title="5. Datos de compra"
                icon="quotation"
            >
                <div className="bg-white rounded-lg">
                    <dl className="space-y-5 text-sm">
                        <div className="flex justify-between">
                            <dt className="flex-1 text-grey-30">Cuenta contrato:</dt>
                            <dd className="flex-1 text-grey-30 font-bold">0000000-000</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="flex-1 text-grey-30">Nombre del adquiriente:</dt>
                            <dd className="flex-1 text-grey-30 font-bold">María flores</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="flex-1 text-grey-30">Cédula de ciudadanía:</dt>
                            <dd className="flex-1 text-grey-30 font-bold">1010234567</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="flex-1 text-grey-30">Método de pago:</dt>
                            <dd className="flex-1 text-grey-30 font-bold">PSE</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="flex-1 text-grey-30">Banco seleccionado</dt>
                            <dd className="flex-1 text-grey-30 font-bold">Banco Davivienda</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="flex-1 text-grey-30">Dirección de facturación:</dt>
                            <dd className="flex-1 text-grey-30 font-bold">Carrera 12 D # 13 -23 , Bogot</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-blue-dark">Sabemos que eres un humano, pero debemos confirmarlo.</dt>
                        </div>
                        <div className="flex justify-between">
                            <dt className="">NOTA: Al hacer click en “Enviar datos” serás contactado por un agente de Vanti</dt>
                        </div>
                    </dl>
                </div>
            </HeadingCard>
            <OrderCard
                promoTitle="Detalle de tu pedido"
                subtitle="Productos"
                cta={cta}
            />
        </div>
    );
};

export default StepFive;
