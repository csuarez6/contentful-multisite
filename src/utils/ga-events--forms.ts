import uuid from "react-uuid";
import { event as gTagEvent } from "nextjs-google-analytics";

export const gaEventForm = ({
  category = null,
  label = null,
  contractAccount = null,
  productsList = null,
  product = null,
  sku = null,
  callbackId = null
}) => {
  const eventId = uuid();
  const isGasodomesticos = label === "Gasodomésticos";
  const isVantilisto = label === "Catálogo VantiListo";
  const productData = (isGasodomesticos || isVantilisto)
    ? { product, sku }
    : { productsList: productsList ?? [] };

  const params = {
    action: "form_submit",
    category: category ?? "",
    label: label ?? "",
    contractAccount: contractAccount ?? "",
    "gtm.uniqueEventId": eventId,
    tracking_id: callbackId ?? ""
  };

  gTagEvent("trackEventForm", {
    ...params,
    ...productData
  });
};
