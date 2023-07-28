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
