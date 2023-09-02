import PageMinimalQuery from "../views/page-minimal.gql";

const PageMinimalFragment = `
  fragment PageMinimalFragment on Page {
    ${PageMinimalQuery}
  }
`;

export default PageMinimalFragment;
