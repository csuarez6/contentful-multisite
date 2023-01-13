import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { INavigation } from "@/lib/interfaces/menu-cf.interface";

import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";

const FooterBlock: React.FC<INavigation> = ({
  name,
  promoTitle,
  secondaryText,
  promoImage,
  mainNavCollection,
  secondaryNavCollection,
}) => {
  return (
    <footer
      id="footer"
      className="bg-gradient-blue-dark overflow-x-hidden"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        {name ?? "Footer"}
      </h2>
      <div className="xl:container mx-auto">
        <div className="py-12 px-2 sm:px-4 lg:px-8 2xl:px-[46px] lg:pt-10 lg:pb-[62px]">
          <div className="xl:flex xl:gap-32 pb-10">
            <div className="xl:max-w-xs pt-0.5">
              <p className="title is-1 text-white">{promoTitle}</p>
            </div>
            <div className="pt-12 grid xl:grow xl:pt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
                {mainNavCollection?.items?.map((menuItem) => (
                  <div key={menuItem.sys.id}>
                    <h3 className="text-white">
                      {menuItem.promoTitle ?? menuItem.name}
                    </h3>
                    {menuItem?.mainNavCollection?.items?.length > 0 && (
                      <ul role="list" className="pt-[10px] space-y-3">
                        {menuItem.mainNavCollection.items.map((listItem) => (
                          <li key={listItem.sys.id}>
                            <CustomLink
                              content={listItem}
                              className="text-base text-white hover:underline"
                            >
                              {listItem.promoTitle ?? listItem.name}
                            </CustomLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ul className="flex flex-wrap justify-center pt-4 pb-2 gap-16">
            {secondaryNavCollection?.items?.map((item) => (
              <li key={item.sys.id}>
                <CustomLink
                  className="text-white hover:text-neutral-90"
                  content={item}
                >
                  <span className="sr-only">
                    {item.promoTitle ?? item.name}
                  </span>
                  {item.promoIcon && (
                    <Icon
                      icon={item.promoIcon}
                      className="h-[46px] w-[46px] p-[7px]"
                      aria-hidden="true"
                    />
                  )}
                </CustomLink>
              </li>
            ))}
          </ul>
          <hr className="min-w-[100vw] -mx-[50vw] border-t-[0.5px] border-neutral-70" />
          <div className="pt-10 flex flex-col sm:flex-row justify-between gap-16">
            <div className="text-size-p2 text-white">
              {documentToReactComponents(secondaryText?.json)}
            </div>
            {promoImage && (
              <div className="w-[311px] mt-1 shrink-0">
                <figure className="relative w-100">
                  <Image
                    src={promoImage.url}
                    alt={promoImage.description}
                    width={promoImage.width}
                    height={promoImage.height}
                    className="w-full h-auto"
                  />
                </figure>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBlock;
