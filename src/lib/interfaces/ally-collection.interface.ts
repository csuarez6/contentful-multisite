import { LineItem, Order, Shipment, ShippingCategory, Sku } from "@commercelayer/sdk";

export interface ILineItemExtended extends LineItem {
    installlation_service?: LineItem[];
    warranty_service?: LineItem[];
    item?: Sku;
};

export interface IAlly extends ShippingCategory {
    line_items: ILineItemExtended[];
    ally_total_amount_float: number | null;
    ally_total_shipping_amount_float: number | null;
    formatted_ally_total_amount: string | null;
    formatted_ally_shipping_total_amount: string | null;
    shipments: Shipment[];
}

export interface IOrderExtended extends Order {
    metadata: IMetadataOrder;
    line_items: ILineItemExtended[];
    line_items_by_ally: IAlly[]
}

export interface IMetadataOrder {
    name: string;
    lastName: string;
    cellPhone: number;
    isVerified: boolean;
    documentType: string;
    hasAddresses: boolean;
    documentNumber: number;
    hasPersonalInfo: boolean;
    recapchaResponse: string;
}

export interface IMetadataCustomer {
    name: string;
    lastName: string;
    cellPhone: string;
    documentType: string;
    contractNumber: string;
    documentNumber: string;
}

export interface IAllyResponse {
    status: number;
    message?: string;
    data?: IOrderExtended;
};
