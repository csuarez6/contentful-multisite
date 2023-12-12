import type { NextApiRequest, NextApiResponse } from "next";
import { getAlgoliaSearchIndex } from "@/lib/services/content-filter.service";
import getEntryContent from "@/lib/services/entry-content.service";
import { getCommercelayerProduct } from "@/lib/services/commerce-layer.service";
import _ from "lodash";
import {
  isAvailableGasAppliance,
  isAvailableVantilisto,
} from "@/utils/functions";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method !== "PUT")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const index = await getAlgoliaSearchIndex(
      req.headers["x-algolia-application-id"],
      req.headers["x-algolia-api-key"],
      req.headers["x-algolia-index"]
    );

    let entryData =
      typeof req.body == "string" ? JSON.parse(req.body) : { ...req.body };

    if (
      entryData?.metadata?.tags?.find((tag: any) => tag?.sys?.id === "testPage")
    )
      return res
        .status(415)
        .json({ status: "error", message: "Content is for testing" });

    const indexType = _.upperFirst(entryData.sys.contentType.sys.id).replaceAll(
      "_",
      ""
    );

    let entryFields = await getEntryContent(
      {
        __typename: indexType,
        sys: {
          id: entryData.sys.id,
        },
      },
      false,
      true,
      3
    );

    if (!entryFields)
      return res
        .status(404)
        .json({ status: "error", message: "Content not found" });

    if (indexType === "Product") {
      const productPrices = await getCommercelayerProduct(entryFields.sku);
      if (productPrices) {
        entryFields = {
          ...entryFields,
          ...productPrices,
          isAvailable: isAvailableGasAppliance(
            entryFields?.marketId,
            productPrices?._priceGasodomestico,
            productPrices?.productsQuantityGasodomestico
          )
            ? true
            : isAvailableVantilisto(
                entryFields?.marketId,
                productPrices?._priceVantiListo,
                productPrices?.productsQuantityVantiListo
              )
            ? true
            : false,
        };
      }
    }

    entryData = {
      ...entryData,
      fields: entryFields,
      objectID: entryData.sys.id,
    };
    const { taskID, objectID } = await index.saveObject(entryData);

    return res.status(200).json({
      updatedAt: new Date().toISOString(),
      taskID,
      objectID,
    });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

export default handler;
