import { useRouter } from 'next/router';
import { classNames } from '@/utils/functions';

export interface IStep {
  title: string;
  path: string;
}

export interface IStepList {
  items: IStep[];
}

const StepsLine: React.FC<IStepList> = ({ items }) => {
  const router = useRouter();
  const { asPath } = router;
  if (items?.length === 0) return;

  const getCurrentStep = items.find((el) => el.path === asPath);
  const getIndex = items.findIndex((el) => el.path === asPath);

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
                "before:absolute before:bottom-0 before:left-0 before:w-full md:before:w-1/2 before:h-[5px] group-first:before:hidden",
                "md:after:absolute md:after:bottom-0 md:after:right-0 md:after:w-1/2 md:after:h-[5px] md:group-last:after:hidden",
                getIndex < idx ? "before:bg-[#EDF5FF]" : "before:bg-lucuma",
                getIndex <= idx ? "after:bg-[#EDF5FF]" : "after:bg-lucuma",
              )}></span>
              <span className='px-3 grow items-center font-semibold text-base text-center text-blue-dark hidden md:flex'>
                {el.title}
              </span>
              <span className={classNames(
                "relative w-[10px] h-[10px] rounded-full border-2",
                getIndex >= idx ? "bg-white border-lucuma" : "bg-[#EDF5FF] border-[#EDF5FF]"
              )}></span>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default StepsLine;
