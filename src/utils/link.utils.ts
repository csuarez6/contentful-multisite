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

  return `https://${link}`;
};

export const getUrlPath = (content: GetUrlPathProps): string => {
  const re = new RegExp(`^${HOME_URL_PATH}`);

  let urlPath = null;

  if (content?.internalLink?.urlPath) {
    urlPath = content.internalLink.urlPath.replace(re, '');
    urlPath = /^\//.test(urlPath) ? urlPath : `/${urlPath}`;
  }

  if (!urlPath && content?.externalLink) {
    urlPath = content?.externalLink;
    urlPath = /^[http|mailto|tel|#]/.test(urlPath) ? urlPath : generateFullUrl(urlPath);
  }

  if (!urlPath && content?.urlPath) {
    urlPath = content.urlPath.replace(re, '');
    urlPath = /^\//.test(urlPath) ? urlPath : `/${urlPath}`;
  }

  return urlPath ? urlPath + (content.linkParameters ?? ''): '/';
};

export const getLinkProps = (content: GetUrlPathProps) => {  
  let textLink = content.name;

  const href = getUrlPath(content);
  const isExternalLink = !content?.internalLink?.urlPath && content?.externalLink;

  if(content?.internalLink?.name){
    textLink = content.internalLink.name; 
  }

  if(content?.internalLink?.promoTitle){
    textLink = content.internalLink.promoTitle; 
  }

  if(content?.promoTitle){
    textLink = content.promoTitle;
  }

  if(content?.ctaLabel){
    textLink = content.ctaLabel;
  }
  
  if(content?.__typename && content?.__typename === 'Page'){
    textLink = 'Conoce más';
  }

  return {
    href,
    target: isExternalLink ? '_blank' : '_self',
    isExternalLink,
    textLink
  };
};
