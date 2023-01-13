import { IProductDetails } from '@/lib/interfaces/product-cf.interface';
import SelectAtom from "@/components/atoms/select-atom/SelectAtom";
import FeaturedProductBlock from '../product-featured/FeaturedProductBlock';
import { data } from "../product-featured/FeaturedProductBlock.mock";

const ProductFilterBlock: React.FC<IProductDetails> = ({ dataSelect }) => {
    return (
        <section className="container mx-auto">
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
            <FeaturedProductBlock {...data} />
        </section>
    );
};

export default ProductFilterBlock;
