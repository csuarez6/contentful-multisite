import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import RichtextPage from "../richtext-page/RichtextPage";
import jsonToReactComponents from "@/lib/services/render-blocks.service";

const ContentPageBlock: React.FC<IPromoBlock> = (props) => {
  const {
    title,
    subtitle,
    description,
    blockId,
    sysId,
    featuredContentsCollection,
  } = props;

  return (
    <section id={blockId ?? sysId} className="section grid gap-9">
      {title && <h2 className="text-blue-dark">{title}</h2>}
      {subtitle && <h3 className="text-lg text-grey-30">{subtitle}</h3>}
      {description && (
        <div className="text-lg text-grey-30">
          <RichtextPage {...{ content: description }} />
        </div>
      )}
      {featuredContentsCollection && (
        <div className="grid grid-cols-1">
          {jsonToReactComponents(featuredContentsCollection.items)}
        </div>
      )}
    </section>
  );
};

export default ContentPageBlock;
