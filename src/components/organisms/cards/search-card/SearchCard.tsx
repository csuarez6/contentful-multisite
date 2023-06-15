import Image from "next/image";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const SearchCard: React.FC<IPromoContent> = (props) => {
  const {
    name,
    promoTitle,
    promoImage,
    urlPaths
  } = props;

  return (
    <a href={urlPaths?.[0] ?? '#'} className="p-6 border rounded-xl bg-white border-neutral-70">
      <div className="flex flex-col gap-3 h-full">
        {(promoImage) && (
          <div className="relative aspect-[336/291]">
            <figure className="aspect-[336/291]">
              <Image
                alt={promoImage.title}
                src={promoImage.url}
                width={336}
                height={291}
                className="w-full h-full object-cover"
              />
            </figure>
          </div>
        )}
        <h3 className="text-blue-dark-8 hover:text-category-blue-dark">
          {promoTitle ?? name}
        </h3>
      </div>
    </a>
  );
};

export default SearchCard;
