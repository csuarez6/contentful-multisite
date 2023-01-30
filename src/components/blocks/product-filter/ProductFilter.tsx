import { IProductFilterBlock } from '@/lib/interfaces/product-cf.interface';
import SelectAtom, { ISelect } from "@/components/atoms/select-atom/SelectAtom";
import FeaturedProductBlock from '../product-featured/FeaturedProductBlock';

const ProductFilterBlock: React.FC<IProductFilterBlock> = ({ products, facets }) => {
    return (
        <section className="w-full">
            <div className="flex md:justify-between">
                <div className="flex gap-6">
                    {
                        facets?.map((el: ISelect, i: number) => {
                            return (
                                <SelectAtom {...el} key={`${el.name}-${i}`} />
                            );
                        })
                    }
                </div>
            </div>
            <FeaturedProductBlock {...products} />
        </section>
    );
};

export default ProductFilterBlock;
