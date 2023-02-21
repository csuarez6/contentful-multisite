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
    if (!item?.__typename) {
      return viewNoSupported(`NonMappedBlock_${key}`);
    }

    let view = BLOCKSVIEW_MAP[item.__typename];

    if(view && item?.simpleView){
      view = view[item.simpleView];
    }

    if (view && item?.view?.__typename) {
      view = view[item.view.__typename];
    }

    // console.info(`Rendering view ${view} for ${item.__typename}`, item);
    if (!view || typeof view === 'object') {
      return viewNoSupported(item.__typename, item?.view?.__typename);
    }

    const cleanItem = {
      ...item,
      ...attachProps,
      isFirst: key == 0,
      isLast: key == jsonItems.length - 1,
      key: item.__typename + "-" + key,
      asBlock: true,
      sysId: item.sys.id,
    };

    try {
      return createElement(
        view,
        { ...cleanItem },
        item[CHILDREN_KEYS_MAP[item.__typename]] &&
        jsonToReactComponents(
          item[CHILDREN_KEYS_MAP[item.__typename]].items,
        )
      );
    } catch (e) {
      console.error(`Error rendering view "${view}", message => ${e.message}`);
      return viewNoSupported(item.__typename, item?.view?.__typename);
    }
  });
};

export const attachLinksToRichtextContent = (jsonDocument, links) => {
  
  const resultDocument = JSON.parse(JSON.stringify(jsonDocument));

  if (!links) return jsonDocument;

  const { content } = jsonDocument;

  for (const kCont in content) {
      let blockInfo = null;

      switch (content[kCont].nodeType) {
          case 'embedded-asset-block':
              blockInfo = links.assets.block.find((itemLink) => itemLink.sys.id === content[kCont].data.target.sys.id);
              break;
          case 'embedded-entry-block':
              blockInfo = links.entries.block.find((itemLink) => itemLink.sys.id === content[kCont].data.target.sys.id);
              break;
          default:
              continue;
      }

      if (blockInfo && blockInfo != null) {
          resultDocument.content[kCont].data.target = blockInfo;
      }
  }

  return resultDocument;
};

export default jsonToReactComponents;
