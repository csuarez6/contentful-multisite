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

const RICHTEXT_WITH_IMAGE_JSON: RichTextDocument = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          "data": {},
          "content": [
            {
              "data": {},
              "marks": [],
              "value": "Embed Image",
              "nodeType": "text"
            }
          ],
          nodeType: BLOCKS.HEADING_3
        },
        {
          "data": {
            "target": {
              "sys": {
                "id": "6Nj4PW7b2tAatXWm7aFi2N",
                "type": "Link",
                "linkType": "Asset"
              },
              "title": "Tab Servicio Vanti Listo",
              "url": "https://images.ctfassets.net/3brzg7q3bvg1/6Nj4PW7b2tAatXWm7aFi2N/ea4693a84d8a96341964673fb48c256c/tabServicioVantiListo.png",
              "description": "Tab Servicio Vanti Listo",
              "width": 435,
              "height": 444
            },
          },
          "content": [],
          nodeType: BLOCKS.EMBEDDED_ASSET
        },
        {
          "data": {},
          "content": [
            {
              "data": {},
              "marks": [],
              "value": "",
              "nodeType": "text"
            }
          ],
          nodeType: BLOCKS.PARAGRAPH
        }
      ],
    }
  ]
};

export const RICHTEXT_SHORT_SIMPLE: IRichText = {
  json: RICHTEXT_SHORT_SIMPLE_JSON
};

export const RICHTEXT_WITH_IMAGE: IRichText = {
  json: RICHTEXT_WITH_IMAGE_JSON
};
