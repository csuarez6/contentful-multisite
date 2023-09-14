import AuxCustomContentMinimalFragment from "../fragments/aux-custom-content-minimal.fragment";
import PageMinimalFragment from "../fragments/page-minimal.fragment";
import ProductMinimalFragment from "../fragments/product-minimal.fragment";
import { AssetImageQuery } from "./asset.gql";
import DefaultQuery from "./default.gql";

export const RichTextLinksFragments = `
  ${PageMinimalFragment}
  ${AuxCustomContentMinimalFragment}
  ${ProductMinimalFragment}
`;

export const RichtextLinksQuery = `
  json
  links {
    entries{
      block{
        ${DefaultQuery}
      }
      inline {
        ... PageMinimalFragment
        ... AuxCustomContentMinimalFragment
        ... ProductMinimalFragment
      }
    }
    assets {
      block {
        ${DefaultQuery}
        ${AssetImageQuery}
      }
    }
  }
`;
