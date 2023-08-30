import { AuxCustomContentMinimalQuery } from "../aux/custom-content.gql";

const AuxCustomContentMinimalFragment = `
    fragment AuxCustomContentMinimalFragment on AuxCustomContent {
        ${AuxCustomContentMinimalQuery}
    }
`;

export default AuxCustomContentMinimalFragment;
