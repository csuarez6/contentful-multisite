import { IProductDetails } from '@/lib/interfaces/product-cf.interface';
import SelectAtom from "@/components/atoms/select-atom/SelectAtom";
import FeaturedProductBlock from '../product-featured/FeaturedProductBlock';

const ProductFilterBlock: React.FC<IProductDetails> = ({ products, dataSelect }) => {
    return (
        <section className="w-full">
            <div className="flex md:justify-between">
                <div className="flex gap-6">
                    {
                        dataSelect?.map((el, i) => {
                            return (
                                <SelectAtom {...el} key={i} />
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
