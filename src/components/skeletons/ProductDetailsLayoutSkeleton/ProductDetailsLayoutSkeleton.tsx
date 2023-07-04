const ProductDetailsLayoutSkeleton = () => {
  return (
    <article className="bg-white rounded-[20px] p-6 shadow-[-2px_-2px_0px_0px_rgb(0,0,0,0.04),2px_2px_4px_0px_rgb(0,0,0,0.08)] w-full h-fit">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="mb-1 h-8 bg-gray-200 animate-pulse"></div>
          <div className="mb-3 h-px bg-gray-200 animate-pulse border-b border-blue-dark"></div>
        </div>

        <div className="flex flex-col gap-[7px]">
          <div className="mb-3 bg-gray-200 animate-pulse h-4 w-3/4"></div>
          <div className="mb-3 bg-gray-200 animate-pulse h-4 w-2/5"></div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between flex-nowrap gap-2">
              <div className="mb-3 bg-gray-200 animate-pulse h-4 w-2/5"></div>
              <div className="mb-3 bg-gray-200 animate-pulse h-4 w-16"></div>
            </div>

            <div className="mb-3 h-px bg-gray-200 animate-pulse border-b border-neutral-30"></div>
          </div>

          <div className="flex justify-between flex-nowrap gap-2">
            <div className="mb-3 bg-gray-200 animate-pulse h-4 w-2/5"></div>
            <div className="mb-3 bg-gray-200 animate-pulse h-4 w-16"></div>
          </div>
          <div className="flex justify-between flex-nowrap gap-2">
            <div className="mb-3 bg-gray-200 animate-pulse h-4 w-3/5"></div>
            <div className="mb-3 bg-gray-200 animate-pulse h-4 w-16"></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetailsLayoutSkeleton;
