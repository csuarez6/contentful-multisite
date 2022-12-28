import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IAccordionBlock } from "@/lib/interfaces/accordion-cf.interface";
import Accordion from "@/components/organisms/accordion/Accordion";

const AccordionBlock: React.FC<IAccordionBlock> = ({
  title,
  description,
  featuredContentsCollection
}) => {
  return (
    <section className="section flex flex-col gap-8">
      {(title || description) && (
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark title is-1">{title}</h2>}
          {description && (
            <div className="text-blue-dark">
              {documentToReactComponents(description.json)}
            </div>
          )}
        </div>
      )}
      {featuredContentsCollection && <Accordion featuredContents={featuredContentsCollection} />}
    </section>
  );
};

export default AccordionBlock;
