import { HOME_URL_PATH } from "@/constants/url-paths.constants";
import { IPage } from "@/lib/interfaces/page-cf.interface";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

type GetUrlPathProps = IPage & IPromoContent;

export const getUrlPath = (content: GetUrlPathProps): string => {
  const re = new RegExp(`^${HOME_URL_PATH}`);

  if (content?.internalLink?.urlPath) {
    return content.internalLink.urlPath.replace(re, '');
  }

  if (content?.externalLink) {
    return content?.externalLink;
  }

  if (content?.urlPath) {
    const urlPath = content.urlPath.replace(re, '');
    return urlPath.match('^/') ? urlPath : `/${urlPath}`;
  }

  return '/';
};
