import Link from "next/link";
import Image from "next/image";
import Icon from '@/components/atoms/icon/Icon';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from '../../../utils/functions';

const FeaturedBlock: React.FC<IPromoBlock> = ({ title, description, image, alignImage, columnsNumber, listedContent, cta }) => {
  const imageAlignLocal = (alignImage && alignImage == "right") ? "order-last" : "";

  return (
    <section className="grid">
      <div className="relative">
        <div className={classNames(
          "gap-x-16 gap-y-6 grid grid-cols-1 items-center",
          (columnsNumber > 2) ? "lg:grid-cols-3" : "lg:grid-cols-2",
        )}>
          {image?.url &&
            <div aria-hidden="true" className={classNames("overflow-hidden rounded-lg", imageAlignLocal)}>
              <figure
                className={classNames(
                  "relative",
                  (columnsNumber > 2) ? "aspect-[384/624]" : "aspect-[612/569]",
                )}>
                <Image
                  className="block w-auto object-cover"
                  src={image.url}
                  alt={image.title}
                  fill
                />
              </figure>
            </div>}
          <div className={classNames((columnsNumber > 2) ? "col-span-2" : "")}>
            <div className="flex flex-col gap-y-6">
              {(title) && <h2 className="text-blue-dark">{title}</h2>}
              {(description) && <p className="text-lg text-grey-30">{description}</p>}

              {(listedContent) && (
                <div className={classNames(
                  "gap-y-6 grid grid-cols-1",
                  (listedContent.length > 3) ? "md:grid-cols-2" : "md:grid-cols-1"
                )}>
                  {listedContent.map((item, idx) => (
                    <div key={idx}
                      className={classNames(
                        "flex flex-row gap-6",
                        (item.title) ? "items-start" : "items-center"
                      )}>
                      <div className={classNames(
                        "flow-root shrink-0 w-12 h-12 p-2 rounded-full",
                        (item.bgIconRounded) ? item.bgIconRounded : '',
                        (item.iconColor) ? item.iconColor : 'text-blue-dark'
                      )}>
                        <Icon
                          icon={`${(item.icon) ? item.icon : 'check'}`}
                          className="mx-auto w-full h-full"
                        />
                      </div>
                      <div className={`flex flex-col gap-2 items-start`}>
                        {(item.title) && (
                          <h3 className={classNames(
                            "title is-4 text-blue-dark"
                          )}>
                            {item.title}
                          </h3>
                        )}
                        {(item.description) && (
                          <p className="text-lg text-grey-30">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {cta && (
                <div className="flex my-6 gap-2">
                  {cta.list.map((item) => (
                    item.href && <Link href={item.href} key={item.href}>
                      <a className="button button-primary w-fit">
                        {item.name}
                        {(item.isExternal) && (
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
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlock;
