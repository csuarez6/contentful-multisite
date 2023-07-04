import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import RichtextPage from "../richtext-page/RichtextPage";

const ContentPageBlock: React.FC<IPromoBlock> = (props) => {
  const { title, subtitle, description, blockId, sysId } = props;
  return (
    <section id={blockId ? blockId : sysId} className="section grid gap-9">
      {title && <h2 className="text-blue-dark">{title}</h2>}
      {subtitle && <h3 className="text-lg text-grey-30">{subtitle}</h3>}
      {description && (
        <div className="text-lg text-grey-30">
          <RichtextPage {...{content: description}} />
        </div>
      )}
    </section>
  );
};

export default ContentPageBlock;
