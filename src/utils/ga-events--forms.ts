import uuid from "react-uuid";
import { event as gTagEvent } from "nextjs-google-analytics";

export const gaEventForm = ({
  category = null,
  label = null,
  contractAccount = null,
  product = null,
  productsList = null,
  sku = null
}) => {
  const eventId = uuid();
  gTagEvent("trackEventForm", {
    action: "form_submit",
    category: category ?? "",
    label: label ?? "",
    contractAccount: contractAccount ?? "",
    product: product ?? "",
    sku: sku ?? "",
    productsList: productsList ?? [],
    "gtm.uniqueEventId": eventId,
  });
};
