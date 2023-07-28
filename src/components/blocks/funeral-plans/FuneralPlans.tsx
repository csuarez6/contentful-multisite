import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { classNames } from "@/utils/functions";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { dataPlans } from "./FuneralPlans.data";

const FuneralPlansBlock: React.FC<IPromoBlock> = ({ title, description, blockId, sysId }) => {
  return (
    <section id={blockId? blockId: sysId} className="section grid gap-9">
      {(title || description) &&
        <div className="grid text-center gap-6">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <div className="text-neutral-30">{documentToReactComponents(description.json)}</div>}
        </div>
      }

      <Tab.Group as="div" className="grid gap-6">
        <div className="flex justify-center overflow-x-auto">
          <div className="flex border-b border-transparent">
            <Tab.List className="flex">
              {dataPlans?.items?.map((tab) =>
                <Tab
                  key={tab.title}
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "border-lucuma text-blue-dark"
                        : "border-neutral-80 hover:border-lucuma text-grey-60",
                      "flex flex-col items-center gap-[10px] shrink-0 grow focus:outline-none border-b-2 p-5 pt-1"
                    )
                  }
                >
                  <span className="title is-3">{tab.title}</span>
                </Tab>
              )}
            </Tab.List>
          </div>
        </div>

        <Tab.Panels as={Fragment}>
          {dataPlans?.items?.map((tab) => (
            <Tab.Panel key={tab.title} className="grid gap-6 focus:outline-none">
              {tab.description && (<p className="text-size-p1 text-center text-grey-30">{tab.description}</p>)}
              {tab.table && (
                <div className="flex">
                  <table className="table-auto w-full border-separate rounded-lg border-spacing-0 border border-neutral-80 overflow-hidden">
                    <thead>
                      <tr>
                        <th className="px-6 py-4 title is-4 bg-grey-90 text-grey-10 !font-semibold w-[304px]"></th>
                        {tab.table.headings.map(el => (
                          <th className="px-6 py-4 title is-4 bg-neutral-90 text-grey-10 !font-semibold" key={el}>{el}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tab.table?.rows.map((el, idx) => (
                        <tr key={`${tab.title}-${idx}`}>
                          {el.items?.map(el => (
                            <td
                              key={el}
                              className={classNames(
                                "px-6 py-4 first:bg-grey-90 border-t border-neutral-80 text-center first:text-left text-grey-30 first:text-grey-10 leading-none",
                                idx === 0 ? "title is-3 first:font-normal first:text-size-p1" : "text-size-p1"
                              )}
                            >
                              {!el.list && el}
                              {el.list && (
                                <ul className="list-disc flex flex-col items-center text-grey-30  leading-none">
                                  {el.list.map(el => (<li key={el}>{el}</li>))}
                                </ul>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};

export default FuneralPlansBlock;
