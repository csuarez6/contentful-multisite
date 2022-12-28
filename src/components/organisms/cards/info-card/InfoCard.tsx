import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import Icon from "@/components/atoms/icon/Icon";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const InfoCard: React.FC<IPromoContent> = ({
  promoTitle,
  promoDescription,
  promoIcon,
}) => {
  return (
    <article className="p-6 border border-neutral-70 rounded-xl bg-white">
      <div className="flex flex-col gap-1 h-full">
        {promoIcon && (
          <Icon
            icon={promoIcon}
            className="w-9 h-9 text-blue-dark"
            aria-hidden="true"
          />
        )}
        {promoTitle && (
          <h3 className="text-black">{promoTitle}</h3>
        )}
        {promoDescription && (
          <div className="text-size-p1 text-grey-30">{documentToReactComponents(promoDescription.json)}</div>
        )}
      </div>
    </article>
  );
};

export default InfoCard;
