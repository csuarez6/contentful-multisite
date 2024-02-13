import { gql } from "@apollo/client";
import _ from "lodash";

import contentfulClient, {
  removeUnresolved,
} from "./contentful-client.service";

import CONTENTFUL_QUERY_MAPS from "@/constants/contentful-query-maps.constants";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import { getCommercelayerProduct } from "./commerce-layer.service";
import { isAvailableGasAppliance, isAvailableVantilisto, sleep } from "@/utils/functions";
import getReferencesRichtextContent from "./richtext-references.service";
import getReferencesContent from "./references-content.service";

type DefaultBlockInfo = {
  __typename: string;
  sys: {
    id: string;
  };
};

const getPriceRange = (_price: number) => {
  if(_price > 0 && _price <= 1000000) { return "0 - 1'000.000"; }
  else if(_price > 1000000 && _price <= 2000000) { return "1'000.001 - 2'000.000"; }
  else if(_price > 2000000 && _price <= 3000000) { return "2'000.001 - 3'000.000"; }
  else if(_price > 3000000 && _price <= 4000000) { return "3'000.001 - 4'000.000"; }
  else if(_price > 4000000 && _price <= 5000000) { return "4'000.001 - 5'000.000"; }
  else if(_price > 5000000) { return "5'000.001 o más"; }
  return null;
};

const getEntryContent = async (
  blockInfo: DefaultBlockInfo,
  preview = false,
  recursive = false,
  overrideMaxDepth = 0
) => {
  if (!blockInfo || !CONTENTFUL_QUERY_MAPS[blockInfo.__typename]) {
    console.error(
      `Error on getEntryContent: «blockInfo» are required or it's not defined`
    );
    return null;
  }

  let responseData = null,
    responseError = null;

  if (!blockInfo?.sys?.id) {
    console.error(`Error on entry query, sys.id not defined => `, blockInfo);
    return null;
  }

  const {
    queryName: type,
    query,
    fragments = "",
  } = CONTENTFUL_QUERY_MAPS[blockInfo.__typename];

  try {
    await sleep(30);
    ({ data: responseData, errors: responseError } = await contentfulClient(
      preview
    ).query({
      query: gql`
        ${fragments}
        query getEntry($id: String!, $preview: Boolean!) {
          ${type}(id: $id, preview: $preview) {
            ${query}
          }
        }
      `,
      variables: {
        id: blockInfo.sys.id,
        preview,
      },
      errorPolicy: "all",
    }));
    responseData = removeUnresolved(responseData, responseError);
  } catch (e) {
    console.error(`Error on getEntryContent query:`, e.message);
    return null;
  }

  if (!responseData?.[type]) return null;

  const entryContent = JSON.parse(JSON.stringify(responseData?.[type]));

  if (blockInfo.__typename == CONTENTFUL_TYPENAMES.PAGE_MINIMAL) {
    entryContent.__typename = CONTENTFUL_TYPENAMES.PAGE_MINIMAL;
  }

  const richtextReferences = await getReferencesRichtextContent({
    content: entryContent,
    preview,
  });
  if (
    richtextReferences &&
    typeof richtextReferences === "object" &&
    Object.keys(richtextReferences).length > 0
  ) {
    _.merge(entryContent, richtextReferences);
  }

  if (recursive) {
    if (entryContent?.parent?.__typename) {
      entryContent.parent.__typename = CONTENTFUL_TYPENAMES.PAGE_MINIMAL;
    }

    const referencesContent = await getReferencesContent({
      content: entryContent,
      maxDepthRecursion: overrideMaxDepth,
      preview,
    });

    _.merge(entryContent, referencesContent);
  }

  if (
    entryContent.__typename === CONTENTFUL_TYPENAMES.PRODUCT &&
    entryContent?.sku
  ) {
    let commercelayerProduct = await getCommercelayerProduct(entryContent.sku);
    const isAvailable = isAvailableGasAppliance(
      entryContent?.marketId,
      commercelayerProduct?._priceGasodomestico,
      commercelayerProduct?.productsQuantityGasodomestico
    )
      ? true
      : isAvailableVantilisto(
          entryContent?.marketId,
          commercelayerProduct?._priceVantiListo,
          commercelayerProduct?.productsQuantityVantiListo
        )
      ? true
      : false;

    if (commercelayerProduct) {
      commercelayerProduct = {
        ...commercelayerProduct,
        isAvailable,
        _rangePriceGasodomestico: getPriceRange(commercelayerProduct?._priceGasodomestico),
        _rangePriceVantiListo: getPriceRange(commercelayerProduct?._priceVantiListo), 
      };
    }

    _.merge(entryContent, commercelayerProduct);
  }

  return entryContent;
};

export default getEntryContent;
