import { Document as RichTextDocument } from '@contentful/rich-text-types';
import { IImageAsset } from './assets-cf.interface';

export interface IRichText {
  json: RichTextDocument;
  links?: {
    assets?: {
      block?: Array<IImageAsset>
    }
  }
}
