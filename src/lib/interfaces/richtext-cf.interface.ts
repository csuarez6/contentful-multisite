import { Document as RichTextDocument } from '@contentful/rich-text-types';

export interface IRichText {
  json: RichTextDocument;
  // links?: {
  //   assets?: {
  //     block?: Array<IAssetBlock>
  //   }
  // }
}
