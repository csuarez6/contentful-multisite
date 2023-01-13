import { HOME_URL_PATH } from "@/constants/url-paths.constants";
import { IPage } from "@/lib/interfaces/page-cf.interface";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

type GetUrlPathProps = IPage & IPromoContent;

const generateFullUrl = (link: string) => {
  if (/^\+?[0-9 -]+/.test(link)) {
    return `tel:${link}`;
  };

  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(link)) {
    return `mailto:${link}`;
  };

  return `//${link}`;
};

export const getUrlPath = (content: GetUrlPathProps): string => {
  const re = new RegExp(`^${HOME_URL_PATH}`);

  if (content?.internalLink?.urlPath) {
    const urlPath = content.internalLink.urlPath.replace(re, '');
    return /^\//.test(urlPath) ? urlPath : `/${urlPath}`;
  }

  if (content?.externalLink) {
    const urlPath = content?.externalLink;
    return /^[http|mailto|tel|#]/.test(urlPath) ? urlPath : generateFullUrl(urlPath);
  }

  if (content?.urlPath) {
    const urlPath = content.urlPath.replace(re, '');
    return /^\//.test(urlPath) ? urlPath : `/${urlPath}`;
  }

  return '/';
};

export const getLinkProps = (content: GetUrlPathProps) => {
  const href = getUrlPath(content);
  const isExternalLink = !content?.internalLink?.urlPath && content?.externalLink;

  return {
    href,
    target: isExternalLink ? '_blank' : '_self',
    isExternalLink
  };
};
