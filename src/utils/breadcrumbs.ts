import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";

const convertParentsToBreadcrumb = (parentItem): any => {
  const breadcumbItems = [];

  if (!parentItem) {
    return breadcumbItems;
  }

  breadcumbItems.push({
    promoTitle: parentItem.title ?? parentItem.name,
    internalLink: {
      urlPath: parentItem.urlPath,
    },
  });

  if (parentItem.parent) {
    const parentItems = convertParentsToBreadcrumb(parentItem.parent);
    breadcumbItems.unshift(...parentItems);
  }

  return breadcumbItems;
};

const getBreadcrumbs = ({ sys, name, promoTitle, parent }) => {
  const breadCrumbContent = {
    sys: {
      id: `breadcrumb:${sys.id}`,
    },
    __typename: CONTENTFUL_TYPENAMES.BLOCK_BREADCRUMB,
    ctaCollection: {
      items: [
        ...convertParentsToBreadcrumb(parent),
        {
          promoTitle: promoTitle ?? name,
          internalLink: {
            urlPath: "#",
          },
        },
      ],
    },
  };

  return breadCrumbContent;
};

export default getBreadcrumbs;
