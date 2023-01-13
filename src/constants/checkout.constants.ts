export enum VantiOrderMetadata {
    /**
     * Buy flow Meta
     */
    IsVerified = 'isVerified',
    HasPesonalInfo = 'hasPesonalInfo',
    HasAddresses = 'hasAddresses',
    
    /**
     * Client Meta
     */
    FirstName = 'firstName',
    LastName = 'firstName',
}

export const PSE_STEPS_TO_VERIFY = [VantiOrderMetadata.IsVerified, VantiOrderMetadata.HasPesonalInfo, VantiOrderMetadata.HasAddresses];