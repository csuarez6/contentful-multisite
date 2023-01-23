import Tabs from '@/components/organisms/tabs/Tabs';
import { ITabBlock } from "@/lib/interfaces/tabs-cf.interface";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const TabsBlock: React.FC<ITabBlock> = ({ title, description, tabs, isSecondary, blockId, sysId }) => {
  return (
    <section id={blockId? blockId: sysId} className="section grid gap-9">
      {(title || description) &&
        <div className="grid text-center gap-6">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <div className="text-neutral-30">{documentToReactComponents(description.json)}</div>}
        </div>
      }

      {tabs && <Tabs {...{ tabs, isSecondary }} />}
    </section>
  );
};

export default TabsBlock;
