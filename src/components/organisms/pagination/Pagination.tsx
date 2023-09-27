import { useMemo } from "react";
import { classNames } from "@/utils/functions";

interface IPaginationProps {
  pageRange: number;
  currentPage: number;
  totalPages: number;
  onPage?: (value: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  pageRange,
  totalPages,
  onPage = () => null,
}) => {
  const startPageMemo = useMemo(() => {
    if (totalPages - currentPage < pageRange) {
      const startPage = totalPages - pageRange;
      return startPage > 0 ? startPage : 1;
    }
    else return currentPage + 1;
  }, [pageRange, totalPages, currentPage]);

  const lastPageMemo = useMemo(() => {
    const lastPage = currentPage + pageRange;
    if (lastPage < totalPages) return lastPage;
    else return totalPages;
  }, [pageRange, totalPages, currentPage]);

  const range = (start: number, end: number) => {
    const arr = [];
    let num = start;

    while (num <= end) {
      arr.push(num);
      num++;
    }
    return arr;
  };

  const backNumberMemo = useMemo(() => {
    if (currentPage + 1 <= pageRange) return 1;
    else return (currentPage + 1) - pageRange;
  }, [currentPage, pageRange]);

  const forwardNumberMemo = useMemo(() => {
    if (currentPage + 1 + pageRange > totalPages) return totalPages;
    else return currentPage + 1 + pageRange;
  }, [currentPage, pageRange, totalPages]);

  return (
    <div className="block w-full my-4 mb-12">
      <ul className="flex flex-row items-center justify-center w-full gap-1">
        <li>
          <button
            onClick={() => onPage(currentPage)}
            className={classNames(
              "py-1 mx-2 text-sm font-normal bg-white text-blue-dark whitespace-nowrap disabled:opacity-50",
              currentPage > 0 && "underline-animated-1"
            )}
            disabled={currentPage === 0}
          >
            &lt; <span className="hidden md:inline-block md:pl-2">Anterior</span>
          </button>
        </li>

        <li className="flex gap-2">
          {currentPage + 1 > 2 && (
            <button
              onClick={() => onPage(backNumberMemo)}
              className="hover:border-blue-dark"
            >
              ...
            </button>
          )}
          <div className="flex gap-2">
            {range(startPageMemo, lastPageMemo).map((page: number) => (
              <button
                className={classNames(
                  "text-blue-dark px-2 py-1 text-sm font-normal underline-animated-1",
                  page === currentPage + 1 && "underline-animated-full-1"
                )}
                key={page}
                onClick={() => onPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          {currentPage + pageRange < totalPages && (
            <button
              onClick={() => onPage(forwardNumberMemo)}
              className="hover:border-blue-dark"
            >
              ...
            </button>
          )}
        </li>

        <li>
          <button
            onClick={() => onPage(currentPage + 2)}
            className={classNames(
              "py-1 mx-2 text-sm font-normal bg-white text-blue-dark whitespace-nowrap disabled:opacity-50",
              currentPage + 1 < totalPages && "underline-animated-1"
            )}
            disabled={currentPage + 1 === totalPages}
          >
            <span className="hidden md:inline-block md:pr-2">Siguiente</span>  &gt;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;