import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

import CustomLink from "@/components/atoms/custom-link/CustomLink";

const LeftFeatured: React.FC<IPromoContent> = (props) => {
  const {
    name,
    promoImage,
    promoTitle,
    promoDescription,
    internalLink,
    externalLink,
    subtitle,
  } = props;

  return (
    <article className="bg-white shadow md:flex min-h-[400px] rounded-xl overflow-hidden">
      {promoImage && (
        <figure className="w-full md:w-1/2 xl:w-[488px] shrink-0 grow relative">
          <Image
            className="object-cover"
            src={promoImage.url}
            alt={promoImage.title}
            fill
          />
        </figure>
      )}
      {(subtitle || promoTitle || promoDescription) && (
        <div className="flex items-center w-full md:w-1/2 lg:w-full px-3 py-8 md:pl-[52px] md:pr-9 md:py-4 grow">
          <div className="grid space-y-3">
            {subtitle && (
              <p className=" text-blue-dark title is-4">{subtitle}</p>
            )}
            {promoTitle && (
              <h3 className="title is-2 text-blue-dark pb-6">{promoTitle}</h3>
            )}
            {promoDescription && (
              <div className="text-grey-60 pb-3">
                {documentToReactComponents(promoDescription.json)}
              </div>
            )}
            {/* {cta &&
              <div className="flex gap-3">
                <Link href={cta.href}>
                  <a className={`button ${cta.buttonType ?? 'button-outline'}`}>{cta.name}</a>
                </Link>
              </div>
            } */}
            {(internalLink || externalLink) && (
              <div className="flex gap-3">
                <CustomLink content={props} className="button button-outline">
                  {promoTitle ?? name}
                </CustomLink>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default LeftFeatured;
