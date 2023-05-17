import Icon from "@/components/atoms/icon/Icon";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { classNames } from "@/utils/functions";
interface ITopMenu extends INavigation {
  firstPath?: string,
}

const TopMenu: React.FC<ITopMenu> = ({ secondaryNavCollection, firstPath }) => {
  if (secondaryNavCollection?.items?.length <= 0) return;
  return (
    <div className="w-full bg-category-blue-light py-7 rounded-b-xl">
      <div className="mx-auto xl:container">
        <div className="px-2 sm:px-4 2xl:px-[70px]">
          <div className="z-20">
            <div className="flex items-center mx-auto">
              <div className="flex flex-1 items-center py-2 min-h-[60px]">
                <div className="grid grid-cols-5 gap-12">
                  {secondaryNavCollection?.items?.map((item, idx) => (
                    <div key={item?.promoTitle + "-" + idx}>
                      <CustomLink content={item}>
                        <h2 className={classNames("text-base font-semibold  mb-5 flex flex-wrap gap-2", item.internalLink?.slug === firstPath
                          ? "text-lucuma border-lucuma" : "text-blue-dark")}>
                          {item.promoTitle ?? item.name}
                          <Icon
                            icon="arrow-right"
                            className="w-7 h-7"
                            aria-hidden="true"
                          />
                        </h2>
                      </CustomLink>
                      <div className="text-sm text-white">
                        {documentToReactComponents(item.mainText?.json)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
