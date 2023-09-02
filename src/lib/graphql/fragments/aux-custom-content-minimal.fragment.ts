import AuxCustomContentMinimalQuery from "../aux/custom-content-minimal.gql";

const AuxCustomContentMinimalFragment = `
    fragment AuxCustomContentMinimalFragment on AuxCustomContent {
        ${AuxCustomContentMinimalQuery}
    }
`;

export default AuxCustomContentMinimalFragment;
