import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { attachLinksToRichtextContent } from "@/lib/services/render-blocks.service";
import defaultFormatOptions from "@/lib/richtext/default.formatter";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from "@/utils/functions";
import RichtextPage from "../richtext-page/RichtextPage";

const ContentPageBlock: React.FC<IPromoBlock> = ({
  title,
  subtitle,
  description,
  blockId,
  sysId
}) => {
  return (
    <section id={blockId ? blockId : sysId} className="section grid gap-9">
      {title && <h2 className="text-blue-dark">{title}</h2>}
      {subtitle && <h3 className="text-lg text-grey-30">{subtitle}</h3>}
      {description && (
        <div className="text-lg text-grey-30">
          Aquí irá el contenido de la página dentro del bloque.
          {/* {documentToReactComponents(attachLinksToRichtextContent(description.json, description.links ?? []), defaultFormatOptions)} */}
          {/* <RichtextPage {...{content: description}} /> */}
        </div>
      )}
    </section>
  );
};

export default ContentPageBlock;
