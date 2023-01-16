import Image from "next/image";
import Link from "next/link";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from '../../../../utils/functions';

const productsArray = [
  {
    id: 1,
    name: 'Calefactor de torre Cuadrado EM 200cm Tecnocalor SAS',
    price: '$450.000',
    quantity: 1,
    image: 'https://via.placeholder.com/1120x970.png'
  }
];

const OrderCard: React.FC<IPromoContent> = ({
  promoTitle,
  subtitle,
  cta
}) => {
  return (
    <article className="bg-white rounded-[20px] p-6 shadow-[-2px_-2px_0px_0px_rgb(0,0,0,0.04),2px_2px_4px_0px_rgb(0,0,0,0.08)]">
      <div className="flex flex-col gap-[17px] w-full h-full text-justify">
        {(promoTitle) && (
          <h4 className="text-blue-dark">{promoTitle}</h4>
        )}
        {productsArray && (
          <div className="flex justify-center">
            <figure className={classNames("w-full relative aspect-[214/214]")}>
              <Image
                src={productsArray[0].image}
                alt={productsArray[0].name}
                className="h-full w-full object-cover"
                fill
              />
            </figure>
          </div>
        )}
        <div className="p-5 flex flex-col gap-3">
          {(subtitle) && (
            <p className="text-neutral-20">{subtitle}</p>
          )}
          {productsArray.map((product) => (
            <div className="relative" key={product.id}>
              <div className="grid grid-cols-2">
                <p className="">{product.name}</p>
                <span className="text-center text-blue-dark">{product.price}</span>
              </div>
              <div className="grid grid-cols-2">
                <p>Cantidad</p>
                <span className="text-center text-blue-dark">{product.quantity}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 bg-neutral-90 rounded justify-items-center p-1">
          <p className="font-bold">TOTAL</p>
          <span className="font-bold">$450.000</span>
        </div>
        {(cta) && (
          <div className="p-5">
            <Link href="#" legacyBehavior>
              <a className={`button block text-center ${cta?.buttonType ?? 'button-outline'}`}>{cta.name}</a>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};

export default OrderCard;
