import Tabs from '@/components/organisms/tabs/Tabs';
import { ITabBlock } from "@/lib/interfaces/tabs-cf.interface";

const TabsBlock: React.FC<ITabBlock> = ({ title, description, tabs, isSecondary }) => {
  return (
    <section className="section grid gap-9">
      {(title || description) &&
        <div className="grid text-center gap-6">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <p className="text-neutral-30">{description}</p>}
        </div>
      }

      {tabs && <Tabs {...{ tabs, isSecondary }} />}
    </section>
  );
};

export default TabsBlock;
