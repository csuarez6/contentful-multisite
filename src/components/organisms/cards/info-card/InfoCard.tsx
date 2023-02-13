import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import Icon from "@/components/atoms/icon/Icon";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { classNames, getButtonType } from "@/utils/functions";

const InfoCard: React.FC<IPromoContent> = (props) => {
  const {
    promoTitle,
    promoDescription,
    ctaLabel,
    promoIcon,
    externalLink,
    internalLink,
    buttonType
  } = props;
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
        {(externalLink || internalLink?.urlPath) && (
          <div className="flex justify-start mt-3">
            <CustomLink  content={props} className={classNames("button !rounded-full", getButtonType(buttonType ?? 'Secundario'))} >
              {ctaLabel ? ctaLabel : promoTitle ? promoTitle : name}
            </CustomLink>
          </div>
        )}
      </div>
    </article>
  );
};

export default InfoCard;
