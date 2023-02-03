const FeaturedProductSkeleton = () => {
  return (
    <article className="featured-product bg-white p-6 rounded-[10px] shadow-card-overview flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <div className="mb-3 bg-gray-200 animate-pulse w-full aspect-[336/291]"></div>
      </div>

      <div className="flex flex-col gap-[25px]">
        <div className="flex flex-col gap-[7px]">
          <div className="flex justify-between flex-wrap items-center gap-1">
            <div className="mb-3 bg-gray-200 animate-pulse h-6 w-3/4"></div>
          </div>
          <div className="mb-3 bg-gray-200 animate-pulse h-4 w-2/4"></div>
        </div>

        <div className="mb-3 bg-gray-200 animate-pulse h-6 w-3/4"></div>
      </div>
    </article>
  );
};

export default FeaturedProductSkeleton;
