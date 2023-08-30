import { ParentQuery } from "../shared/default.gql";

const ParentFieldsFragment = `
    fragment ParentFields on Page {
        ${ParentQuery}
    }
`;

export default ParentFieldsFragment;
