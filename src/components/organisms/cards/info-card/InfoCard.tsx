import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import Icon from "@/components/atoms/icon/Icon";

const InfoCard: React.FC<IPromoContent> = ({
  title,
  description,
  icon,
}) => {
  return (
    <article className="p-6 border border-neutral-70 rounded-xl bg-white">
      <div className="flex flex-col gap-1 h-full">
        {icon && (
          <Icon
            icon={icon}
            className="w-9 h-9 text-blue-dark"
            aria-hidden="true"
          />
        )}
        {title && (
          <h3 className="text-black">{title}</h3>
        )}
        {description && (
          <div className="text-size-p1 text-grey-30">
            <p>{description}</p>
          </div>
        )}
      </div>
    </article>
  );
};

export default InfoCard;
