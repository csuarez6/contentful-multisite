import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames, getButtonType } from "@/utils/functions";

const options = {
  renderNode: {
    [BLOCKS.HEADING_3]: (_node, children) => {
      return <h3 className="text-5xl text-blue-dark font-semibold"> {children} </h3>;
    },
    [BLOCKS.HEADING_4]:  (_node, children) => {
      return <h4 className="text-xl text-blue-dark font-semibold"> {children} </h4>;
    }
  },
};

const InformativeGridCard: React.FC<IPromoContent> = (props) => {
  const {
    name,
    promoTitle,
    ctaLabel,
    promoDescription,
    externalLink,
    internalLink,
    buttonType
  } = props;
  return (
    <article className="text-center w-full px-6 py-12">
      {(promoTitle || promoDescription) && (
        <div className="grid gap-8">
          {promoTitle && <h3 className="text-blue-dark">{promoTitle}</h3>}
          {promoDescription && (
            <div className="richtext">
              <div className="text-lg text-grey-30">
                {documentToReactComponents(promoDescription.json, options)}
              </div>
            </div>
          )}
          {(externalLink || internalLink?.urlPaths?.[0]) && (
            <div className="flex justify-center">
              <CustomLink  content={props} className={classNames("button", getButtonType(buttonType ?? 'Texto'))} >
                {ctaLabel ? ctaLabel : promoTitle ? promoTitle : name}
              </CustomLink>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default InformativeGridCard;
