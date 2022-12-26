import RpoForm from '@/components/organisms/forms/rpo-form/RpoForm';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const RpoFormBlock: React.FC<IPromoBlock> = ({ title, description, listedForm }) => {
  return (
    <section className="grid gap-9">
      {(title || description) && 
        <div className="grid gap-9 text-center">
          <h2 className="text-blue-dark">{title}</h2>
          <p className="text-blue-dark">{description}</p>
        </div>
      }
      {listedForm && <RpoForm {...listedForm} />}
    </section>
  );
};

export default RpoFormBlock;
