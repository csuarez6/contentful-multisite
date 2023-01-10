import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { getUrlPath } from "@/utils/link.utils";

const LeftFeaturedBlock: React.FC<IPromoBlock> = ({ title, pretitle, subtitle, description, image, ctaCollection }) => {
  return (
    <section className="section grid gap-9">
      {title && (
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark">{title}</h2>}
        </div>
      )}

      <article className="bg-white shadow md:flex min-h-[400px] rounded-xl overflow-hidden">
        {image && (
          <figure className="w-full md:w-1/2 xl:w-[488px] shrink-0 grow relative object-cover">
            <Image
              src={image.url}
              alt={image.title}
              fill
            />
          </figure>
        )}
        {(subtitle || pretitle || description) && (
          <div className="flex items-center w-full md:w-1/2 lg:w-full px-3 py-8 md:pl-[52px] md:pr-9 md:py-4 grow">
            <div className="grid space-y-3">
              {pretitle && (
                <p className=" text-blue-dark title is-4 !font-semibold">{pretitle}</p>
              )}
              {subtitle && (
                <h3 className="title is-2 text-blue-dark pb-6">{subtitle}</h3>
              )}
              {description && <div className="text-grey-30 pb-3">{documentToReactComponents(description.json)}</div>}

              {ctaCollection?.items?.length > 0 && (
                <div className="flex gap-3">
                  {ctaCollection.items.map(cta => (
                    (cta.externalLink || cta.internalLink) && (
                      <Link href={getUrlPath(cta)} key={cta.name} >
                        <a className="button button-primary">{cta.ctaLabel ?? cta.name}</a>
                      </Link>
                    )
                  ))}
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
