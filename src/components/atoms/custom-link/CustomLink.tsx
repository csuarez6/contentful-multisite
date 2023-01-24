import Link from "next/link";

import { IPage } from "@/lib/interfaces/page-cf.interface";
import { IPromoBlock, IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

import { getLinkProps } from "@/utils/link.utils";

export interface ICustomLink {
  content?: IPage & IPromoContent & IPromoBlock;
  children?: React.ReactNode;
  className?: string;
  linkClassName?: string;
  onClick?: (e: Event) => void;
}

const CustomLink: React.FC<ICustomLink> = ({
  content,
  children = null,
  className = "",
  linkClassName = "",
  onClick = null,
}) => {
  const { href, target, isExternalLink, textLink } = getLinkProps(content);

  return (
    <Link
      href={href}
      target={target}
      {...(isExternalLink ? { rel: "noreferrer" } : null)}
      onClick={onClick}
      className={linkClassName}
    >
      <span className={`${className} cursor-pointer`}>{children ? children : textLink}</span>
    </Link>
  );
};

export default CustomLink;
