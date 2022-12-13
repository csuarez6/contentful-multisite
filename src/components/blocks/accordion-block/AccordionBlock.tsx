import React from 'react';
import { IAccordionBlock } from '@/lib/interfaces/accordion-cf.interface';
import Accordion from '@/components/organisms/accordion/Accordion';

const AccordionBlock: React.FC<IAccordionBlock> = ({ title, description, content }) => {
    return (
        <section className='flex flex-col gap-8'>
            {(title || description) &&
                <div className="grid gap-9 text-center">
                    {title && <h2 className="text-blue-dark title is-1">{title}</h2>}
                    {description && <p className="text-blue-dark">{description}</p>}
                </div>
            }
            {
                content && <Accordion listedContent={content} />
            }
        </section>
    );
};

export default AccordionBlock;