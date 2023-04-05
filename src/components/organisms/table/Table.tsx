import Icon from "@/components/atoms/icon/Icon";
import {useState, useEffect, useRef} from "react";

const Table = ({children}) => {
  const tableEl = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    window.onresize = () => {
      if(window.innerWidth >= 768){
        setCurrentPage(1);
      };
    };
  }, []);

  useEffect(() => {
    const table = tableEl.current;
    setRows(table.querySelectorAll("tr"));
    setColumns(table.querySelectorAll("tr:first-child > *"));
  }, [children]); 

  useEffect(() => {
    const page = [];
    columns?.forEach((item, index, arr) => {
      if(index > 0){
        page.push(index);
      };

      if(index == (arr.length - 1))
        setPages(page);
    });
  }, [columns]); 

  useEffect(() => {
    rows.forEach(item => {
      item.scrollLeft = (currentPage - 1) * (item?.clientWidth / 2);
    });
  }, [currentPage, rows]); 

  const prevPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    };
  };

  const nextPage = () => {
    if(currentPage < pages.length){
      setCurrentPage(currentPage + 1);
    };
  };

  const setPage = (i) => {
    setCurrentPage(i);
  };

  return (
    <>
      {
        Boolean(pages.length) &&
        <ul className="flex md:hidden flex-wrap items-center justify-center gap-4">
          <li className="w-8 list-none">
            <span onClick={prevPage} className="cursor-pointer text-neutral-20">
              <Icon icon="arrow-left"></Icon>
            </span>
          </li>
          { pages.map((i, index) => (
            <li  className="list-none" key={`dot_${index}`}>
              <span onClick={() => {setPage(i);}} className={`${currentPage == i ? "w-3.5 bg-yellow-500" : "w-3 bg-gray-200"} cursor-pointer block  aspect-square rounded-full`}></span>
            </li>
          ))}
          <li className="w-8 list-none">
            <span onClick={nextPage} className="cursor-pointer text-neutral-20">
              <Icon icon="arrow-right"></Icon>
            </span>
          </li>
        </ul>
      }
      <table ref={tableEl} className="table-auto w-full border-separate rounded-lg border-spacing-0 border border-neutral-80 overflow-hidden mb-6">
        <tbody className="flex flex-col md:table-row-group w-full">{children}</tbody>
      </table>
    </>
  );
};

export default Table;