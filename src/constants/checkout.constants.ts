export enum VantiOrderMetadata {
    /**
     * Buy flow Meta
     */
    IsVerified = 'isVerified',
    HasPersonalInfo = 'hasPersonalInfo',
    HasAddresses = 'hasAddresses',
    
    /**
     * Client Meta
     */
    name = 'name',
    LastName = 'lastName',
}

export const PSE_STEPS_TO_VERIFY = [VantiOrderMetadata.IsVerified, VantiOrderMetadata.HasPersonalInfo, VantiOrderMetadata.HasAddresses];