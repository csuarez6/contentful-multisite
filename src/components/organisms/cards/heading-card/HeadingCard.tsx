import Icon from "@/components/atoms/icon/Icon";
import { classNames } from '../../../../utils/functions';

export interface IHeadingCard {
  children?: React.ReactNode;
  title?: string;
  icon?: string;
  classes?: string;
}

const HeadingCard: React.FC<IHeadingCard> = ({
  children,
  title,
  icon,
  classes
}) => {
  return (
    <div className={classNames("w-full rounded-xl shadow-[-2px_-2px_0px_0px_rgb(0,0,0,0.04),2px_2px_4px_0px_rgb(0,0,0,0.08)]", classes)}>
      <div className="flex flex-wrap justify-between p-[18px] border-b border-gray-200 rounded-t-lg bg-neutral-90">
        <div className="flex gap-3">
          <span className="flex text-neutral-30 items-center shrink-0 w-6 h-6">
            <Icon icon={icon} className="w-full h-full" aria-hidden="true" />
          </span>
          <span>{title}</span>
        </div>
        <span className="flex text-neutral-30 items-center shrink-0 w-[34px] h-[34px]">
          <Icon icon="check" className="w-full h-full" aria-hidden="true" />
        </span>
      </div>
      <div id="Content" className="p-6">
        {children}
      </div>
    </div>
  );
};

export default HeadingCard;
