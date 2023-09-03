export enum P2PRequestStatus {
    approved = 'APPROVED',
    pending = 'PENDING',
    rejected = 'REJECTED',
    partial_expired = 'PARTIAL_EXPIRED',
    approved_partial = 'APPROVED_PARTIAL',
    failed = 'FAILED',
}

export enum P2PDisplayOnFields {
    none = 'none',
    payment = 'payment',
    receipt = 'receipt',
    both = 'both',
    approved = 'approved',
}

export enum P2PDocumentTypes {
    cc = 'CC',
    ce = 'CE',
    ti = 'TI',
    nit = 'NIT',
    rut = 'RUT',
}

export interface IP2PAddress {
    street: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    phone: string,
}

export interface IP2PPerson {
    document?: string,
    documentType?: P2PDocumentTypes,
    name?: string,
    surname?: string,
    company?: string,
    email: string,
    mobile?: string,
    address?: IP2PAddress,
}

export interface IP2PPayment {
    reference: string,
    description: string,
    amount: {
        currency: string,
        total: string | number,
        taxes?: [{
            kind: string,
            amount: string | number,
            base: string | number,
        }],
        details?: [{
            kind: string,
            amount: string | number,
        }],
    },
    allowPartial?: boolean,
    shipping?: {
        document: string,
        documentType: string,
        name: string,
        surname: string,
        company: string,
        email: string,
        mobile: string,
        address: {
            street: string,
            city: string,
            state: string,
            postalCode: string,
            country: string,
            phone: string,
        },
    },
    items?: [{
        sku: string,
        name: string,
        category: string,
        qty: string,
        price: string | number,
        tax: string | number,
    }],
    fields?: [{
        keyword: string,
        value: string,
        displayOn: string,
    }],
    recurring?: {
        periodicity: string,
        interval: string,
        nextPayment: string,
        maxPeriods: string | number,
        dueDate: string,
        notificationUrl: string,
    },
    subscribe?: boolean,
    dispersion?: [{
        agreement?: string,
        agreementType: string,
        amount: {
            currency: string,
            total: string | number,
        },
    }],
    modifiers?: [{
        type: string,
        code: string | number,
        additional: {
            invoice: string,
        },
    }],
}

export interface IP2PFields {
    keyword: string,
    value?: string | object | [] | boolean | number,
    displayOn?: P2PDisplayOnFields
}

export interface IP2PDiscount {
    base: string,
    code: string,
    type: string,
    amount: string | number,
}

export interface IP2PDispersion {
    status: {
        status: P2PRequestStatus,
        reason?: string,
        message?: string,
        date: string,
    },
    internalReference: number,
    reference: string,
    paymentMethod: string,
    paymentMethodName: string,
    issuerName: string,
    amount: {
        from: {
            currency: string,
            total: string | number,
        },
        to: {
            currency: string,
            total: string | number,
        },
        factor: string,
    },
    receipt: string,
    franchise: string
    refunded: boolean,
    authorization: string,
    processorFields: {
        keyword: string,
        value: string,
        displayOn: string,
    },
    dispersion?: IP2PDispersion,
    agreement?: string,
    agreementType?: string,
    discount?: IP2PDiscount
    subscription: boolean
}

export interface IP2PStatus {
    status: P2PRequestStatus,
    reason?: string,
    message?: string,
    date: string,
}

export interface IP2PRequestInformation {
    requestId: string,
    status: IP2PStatus,
    request: {
        locale: string,
        payer: IP2PPerson,
        buyer: IP2PPerson,
        payment: IP2PPayment,
        subscription: IP2PSusbcription,
        fields: {
            keyword: string,
            value: string,
            displayOn: string,
        }
        paymentMethod: string,
        expiration: string,
        returnUrl: string,
        cancelUrl: string,
        ipAddress: string,
        userAgent: string,
        skipResult: boolean,
        noBuyerFill: boolean,
        type: string,
    },
    payment: [{
        status: IP2PStatus,
        internalReference: number,
        reference: string,
        paymentMethod: string,
        paymentMethodName: string,
        issuerName: string,
        amount: {
            from: {
                currency: string,
                total: string,
            },
            to: {
                currency: string,
                total: string,
            },
            factor: string,
        },
        receipt: string,
        franchise: string,
        refunded: boolean,
        authorization: string,
        processorFields: {
            keyword: string,
            value: string,
            displayOn: string,
        },
        dispersion?: IP2PDispersion
        agreement: string,
        agreementType: string,
        discount: IP2PDiscount,
        subscription: string,
    }],
    subscription?: [{
        status: IP2PStatus,
        type: string,
        instrument: {
            keyword: string,
            value: string,
            displayOn: string,
        }
    }]
}

export interface IP2PSusbcription {
    reference: string,
    description: string,
    fields: {
        keyword: string,
        value: string,
        displayOn: string,
    },
}

export interface IP2PRequest {
    status: {
        status: P2PRequestStatus,
        reason?: string,
        message?: string,
        date: string
    },
    requestId?: string,
    processUrl?: string
}

export interface IP2PCreateRequest {
    auth: IP2PAuth,
    payment: IP2PPayment,
    expiration: string,
    ipAddress: string,
    userAgent: string,
    returnUrl: string,
    locale?: string,
    payer?: IP2PPerson,
    buyer?: IP2PPerson,
    subscription?: IP2PSusbcription,
    fields?: IP2PFields[],
    paymentMethod?: string,
    cancelUrl?: string,
    skipResult?: boolean,
    noBuyerFill?: boolean,
    type?: string,
}

export interface IP2PAuth {
    login: string,
    tranKey: string,
    nonce: string,
    seed: string,
}

export interface IP2PNotification {
    requestId: string,
    reference: string,
    signature: string,
    status: {
        status: string,
        date: string,
        message: string,
        reason: string,
    },
}