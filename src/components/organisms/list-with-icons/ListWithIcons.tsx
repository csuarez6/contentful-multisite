import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import Icon from '@/components/atoms/icon/Icon';
import Link from "next/link";
import { classNames } from '../../../utils/functions';

const ListWithIcons: React.FC<IPromoContent> = ({
  promoTitle,
  promoIcon,
  promoDescription,
  iconPosition,
  iconSize,
  bgIconRounded,
  cta
}) => {
  let iconSizeLocal = "w-[68px] h-[68px]";
  if (bgIconRounded) iconSizeLocal = `w-24 h-24 p-4 rounded-full ${bgIconRounded}`;
  if (iconSize) {
    if (iconSize === "small") iconSizeLocal = "w-7 h-7";
    if (iconSize === "small" && bgIconRounded) iconSizeLocal = `w-12 h-12 p-2 rounded-full ${bgIconRounded}`;
    if (iconSize === "medium") iconSizeLocal = "w-10 h-10";
    if (iconSize === "medium" && bgIconRounded) iconSizeLocal = `w-20 h-20 p-5 rounded-full ${bgIconRounded}`;
  }

  return (
    <div key={promoTitle}
      className={classNames(
        "flex",
        (iconPosition && iconPosition === 'left') ? "flex-row gap-6" : "flex-col text-center gap-3 items-center"
      )}>
      <div className={`flow-root shrink-0 ${iconSizeLocal}`}>
        <Icon
          icon={promoIcon}
          className="mx-auto w-full h-full"
        />
      </div>
      <div className={`flex flex-col gap-2 ${iconPosition !== 'left' ? 'items-center' : 'items-start'}`}>
        {(promoTitle) && (
          <h3 className="title is-4 text-blue-dark">{promoTitle}</h3>
        )}
        {(promoDescription) && (
          <p className="text-lg text-grey-30">{promoDescription}</p>
        )}
        {(cta) && (
          <Link href={cta.href}>
            <a className="button button-primary w-fit">
              {cta.name}
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ListWithIcons;