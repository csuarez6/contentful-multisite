import Link from "next/link";
import Image from "next/image";
import Icon from '@/components/atoms/icon/Icon';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from '../../../utils/functions';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const FeaturedBlock: React.FC<IPromoBlock> = ({ title, description, image, view, featuredContentsCollection, ctaCollection }) => {
  const imageAlignLocal = (view && view.imageAlign === "Derecha") ? "order-last" : "";

  return (
    <section className="section grid">
      <div className="relative">
        <div className={classNames(
          "gap-x-16 gap-y-6 grid grid-cols-1 items-center",
          (view && view.columnsSize > 2) ? "lg:grid-cols-3" : "lg:grid-cols-2",
        )}>
          {image?.url &&
            <div aria-hidden="true" className={classNames("overflow-hidden rounded-lg", imageAlignLocal)}>
              <figure
                className={classNames(
                  "relative",
                  (view && view.columnsSize > 2) ? "aspect-[384/624]" : "aspect-[612/569]",
                )}>
                <Image
                  className="block w-auto object-cover"
                  src={image.url}
                  alt={image.title}
                  fill
                />
              </figure>
            </div>
          }
          {
            (title || description || featuredContentsCollection?.items || ctaCollection?.items) && (
              <div className={classNames((view && view.columnsSize > 2) ? "col-span-2" : "")}>
                <div className="flex flex-col gap-y-6">
                  {(title) && <h2 className="text-blue-dark">{title}</h2>}
                  {(description) && <div className="text-lg text-grey-30">{documentToReactComponents(description.json)}</div>}

                  {(featuredContentsCollection?.items) && (
                    <div className={classNames(
                      "gap-y-6 grid grid-cols-1",
                      (featuredContentsCollection.items.length > 3) ? "md:grid-cols-2" : "md:grid-cols-1"
                    )}>
                      {featuredContentsCollection.items.map((item) => (
                        <div key={item.promoTitle}
                          className={classNames(
                            "flex flex-row gap-6",
                            (item.promoTitle) ? "items-start" : "items-center"
                          )}>
                          <div className={classNames(
                            "flow-root shrink-0 w-12 h-12 p-2 rounded-full",
                            (item.bgIconRounded) ? item.bgIconRounded : '',
                            (item.iconColor) ? item.iconColor : 'text-blue-dark'
                          )}>
                            <Icon
                              icon={`${(item.promoIcon) ? item.promoIcon : 'check'}`}
                              className="mx-auto w-full h-full"
                            />
                          </div>
                          <div className={`flex flex-col gap-2 items-start`}>
                            {(item.promoTitle) && (
                              <h3 className={classNames(
                                "title is-4 text-blue-dark"
                              )}>
                                {item.promoTitle}
                              </h3>
                            )}
                            {(item.promoDescription) && (
                              <div className="text-lg text-grey-30">{documentToReactComponents(item.promoDescription.json)}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {ctaCollection.items && (
                    <div className="flex my-6 gap-2">
                      {ctaCollection?.items?.map((item) => (
                        item.ctaLabel && <Link href={`${item.externalLink}`} key={item.ctaLabel} legacyBehavior >
                          <a className="button button-primary w-fit">
                            {item.ctaLabel}
                            {(item.externalLink) && (
                              <Icon
                                icon='arrow-right'
                                className="w-6 h-6 ml-1"
                                aria-hidden="true"
                              />
                            )}
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlock;
