import { createElement } from "react";
import { BLOCKSVIEW_MAP, CHILDREN_KEYS_MAP } from "@/constants/blocksview-map.constants";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";

const jsonToReactComponent = (jsonItem, attachProps = {}) => {
  if (!jsonItem?.__typename) return;
  
  let view = BLOCKSVIEW_MAP[jsonItem?.__typename];
  
  if (jsonItem?.__typename == CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT) {
    view = BLOCKSVIEW_MAP[jsonItem.__typename];

    if (view && jsonItem?.view?.__typename) {
      view = view[jsonItem.view.__typename];
    }
  }

  if (!view) {
    return null;
  }

  const cleanItem = {
    ...jsonItem,
    ...attachProps,
    key: jsonItem.__typename + "-",
    sysId: jsonItem.sys.id,
  };

  try {
    return createElement(
      view,
      { ...cleanItem },
      jsonItem[CHILDREN_KEYS_MAP[jsonItem.__typename]] &&
      jsonToReactComponent(
        jsonItem[CHILDREN_KEYS_MAP[jsonItem.__typename]].items,
      )
    );
  } catch (e) {
    console.error(`Error rendering view, message => ${e.message}`);
  }
};

export default jsonToReactComponent;
