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

export const RichtextQuery = `
  json
`;

export default DefaultQuery;
