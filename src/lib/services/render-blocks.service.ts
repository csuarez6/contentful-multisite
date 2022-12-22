import { createElement } from "react";
import { BLOCKSVIEW_MAP, CHILDREN_KEYS_MAP } from "@/constants/blocksview-map.constants";

const viewNoSupported = (blockTypeName, viewTypename = undefined) => {
  if (process.env.NODE_ENV == "development") {
    viewTypename = blockTypeName !== viewTypename ? viewTypename : undefined;

    return createElement(
      "div",
      { className: "alert-block", key: `${blockTypeName}${viewTypename ? '-' + viewTypename : ''}` },
      `Bloque de contenido no definido: ${blockTypeName}${viewTypename ? ' vista(' + viewTypename + ')' : ''}`
    );
  }
  
  return null;
};

const jsonToReactComponents = (jsonItems, attachProps = {}) => {
  return jsonItems.map((item, key) => {
    let view = BLOCKSVIEW_MAP[item.__typename];

    if (view && item?.view?.__typename) {
      view = view[item.view.__typename];
    }

    if (!view) return viewNoSupported(item.__typename, item?.view?.__typename);

    const cleanItem = {
      ...item,
      ...attachProps,
      isFirst: key == 0,
      isLast: key == jsonItems.length - 1,
      key: item.__typename + "-" + key,
      asBlock: true,
    };

    return createElement(
      view,
      { ...cleanItem },
      item[CHILDREN_KEYS_MAP[item.__typename]] &&
        jsonToReactComponents(
          item[CHILDREN_KEYS_MAP[item.__typename]].items,
        )
    );
  });
};

export default jsonToReactComponents;
