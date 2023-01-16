import Image from "next/image";
import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const products = [
    {
        id: 1,
        name: 'Calefactor de torre Cuadrado EM 200cm Tecnocalor SAS',
        quantity: 1,
        price: '$ 450.000',
        image: 'https://via.placeholder.com/64x64.png'
    },
];

const StepOne: React.FC<IPromoContent> = () => {
    return (
        <div className="grid grid-cols-3 gap-6 place-items-baseline">
            <HeadingCard
                classes="col-span-2"
                title="1. Verificar tu compra"
                icon="verify-purchase"
            >
                <div className="flex flex-col sm:-mx-6 md:mx-0">
                    <table className="min-w-full divide-y divide-grey-60">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-blue-dark sm:pl-6 md:pl-0"
                                >
                                    Productos
                                </th>
                                <th
                                    scope="col"
                                    className="hidden py-3.5 px-3 text-center text-sm font-bold text-blue-dark sm:table-cell"
                                >
                                    Cantidad
                                </th>
                                <th
                                    scope="col"
                                    className="hidden py-3.5 px-3 text-right text-sm font-bold text-blue-dark sm:table-cell"
                                >
                                    Precio
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-grey-60">
                                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                        <div className="flex gap-3">
                                            <figure>
                                                <figure className="relative">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        width={64}
                                                        height={64}
                                                        priority
                                                    />
                                                </figure>
                                            </figure>
                                            <div className="text-grey-30">{product.name}</div>
                                        </div>
                                        <div className="mt-0.5 text-blue-dark sm:hidden">
                                            Precio: {product.price}
                                        </div>
                                    </td>
                                    <td className="py-4 px-3 flex justify-center">
                                        <div className="custom-number-input h-9 w-32">
                                            <div className="flex flex-row h-full w-full rounded-lg relative bg-transparent mt-1">
                                                <button data-action="decrement" className="border border-r-0 h-full w-20 rounded-l-3xl cursor-pointer outline-none">
                                                    <span className="m-auto">−</span>
                                                </button>
                                                <input type="text" className="border-y outline-none focus:outline-none text-center w-full text-md md:text-basecursor-default flex items-center" name="custom-input-number" value="0"></input>
                                                <button data-action="increment" className="border border-l-0 h-full w-20 rounded-r-3xl cursor-pointer">
                                                    <span className="m-auto">+</span>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden py-4 pl-3 pr-4 text-right text-sm text-blue-dark sm:pr-6 md:pr-0 sm:table-cell">{product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </HeadingCard>
            <OrderCard
                promoTitle="Detalle de tu pedido"
                subtitle="Productos"
            />
        </div>
    );
};

export default StepOne;
