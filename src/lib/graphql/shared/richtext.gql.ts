import BlockFormQuery from "../blocks/form-content.gql";
import ViewAccordionQuery from "../views/accordion.gql";
import ViewFeatured from "../views/featured.gql";
import ViewInformationCards from "../views/info-card.gql";
import ViewListWithIcons from "../views/list-with-icons.gql";
import ViewRichText from "../views/richText.gql";
import ViewSecondaryBanner from "../views/secondaryBanner.gql";
import ViewServicesCard from "../views/services-card.gql";
import { AssetImageQuery } from "./asset.gql";
import DefaultQuery from "./default.gql";

const blockPromoRichText = `
  ${DefaultQuery}
  name
  title
  pretitle
  subtitle
  description {
    json
  }
  ctaCollection {
    items {
      ...on Page {
        ${DefaultQuery}
      }
      ...on Product {
        ${DefaultQuery}
      }
      ...on AuxCustomContent {
        ${DefaultQuery}
      }
    }
  }
  featuredContentsCollection {
    items {
      ...on Page {
        ${DefaultQuery}
      }
      ...on Product {
        ${DefaultQuery}
      }
      ...on AuxCustomContent {
        ${DefaultQuery}
      }
      ...on BlockPromoContent{
        ${DefaultQuery}
      } 
    }
  }
  listedContentsCollection {
    items {
      ...on Page {
        ${DefaultQuery}
      }
      ...on Product {
        ${DefaultQuery}
      }
      ...on AuxCustomContent {
        ${DefaultQuery}
      }
    }
  }
  image {
    ${AssetImageQuery}
  }
  simpleView
  view {
    ...on ViewAccordion {
      ${ViewAccordionQuery}
    }
    ...on ViewServicesCard {
      ${ViewServicesCard}
    }
    ...on ViewRichText{
      ${ViewRichText}
    }
    ...on ViewInformationCards{
      ${ViewInformationCards}
    }
    ...on ViewListWithIcons {
      ${ViewListWithIcons}
    }
    ...on ViewSecondaryBanner{
      ${ViewSecondaryBanner}
    }
    ...on ViewFeatured{
      ${ViewFeatured}
    }
    
  }
  blockId
  promoIcon
`;

export const RichtextLinksQuery = `
  links {
    entries{
      block{
        ...on BlockPromoContent{
          ${blockPromoRichText}
        }
        ...on BlockForm{
          ${BlockFormQuery}
        }
        ...on Page{
          ${DefaultQuery}
          promoTitle
          promoDescription {
            json
          }
          promoImage {
            ${AssetImageQuery}
          }
          promoIcon
        }
      }
      inline {
        __typename
        sys {
          id
          __typename
        }
      }
    }
    assets {
      block {
        sys {
          id
        }
        fileName
        contentType
        ${AssetImageQuery}
      }
    }
  }
`;
