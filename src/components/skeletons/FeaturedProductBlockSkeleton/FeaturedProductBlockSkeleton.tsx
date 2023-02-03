import FeaturedProductSkeleton from "../FeaturedProductSkeleton/FeaturedProductSkeleton";

const FeaturedProductBlockSkeleton = () => {
  const arrItems = [1, 2, 3];

  return (
    <section className="section grid gap-9">
      {/* <div className="grid gap-9 text-center">
        <div className="mb-3 bg-gray-200 animate-pulse h-6 w-2/4"></div>

        <div className="text-blue-dark text-lg">
          <div className="mb-3 bg-gray-200 animate-pulse h-6 w-3/4"></div>
          <div className="mb-3 bg-gray-200 animate-pulse h-6 w-3/4"></div>
          <div className="mb-3 bg-gray-200 animate-pulse h-6 w-3/4"></div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 2lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {arrItems.map((el) => (
          <FeaturedProductSkeleton key={el} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProductBlockSkeleton;
