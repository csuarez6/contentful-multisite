import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import LeftFeatured from "@/components/organisms/cards/left-featured/LeftFeatured";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { keys } from "lodash";

const LeftFeaturedBlock: React.FC<IPromoBlock> = ({title,description, featuredContentsCollection}) => {
  return (
    <section className="grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          <h2 className="text-blue-dark title is-1">{title} </h2>
          <div className="text-blue-dark">{documentToReactComponents(description.json)}</div>
        </div>
      }
      {featuredContentsCollection?.items?.map((contentCollection, id) => (      
        <LeftFeatured {...contentCollection} key={id}/>
      ))}
    </section>
  );
};

export default LeftFeaturedBlock;
