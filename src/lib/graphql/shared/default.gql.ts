const DefaultQuery = `
  __typename
  sys {
    id
  }
`;

export const ParentQuery = `
  __typename
  sys {
    id
  }
  name
  urlPaths
`;

export const internalLink = `
  internalLink {
    ...on Page{
      ${DefaultQuery}
      slug
      urlPaths
      promoTitle
    }
    ...on Product {
      ${DefaultQuery}
      slug
      urlPaths
      promoTitle
    }
  }
`;

export const RichtextQuery = `
  json
`;

export default DefaultQuery;
