import Image from "next/image";
import { IPromoCard } from "@/lib/interfaces/promo-content-cf.interface";

const VerticalCard: React.FC<IPromoCard> = ({
  title,
  description,
  image,
}) => {
  return (
    <article className="bg-white shadow rounded-xl overflow-hidden">
      {image && (
        <div className="w-full relative aspect-[1280/392]">
          <Image
            src={image.url}
            alt={image.title}
            className="h-full w-full object-cover"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      {(title || description) && (
        <div className="flex items-center w-full px-3 py-8 md:pl-[52px] md:pr-9 md:py-4">
          <div className="grid space-y-3">
            <h3 className="title is-2 text-blue-dark pb-6">{title}</h3>
            <p className="text-grey-60 pb-3">{description}</p>
            <div className="flex gap-3">
              <a className="button button-primary" href="#">
                Button
              </a>
              <a className="button button-outline" href="#">
                Button
              </a>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default VerticalCard;
