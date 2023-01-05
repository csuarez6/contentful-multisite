import RpoForm from '@/components/organisms/forms/rpo-form/RpoForm';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const RpoFormBlock: React.FC<IPromoBlock> = ({ title, description, listedForm }) => {
  return (
    <section className="section grid gap-9">
      {(title || description) && 
        <div className="grid gap-9 text-center">
          <h2 className="text-blue-dark">{title}</h2>
          <div className="text-blue-dark">{documentToReactComponents(description.json)}</div>
        </div>
      }
      {listedForm && <RpoForm {...listedForm} />}
    </section>
  );
};

export default RpoFormBlock;
