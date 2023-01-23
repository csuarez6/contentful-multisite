import ListWithIcon from '@/components/organisms/list-with-icons/ListWithIcons';
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { classColumns, classNames, getBackgroundColorClass, getButtonType } from '@/utils/functions';

const ListWithIconBlock: React.FC<IPromoBlock> = ({ title, description, featuredContentsCollection, view, ctaCollection, blockId, sysId }) => {
  const backgroundColor = getBackgroundColorClass(view?.backgroundColor);
  return (
    <section id={blockId? blockId: sysId} className="section grid gap-9">
      {view?.backgroundColor && (
        <div className="absolute inset-0 -mx-[50vw] -z-10">
          <div className={classNames("w-screen h-full mx-auto", backgroundColor.background)}></div>
        </div>
      )}

      {(title || description) && (
        <div className="grid text-center gap-6">
          {title && <h2 className={backgroundColor.title}>{title}</h2>}
          {description && <div className={backgroundColor.text}>{documentToReactComponents(description.json)}</div>}
        </div>
      )}

      {featuredContentsCollection?.items?.length > 0 && (
        <div className={classNames("max-w-sm sm:max-w-none mx-auto grid gap-y-10 gap-x-8", classColumns(view.columnsSize))}>
          {featuredContentsCollection.items.map((item) => (
            <ListWithIcon key={item.promoTitle} {...{ ...item, ...view }} />
          ))}
        </div>
      )}
      {ctaCollection?.items?.length > 0 && (
        <div className="flex justify-center gap-3">
          {ctaCollection.items.map(
            (cta) =>
              (cta.externalLink || cta.internalLink) && (
                <CustomLink
                  content={cta}
                  key={cta.name}
                  className={classNames("button w-fit", getButtonType(view.buttonType))}
                >
                  {cta.promoTitle ?? cta.name}
                </CustomLink>
              )
          )}
        </div>
      )}
    </section>
  );
};

export default ListWithIconBlock;
