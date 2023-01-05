import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const LineSteps: React.FC<IPromoBlock> = ({
  featuredContentsCollection,
  description,
  title,
  subtitle,
  ctaCollection,
}) => {
  return (
    <section className="grid gap-10 md:flex">
      <div className="flex flex-col gap-2">
        {title && (
          <p className="text-4xl text-blue-dark-8 font-bold">{title}</p>
        )}
        {subtitle && <p className="text-lg text-blue-dark gap-4">{subtitle}</p>}
        {description && (
          <div className="text-lg">
            {documentToReactComponents(description.json)}
          </div>
        )}
        {ctaCollection?.items && (
          <div className="flex gap-3 mt-3">
            {ctaCollection.items.map(
              (cta) =>
                (cta.externalLink || cta.internalLink) && (
                  <Link
                    href={cta.externalLink ?? cta.internalLink}
                    key={cta.name}
                    legacyBehavior
                  >
                    <a className="button button-primary">
                      {cta.ctaLabel ?? cta.name}
                    </a>
                  </Link>
                )
            )}
          </div>
        )}
      </div>
      <div className="flex-auto">
        {featuredContentsCollection && (
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {featuredContentsCollection?.items?.map((items, id) => (
                <li key={items.promoTitle}>
                  <div className="relative pb-8">
                    {id !== featuredContentsCollection?.items?.length - 1 ? (
                      <span
                        className="absolute top-4 left-5 -ml-px h-full w-0.5 bg-blue-dark"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-4">
                      <div>
                        <span className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-dark text-white text-2xl font-bold">
                          {id + 1}
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4">
                        <div>
                          <div className="flex flex-col gap-2">
                            {items.promoTitle && (
                              <p className="text-xl text-justify text-blue-dark font-bold">
                                {items.promoTitle}
                              </p>
                            )}
                            {items.promoDescription && (
                              <div className="text-lg text-justify">
                                {documentToReactComponents(
                                  items.promoDescription.json
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default LineSteps;
