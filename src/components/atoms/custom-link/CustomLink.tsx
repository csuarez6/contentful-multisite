import Link from "next/link";

import { IPage } from "@/lib/interfaces/page-cf.interface";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

import { getLinkProps } from "@/utils/link.utils";

export interface ICustomLink {
  content?: IPage & IPromoContent;
  children?: React.ReactNode;
  className?: string;
  linkClassName?: string;
  onClick?: (e: Event) => void;
}

const CustomLink: React.FC<ICustomLink> = ({
  content,
  children,
  className = "",
  linkClassName = "",
  onClick = null,
}) => {
  const { href, target, isExternalLink } = getLinkProps(content);

  return (
    <Link
      href={href}
      target={target}
      {...(isExternalLink ? { rel: "noreferrer" } : null)}
      onClick={onClick}
      className={linkClassName}
    >
      <span className={`${className} cursor-pointer`}>{children}</span>
    </Link>
  );
};

export default CustomLink;
