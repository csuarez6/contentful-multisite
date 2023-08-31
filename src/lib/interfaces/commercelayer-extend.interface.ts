import { Metadata } from "@commercelayer/sdk/lib/cjs/resource";

export interface ILoggedError {
    title?: string;
    detail?: string;
    code?: string;
    source?: any,
    status?: string;
    meta?: Metadata;
};

export interface ILoggedErrorCollection {
    errors?: ILoggedError[];
};

export interface IExternalPaymentGWRequest {
    data: {
        id: string;
        type: string;
        links: any;
        attributes: any;
        relationships: any;
        meta: any;
    };
    included: IncludedItem[];
}

interface IncludedItem {
    id: string;
    type: string;
    links: any;
    attributes: any;
    relationships: any;
    meta: any;
}