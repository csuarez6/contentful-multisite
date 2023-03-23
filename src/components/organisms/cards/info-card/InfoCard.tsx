import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { BLOCKS } from "@contentful/rich-text-types";
import Icon from "@/components/atoms/icon/Icon";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { classNames, getButtonType } from "@/utils/functions";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => {
      return <p>{children}</p>;
    },
    [BLOCKS.HEADING_3]: (_node, children) => {
      return <h3>{children}</h3>;
    },
    [BLOCKS.HEADING_4]:(_node, children) => {
      return <h4 className="font-bold">{children}</h4>;
    },
    [BLOCKS.HR]: () => {
      return <hr  className="my-5 border-lucuma w-1/2"/>;
    },
  },
};

const InfoCard: React.FC<IPromoContent> = (props) => {
  const {
    name,
    promoTitle,
    promoDescription,
    ctaLabel,
    promoIcon,
    externalLink,
    internalLink,
    buttonType,
    backgroundColor,
    showButton,
    mediaInternalLink
  } = props;

  return (
    <article className={
      classNames(
        "p-6 border rounded-xl",
        backgroundColor === "Azul Claro" ? "bg-neutral-90 border-neutral-90" : "bg-white border-neutral-70"
      )
    }>
      <div className="flex flex-col gap-1 h-full">
        {promoIcon && (
          <Icon
            icon={promoIcon}
            className="w-9 h-9 text-blue-dark"
            aria-hidden="true"
          />
        )}
        {promoTitle && (
          <h3 className={backgroundColor === "Azul Claro" ? "text-[#035177]" : "text-black"}>
            {promoTitle}
          </h3>
        )}
        {promoDescription && (
          <div className="text-size-p1 text-grey-30">{documentToReactComponents(promoDescription.json, options)}</div>
        )}
        {(externalLink || internalLink?.urlPath) && showButton && (
          <div className="flex justify-start mt-3">
            <CustomLink content={props} className={classNames("button !rounded-full", getButtonType(buttonType ?? 'Secundario'))} >
              {ctaLabel ? ctaLabel : promoTitle ? promoTitle : name}
            </CustomLink>
          </div>
        )}
        {(externalLink || internalLink?.urlPath || mediaInternalLink) &&
          <div className="flex justify-start mt-3">
            <CustomLink content={props} className={classNames("button !rounded-full", getButtonType(buttonType ?? 'Contorno'))} >
              {ctaLabel ? ctaLabel : promoTitle ? promoTitle : name}
            </CustomLink>
          </div>
        }
      </div>
    </article>
  );
};

export default InfoCard;
