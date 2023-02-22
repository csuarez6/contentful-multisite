import { IFormBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import IdentityForm from "@/components/organisms/forms/identity-form/IdentityForm";
import InquiryForm from '@/components/organisms/forms/inquiry-form/InquiryForm';

const InquiryFormBlock: React.FC<IFormBlock> = ({ title, description, simpleView, blockId, sysId }) => {
  return (
    <section id={blockId ? blockId : sysId} className="section grid gap-7 md:gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          <h2 className="text-blue-dark">{title}</h2>
          <div className="text-blue-dark">{documentToReactComponents(description?.json)}</div>
        </div>
      }

      {simpleView !== "Identidad" && <InquiryForm {...{ simpleView }} />}
      {simpleView === "Identidad" && <IdentityForm />}
    </section>
  );
};

export default InquiryFormBlock;
