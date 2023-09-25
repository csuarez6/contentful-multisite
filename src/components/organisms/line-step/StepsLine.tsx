import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { classNames } from '@/utils/functions';

export interface IStep {
  title: string;
  path: string;
}

export interface IStepList {
  items: IStep[];
}

const StepsLine: React.FC<IStepList> = ({ items }) => {
  const lastIndex = useRef(null);
  const router = useRouter();
  const { asPath } = router;

  const getCurrentStep = items.find((el) => el.path === asPath);
  const getIndex = items.findIndex((el) => el.path === asPath);

  useEffect(() => {
    lastIndex.current = getIndex;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  if (items?.length === 0) return;

  return (
    <div className="flex flex-col md:flex-row gap-1 justify-center mb-4">
      <p className='text-size-small text-black block md:hidden'>Paso {getIndex + 1} de {items.length}</p>
      <p className='text-size-subtitle3 mb-1 text-blue-dark block md:hidden'>{getCurrentStep.title}</p>
      <ul className='flex'>
        {
          items.map((el, idx) => (
            <li
              key={el.title}
              className='relative flex flex-col grow first:grow-0 md:grow-0 justify-between items-end md:items-center gap-3 max-md:first:w-[10px] md:w-[140px] group'
            >
              <span className={classNames(
                "absolute w-full h-[5px] bottom-[2.5px]",
                "before:absolute before:bottom-0 before:-left-1/2 before:w-full before:h-[5px] group-first:before:hidden before:bg-[#EDF5FF]",
                "after:absolute after:bottom-0 after:-left-1/2 after:h-[5px] group-first:after:hidden after:bg-lucuma after:transition-[width] after:duration-1000 after:delay-500",
                getIndex >= idx ? "after:w-full" : "after:w-0",
              )}></span>
              <span className='px-3 grow items-center font-semibold text-base text-center text-blue-dark hidden md:flex'>
                {el.title}
              </span>
              <span className={classNames(
                "relative w-[10px] h-[10px] rounded-full border-2 z-10 transition-colors duration-500",
                getIndex >= idx ? "bg-white border-lucuma" : "bg-[#EDF5FF] border-[#EDF5FF]",
                lastIndex.current < getIndex && "delay-1000"
              )}></span>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default StepsLine;
