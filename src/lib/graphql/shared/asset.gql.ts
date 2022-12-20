const AssetQuery = `
  title
  description
  fileName
  contentType
  url
`;

export const AssetImageQuery = `
  ${AssetQuery}
  width
  height
`;

export default AssetQuery;