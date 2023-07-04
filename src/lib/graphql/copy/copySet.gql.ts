const copySetQuery = `
    copiesCollection{
        items{
            internalName
            key
            value
            active
        }
    }
`;

export default copySetQuery;
