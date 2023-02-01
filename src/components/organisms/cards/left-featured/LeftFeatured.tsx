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
    <article className="bg-white drop-shadow md:flex min-h-[400px] rounded-xl overflow-hidden">
      {(promoImage || image) && (
        <figure className="w-full md:w-1/2 xl:w-[488px] shrink-0 grow relative">
          <Image
            className="object-cover"
            src={promoImage?.url ? promoImage.url : image.url}
            alt={promoImage?.title ? promoImage.title : image.title}
            fill
          />
        </figure>
      )}
      {(subtitle || pretitle || promoTitle || promoDescription || title || description || ctaCollection) && (
        <div className="flex items-center w-full md:w-1/2 lg:w-full px-3 py-8 md:pl-[52px] md:pr-9 md:py-4 grow">
          <div className="grid space-y-3">
            {pretitle && (
              <p className=" text-blue-dark title is-4">{pretitle}</p>
            )}
            {(promoTitle || title) && (
              <h3 className="title is-2 text-blue-dark pb-6">{promoTitle ?? title}</h3>
            )}
            {subtitle && (
              <p className=" text-blue-dark title is-4">{subtitle}</p>
            )}
            {(promoDescription || description) && (
              <div className="text-grey-60 pb-3">
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
                  <CustomLink key={cta.name} content={cta} className={classNames("button", getButtonType(buttonType ?? 'Contorno' ))}>
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
