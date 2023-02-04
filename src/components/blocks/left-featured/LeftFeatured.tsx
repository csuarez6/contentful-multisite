import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { classNames, getBackgroundColorClass } from "@/utils/functions";

const LeftFeaturedBlock: React.FC<IPromoBlock> = ({
  title,
  pretitle,
  subtitle,
  description,
  image,
  ctaCollection,
  blockId,
  sysId,
  view
}) => {
  const backgroundColor = getBackgroundColorClass(view?.backgroundColor);
  return (
    <section id={blockId ? blockId : sysId} className="section grid gap-7 md:gap-9">
      {title && (
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark">{title}</h2>}
        </div>
      )}

      <article className={classNames("shadow flex flex-col md:flex-row min-h-[400px] rounded-xl overflow-hidden lg:h-[428px]", backgroundColor.background)}>
        {image && (
          <figure className="relative w-full md:w-1/2 xl:w-[630px] shrink-0 grow md:h-full aspect-[328/180] md:aspect-[630/428]">
            <Image src={image.url} alt={image.title} fill className={classNames("object-cover w-full h-full", view?.roundedImage && 'rounded-2xl')} />
          </figure>
        )}
        {(subtitle || pretitle || description) && (
          <div className="flex items-center w-full md:w-1/2 lg:w-full px-3 py-6 md:pl-[45px] md:pr-10 md:py-4 grow">
            <div className="grid space-y-3">
              {pretitle && (
                <p className="text-blue-dark text-xs leading-[1.5] md:text-xl md:leading-[1.2] !font-semibold">
                  {pretitle}
                </p>
              )}
              {subtitle && (
                <h3 className="text-lg md:text-4xl text-blue-dark pb-1">{subtitle}</h3>
              )}
              {description && (
                <div className="text-grey-30 pb-3 text-sm lg:text-lg">
                  {documentToReactComponents(description.json)}
                </div>
              )}

              {ctaCollection?.items?.length > 0 && (
                <div className="flex flex-col md:flex-row gap-3">
                  {ctaCollection.items.map(
                    (cta) =>
                      (cta.externalLink || cta.internalLink) && (
                        <CustomLink
                          content={cta}
                          key={cta.name}
                          className="button button-primary w-full sm:w-auto flex justify-center text-center"
                        >
                          {cta.promoTitle ?? cta.name}
                        </CustomLink>
                      )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </article>
    </section>
  );
};

export default LeftFeaturedBlock;
