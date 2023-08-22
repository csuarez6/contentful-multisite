import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import Icon from "@/components/atoms/icon/Icon";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { classNames } from "@/utils/functions";

const iconCustomPosition = {
  top: "lg:flex-col items-center",
  left: "flex-row flex-wrap justify-center",
  right: " flex-row-reverse flex-wrap justify-center",
};

const ServiceLine: React.FC<IPromoContent> = (props) => {
  const {
    promoTitle,
    subtitle,
    promoIcon,
    internalLink,
    externalLink,
    iconPosition = "left"
  } = props;
  return (
    <article className="bg-cyan-50 shadow rounded-xl overflow-hidden w-full max-w-[588px]">
      {(externalLink || internalLink) && (
        <CustomLink
          content={props}
          linkClassName="w-full"
        >
          <div className={
            classNames("flex my-4 w-full gap-1 px-4 ", iconCustomPosition[iconPosition])
            }>
            {promoIcon &&
              <div className="bg-cyan-400 rounded-full h-fit w-fit">
                <Icon
                  icon={promoIcon}
                  className="w-12 h-12 text-blue-dark grow-0 shrink-0"
                />
              </div>
            }
            {(promoTitle) && (
              <div className="flex-1 text-blue-dark">
                {(promoTitle) && <h3 className="">{promoTitle}</h3>}
                {subtitle && (
                  <div className="text-size-p2">
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
