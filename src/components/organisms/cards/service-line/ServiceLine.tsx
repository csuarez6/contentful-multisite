import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import Icon from "@/components/atoms/icon/Icon";
import CustomLink from "@/components/atoms/custom-link/CustomLink";

const ServiceLine: React.FC<IPromoContent> = (props) => {
  const {
    promoTitle,
    subtitle,
    promoIcon,
    internalLink,
    externalLink
  } = props;
  return (
    <article className="bg-cyan-50 shadow rounded-xl overflow-hidden w-full max-w-[588px]">
      {(externalLink || internalLink) && (
        <CustomLink
          content={props}
        >
          <div className="flex mt-4 mb-4">
            {promoIcon &&
              <div className="bg-cyan-400 rounded-full ml-4 justify-center">
                <Icon
                  icon={promoIcon}
                  className="w-16 h-16 text-blue-dark"
                />
              </div>
            }
            {(promoTitle) && (
              <div className="grid ml-3 text-blue-dark">
                {(promoTitle) && <h3 className="">{promoTitle}</h3>}
                {subtitle && (
                  <div className="text-size-p1">
                    {subtitle}
                  </div>
                )}
              </div>
            )}
          </div>
        </CustomLink>
      )}
    </article>
  );
};

export default ServiceLine;
