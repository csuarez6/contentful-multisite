import { classNames } from "@/utils/functions";
import { useMemo, useState } from "react";

interface IPaginationsProps {
  pageRange: number;
  currentPage: number;
  totalPages: number;
  onPage: (value: number) => void;
}

export default function NumberPage({
  currentPage,
  pageRange,
  totalPages,
  onPage,
}: IPaginationsProps) {
  //eslint-disable-next-line
  const [pageSize, setPageSize] = useState(pageRange);
  const startPageMemo = useMemo(() => {
    if (totalPages - currentPage < pageSize) {
      return totalPages - pageSize;
    }
    return currentPage + 1;
  }, [pageSize, totalPages, currentPage]);

  const lastPageMemo = useMemo(() => {
    const lastPage = currentPage + pageSize;
    if (lastPage < totalPages) return lastPage;

    return totalPages;
  }, [pageSize, totalPages, currentPage]);
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
    if (currentPage + 1 <= pageSize) return 1;
    return currentPage + 1 - pageSize;
  }, [currentPage, pageSize]);
  const forwardNumberMemo = useMemo(() => {
    if (currentPage + 1 + pageSize > totalPages) return totalPages;
    return currentPage + 1 + pageSize;
  }, [currentPage, pageSize, totalPages]);

  return (
    <li className="flex gap-2">
      <div>
        {currentPage + 1 > 2 && (
          <button
            onClick={() => onPage(backNumberMemo)}
            className="hover:border-blue-dark"
          >
            ...
          </button>
        )}
      </div>
      <div className="flex gap-2">
        {range(startPageMemo, lastPageMemo).map((page: number, key) => (
          <button
            className={classNames(
              "blue-dark bg-white px-2 py-1 text-sm font-normal border-b border-solid underline-animated-1",
              page === currentPage + 1
                ? "border-blue-dark"
                : "border-transparent"
            )}
            key={key}
            onClick={() => onPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <div>
        {currentPage + pageSize < totalPages && (
          <button
            onClick={() => onPage(forwardNumberMemo)}
            className="hover:border-blue-dark"
          >
            ...
          </button>
        )}
      </div>
    </li>
  );
}
