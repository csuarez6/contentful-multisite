import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { attachLinksToRichtextContent } from "@/lib/services/render-blocks.service";
import { IPromoBlock, IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import defaultFormatOptions from "@/lib/richtext/default.formatter";

const RichText: React.FC<IPromoBlock & IPromoContent> = (props) => {
  const { promoTitle, promoDescription, subtitle, sysId, blockId, description, title } = props;
    console.log('description', description);
    
  return (
    <div id={blockId ?? sysId}>
      {(promoTitle || title) && (
        <h3 className="title is-4 pt-1 text-blue-dark text-center">{promoTitle ?? title}</h3>
      )}
        {subtitle && <p className="text-center">{subtitle}</p>}
      {(promoDescription?.json || description?.json) && (
        <div className="text-lg text-grey-30">
          {documentToReactComponents(attachLinksToRichtextContent(description?.json ?? promoDescription?.json, description?.links ?? promoDescription?.links), defaultFormatOptions)}
        </div>
      )}
    </div>
  );
};

export default RichText;
