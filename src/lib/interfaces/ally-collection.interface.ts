import { LineItem, Order, ShippingCategory } from "@commercelayer/sdk";

export interface ILineItemExtended extends LineItem {
    installlation_service?: LineItem;
    warranty_service?: LineItem;
    item?: any
};

export interface IAlly extends ShippingCategory {
    line_items: ILineItemExtended[];
    ally_total_amount_float: number | null;
    formatted_ally_total_amount: string | null;
}

export interface IOrderExtended extends Order {
    metadata: {
        name: string;
        lastName: string;
        cellPhone: number;
        isVerified: boolean;
        documentType: string;
        hasAddresses: boolean;
        documentNumber: number;
        hasPersonalInfo: boolean;
        recapchaResponse: string;
    };
    line_items: ILineItemExtended[];
    line_items_by_ally: IAlly[]
}

export interface IAllyResponse {
    status: number;
    message?: string;
    data?: IOrderExtended;
};
