import Image from "next/image";
import Link from "next/link";
import { Tab } from '@headlessui/react';
import { IProductDetails } from "@/lib/interfaces/product-cf.interface";

const VerticalCardBlock: React.FC<IProductDetails> = ({
  productName,
  price,
  description,
  images,
  details,
  paymentMethods,
  features
}) => {
  return (
    <section className="bg-white">
      <div className="grid gap-10 lg:gap-[72px]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-x-[26px]">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col gap-6">
            <Tab.Panels className="w-full">
              {images.map((image) => (
                <Tab.Panel key={`image-preview-${image.title}`}>
                  <figure className="relative aspect-[595/448]">
                    <Image
                      className="block w-auto"
                      src={image.url}
                      alt={image.description}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </figure>
                </Tab.Panel>
              ))}
            </Tab.Panels>

            {/* Image selector */}
            <div className="w-full">
              <Tab.List className="grid grid-cols-4 gap-6">
                {images.map((image) => (
                  <Tab
                    key={`image-selector-${image.title}`}
                    className="relative cursor-pointer bg-white focus:outline-none"
                  >
                    <figure className="relative aspect-[130/107]">
                      <Image
                        className="block w-auto"
                        src={image.url}
                        alt={image.description}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </figure>
                  </Tab>
                ))}
              </Tab.List>
            </div>
          </Tab.Group>

          {/* Product info */}
          <div className="flex flex-col gap-6 lg:pl-[10px]">
            {productName && <h2 className="text-blue-dark">{productName}</h2>}
            {price && <p className="title is-3 text-blue-dark">{price}</p>}
            {description && <p className="text-size-p1 text-grey-30">{description}</p>}

            {details && <div className="divide-y divide-blue-dark">
              {details.map(item => (
                <p className="text-size-p1 text-grey-30 first:border-t border-blue-dark py-3" key={item}>{item}</p>
              ))}
            </div>}

            {paymentMethods && <div className="flex flex-col gap-6">
              <p className="text-size-subtitle1 text-blue-dark">Elige cómo pagar</p>
              <div className="flex gap-4">
                {paymentMethods.map(item => (
                  <div className="flex" key={item.name}>
                    <input className="peer sr-only" type="radio" name="payment" id={item.name} value={item.type} key={item.name} />
                    <label htmlFor={item.name} className="button button-outline cursor-pointer peer-checked:bg-blue-dark peer-checked:text-white peer-checked:cursor-default">{item.name}</label>
                  </div>
                ))}
              </div>
            </div>}

            <div>
              <p className="text-size-p2 text-[#424242]">Lorem ipsum dolor sit amet consectetur.</p>
            </div>

            {paymentMethods && <div className="flex">
              <Link href="#">
                <a className="button button-primary w-full text-center">Compra ahora</a>
              </Link>
            </div>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {features?.main && <div className="grid gap-9 col-span-2">
            <h2 className="text-blue-dark">Características principales</h2>
            <table className="table-auto">
              <tbody>
                {features.main.map(item => (
                  <tr className="odd:bg-neutral-90" key={item.name}>
                    <td className="px-3 py-4 text-grey-30 text-size-subtitle1">{item.name}</td>
                    <td className="px-3 py-4 text-grey-30 text-size-p1">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex">
              <button className="button button-outline">Ver más características</button>
            </div>
          </div>}

          {features?.description && <div className="grid gap-9 mt-6">
            <h2 className="text-blue-dark">Descripción</h2>
            <ul className="pl-4">
              {features.description.map(item => (
                <li className="list-disc" key={item}>{item}</li>
              ))}
            </ul>
          </div>}

          {features?.warranty && <div className="grid gap-9 mt-6">
            <h2 className="text-blue-dark">Garantía</h2>
            <ul className="pl-4">
              {features.warranty.map(item => (
                <li
                  className="list-disc"
                  key={item}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          </div>}
        </div>
      </div>
    </section>
  );
};

export default VerticalCardBlock;
