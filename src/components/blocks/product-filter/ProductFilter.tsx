import { IProductFilterBlock } from "@/lib/interfaces/product-cf.interface";
import SelectAtom, { ISelect } from "@/components/atoms/select-atom/SelectAtom";
import FeaturedProductBlock from "../product-featured/FeaturedProductBlock";
import { useRouter } from "next/router";

const ProductFilterBlock: React.FC<IProductFilterBlock> = ({
  products,
  facets,
}) => {
  const router = useRouter();

  const onFacetChange = (key, value) => {
    const { pathname, search: uri } = location;
    let newUri = "";

    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf("?") !== -1 ? "&" : "?";

    if (uri.match(re)) {
      newUri = uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      newUri = uri + separator + key + "=" + value;
    }

    router.push(pathname + newUri);
  };

  return (
    <section className="w-full">
      <div className="flex md:justify-between">
        <div className="flex gap-6">
          {facets?.map((el: ISelect, i: number) => {
            return (
              <SelectAtom
                {...el}
                key={`${el.name}-${i}`}
                handleChange={(value) => onFacetChange(el.name, value)}
              />
            );
          })}
        </div>
      </div>
      <FeaturedProductBlock {...products} />
    </section>
  );
};

export default ProductFilterBlock;
