import { Document as RichTextDocument } from '@contentful/rich-text-types';
import { IRichText } from "@/lib/interfaces/richtext-cf.interface";
import { BLOCKS } from "@contentful/rich-text-types";

const RICHTEXT_SHORT_SIMPLE_JSON: RichTextDocument = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
          marks: [],
          data: {}
        }
      ]
    }
  ]
};

export const RICHTEXT_SHORT_SIMPLE: IRichText = {
  json: RICHTEXT_SHORT_SIMPLE_JSON
};
