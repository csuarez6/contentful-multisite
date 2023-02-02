import ServiceLine from '@/components/organisms/cards/service-line/ServiceLine';
import { INavigation } from '@/lib/interfaces/menu-cf.interface';

const ServiceLineBlock: React.FC<INavigation> = (props) => {
    const { name, promoTitle, mainNavCollection } = props;
    return (
      <section className="section grid gap-9">
        {(promoTitle || name) &&
           <h3 className="text-blue-dark">{promoTitle ?? name}</h3>
        }
        {mainNavCollection?.items?.length > 0 &&
          mainNavCollection.items.map((content) => (
            <ServiceLine key={content.promoTitle} {...content} />
          ))
        }
      </section>
    );
 
};

export default ServiceLineBlock;
