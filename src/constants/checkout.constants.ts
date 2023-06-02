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
    recapchaResponse = "recapchaResponse"
}

export const PSE_STEPS_TO_VERIFY = [
    VantiOrderMetadata.IsVerified,
    VantiOrderMetadata.HasPersonalInfo,
    VantiOrderMetadata.HasAddresses
];

export const PRICE_VALIDATION_ID = "price_validation";
export const STOCK_VALIDATION_ID = "stock_validation";
