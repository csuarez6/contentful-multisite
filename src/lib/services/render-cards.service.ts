import { createElement } from "react";
import { BLOCKSVIEW_MAP, CHILDREN_KEYS_MAP } from "@/constants/blocksview-map.constants";

const jsonToReactComponent = (jsonItem, attachProps = {}) => {
  if (!jsonItem?.__typename) return;
  
  const view = BLOCKSVIEW_MAP[jsonItem.__typename];

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
