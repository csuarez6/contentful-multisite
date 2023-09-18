import Image from "next/image";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";

const SearchCard: React.FC<IPromoContent> = (props) => {
  const {
    name,
    promoTitle,
    promoImage
  } = props;

  return (
    <CustomLink content={props} className="p-6 border rounded-xl bg-white border-neutral-70 group h-full">
      <div className="flex flex-col gap-3 h-full">
        {(promoImage) && (
          <div className="relative aspect-[336/291]">
            <figure className="aspect-[336/291]">
              <Image
                alt={promoImage.title}
                src={promoImage.url}
                width={336}
                height={291}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </figure>
          </div>
        )}
        <h3 className="text-blue-dark-8 group-hover:text-category-blue-dark transition-colors duration-500">
          {promoTitle ?? name}
        </h3>
      </div>
    </CustomLink>
  );
};

export default SearchCard;
