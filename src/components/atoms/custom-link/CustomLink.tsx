import Link from "next/link";

import { IPage } from "@/lib/interfaces/page-cf.interface";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

import { getLinkProps } from "@/utils/link.utils";
import Icon from "../icon/Icon";

export interface ICustomLink {
  content?: IPage & IPromoContent;
  children?: React.ReactNode;
  className?: string;
  linkClassName?: string;
  onClick?: (e: any) => void;
}

const CustomLink: React.FC<ICustomLink> = ({
  content,
  children = null,
  className = "",
  linkClassName = "",
  onClick = null,
}) => {
  const { href, target, isExternalLink, textLink, icon } =
    getLinkProps(content);
  return href ? (
    <Link
      href={href}
      target={target}
      {...(isExternalLink ? { rel: "noreferrer" } : null)}
      onClick={onClick}
      className={linkClassName}
      prefetch
      data-tagid={content?.sys?.id}
    >
      <span
        className={`cursor-pointer flex gap-1 items-center flex-nowrap ${className}`}
      >
        {children ?? textLink}
        {icon && <Icon icon={icon} className="w-6 h-6 shrink-0" />}
      </span>
    </Link>
  ) : (
    <div>
      <span
        className={`cursor-default flex gap-1 items-center flex-nowrap ${className}`}
      >
        {children ?? textLink}
        {icon && <Icon icon={icon} className="w-6 h-6 shrink-0" />}
      </span>
    </div>
  );
};

export default CustomLink;
