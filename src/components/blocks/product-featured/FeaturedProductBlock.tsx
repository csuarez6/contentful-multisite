import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import { IProductDetails } from '@/lib/interfaces/product-cf.interface';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import FeaturedProduct from '@/components/organisms/cards/featured-product/FeaturedProduct';
import React from 'react';

export interface IFeaturedProductBlock extends IPromoBlock {
    listedContent?: IProductDetails[];
}

const FeaturedProductBlock: React.FC<IFeaturedProductBlock> = ({ title, description, listedContent }) => (
    <section className='section grid gap-9'>
        {(title || description) &&
            <div className="grid gap-9 text-center">
                {title && <h2 className="text-blue-dark">{title}</h2>}
                {description && <div className="text-blue-dark text-lg">{documentToReactComponents(description.json)}</div>}
            </div>
        }
        {listedContent.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 2lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {listedContent.map((el) => (
                    <FeaturedProduct {...el} key={el.productName} />
                ))}
            </div>
        )}
    </section>
);

export default FeaturedProductBlock;