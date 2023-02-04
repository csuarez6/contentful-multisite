import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IPromoBlock, IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { classNames, getButtonType } from "@/utils/functions";

const LeftFeatured: React.FC<IPromoContent & IPromoBlock> = (props) => {
  const {
    name,
    promoImage,
    promoTitle,
    promoDescription,
    internalLink,
    externalLink,
    subtitle,
    title,
    pretitle,
    description,
    image,
    ctaCollection,
    buttonType
  } = props;
  const propsLink = {
    name,
    promoTitle,
    internalLink,
    externalLink
  };
  return (
    <article className="bg-white drop-shadow flex flex-col md:flex-row rounded-xl overflow-hidden lg:min-h-[428px]">
      {(promoImage || image) && (
        <figure className="relative w-full md:w-1/2 xl:w-[630px] shrink-0 grow md:h-full aspect-[328/180] md:aspect-[630/428]">
          <Image
            className="object-cover w-full h-full"
            src={promoImage?.url ? promoImage.url : image.url}
            alt={promoImage?.title ? promoImage.title : image.title}
            fill
          />
        </figure>
      )}
      {(subtitle || pretitle || promoTitle || promoDescription || title || description || ctaCollection) && (
        <div className="flex items-center w-full md:w-1/2 lg:w-full px-3 py-6 md:pl-[45px] md:pr-10 md:py-4 grow">
          <div className="grid space-y-1 md:space-y-3">
            {pretitle && (
              <p className="text-blue-dark text-xs leading-[1.5] md:text-xl md:leading-[1.2] !font-semibold">{pretitle}</p>
            )}
            {(promoTitle || title) && (
              <h3 className="text-lg md:text-4x text-blue-dark pb-3 md:pb-6">{promoTitle ?? title}</h3>
            )}
            {subtitle && (
              <p className=" text-blue-dark title is-4">{subtitle}</p>
            )}
            {(promoDescription || description) && (
              <div className="text-grey-30 pb-3 text-sm lg:text-lg">
                {documentToReactComponents(promoDescription?.json ?? description.json)}
              </div>
            )}
            {(internalLink || externalLink) && (
              <div className="flex gap-3">
                <CustomLink content={propsLink} className={classNames("button", getButtonType(buttonType ?? 'Contorno' ))}>
                  {promoTitle ?? name}
                </CustomLink>
              </div>
            )}
            {ctaCollection?.items?.length > 0 && (
              <div className="flex gap-3">
                {ctaCollection.items.map((cta) => (
                  <CustomLink key={cta.name} content={cta} className={classNames("button w-full sm:w-auto flex justify-center text-center", getButtonType(buttonType ?? 'Contorno' ))}>
                    {cta.promoTitle ?? cta.name}
                  </CustomLink>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default LeftFeatured;
