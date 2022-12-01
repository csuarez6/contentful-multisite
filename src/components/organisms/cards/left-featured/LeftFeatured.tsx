import Image from "next/image";
import { IPromoCard } from "@/lib/interfaces/promo-content-cf.interface";

const LeftFeatured: React.FC<IPromoCard> = ({
  title,
  subtitle,
  description,
  url,
  image,
}) => {
  return (
    <article className="bg-white shadow md:flex min-h-[400px] rounded-xl overflow-hidden">
      {image && (
        <div className="w-full md:w-1/2 xl:w-[488px] shrink-0 grow relative">
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            src={image.url}
            alt={image.title}
          />
        </div>
      )}
      {(subtitle || title || description) && (
        <div className="flex items-center w-full md:w-1/2 lg:w-full px-3 py-8 md:pl-[52px] md:pr-9 md:py-4 grow">
          <div className="grid space-y-3">
            {subtitle && (
              <p className=" text-blue-dark title is-4">{subtitle}</p>
            )}
            {title && (
              <h3 className="title is-2 text-blue-dark pb-6">{title}</h3>
            )}
            {description && <p className="text-grey-60 pb-3">{description}</p>}
            {url && (
              <div className="flex gap-3">
                <a className="button button-primary" href={url}>
                  Button
                </a>
                <a className="button button-outline" href={url}>
                  Button
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default LeftFeatured;
