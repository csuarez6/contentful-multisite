import uuid from "react-uuid";
import { event as gTagEvent } from "nextjs-google-analytics";

export const gaEventForm = ({
  category = null,
  label = null,
  contractAccount = null,
  productsList = null
}) => {
  const eventId = uuid();
  gTagEvent("trackEventForm", {
    action: "form_submit",
    category: category ?? "",
    label: label ?? "",
    contractAccount: contractAccount ?? "",
    productsList: productsList ?? [],
    "gtm.uniqueEventId": eventId,
  });
};
