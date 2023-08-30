import AuxNavigationMinimalQuery from "../aux/navigation-minimal.gql";

const AuxNavigationMinimalFragment = `
    fragment AuxNavigationMinimalFragment on AuxNavigation {
        ${AuxNavigationMinimalQuery}
    }
`;

export default AuxNavigationMinimalFragment;