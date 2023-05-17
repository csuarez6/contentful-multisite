import "@/styles/tabs.css";
import { ITabBlock, ITab } from "@/lib/interfaces/tabs-cf.interface";
import { useState } from "react";
import { classNames } from '@/utils/functions';

const Tabs: React.FC<ITabBlock> = ({ tabs, isSecondary }) => {
    const [currentActive, setCurrentActive] = useState(0);

    return (
        <div className="block">
            {/* items tabs */}
            <nav
                className={classNames(
                    isSecondary ? 'bg-neutral-90 rounded-lg overflow-hidden' : 'bg-transparent',
                    'isolate flex'
                )}
                aria-label="Tabs">
                {tabs?.map((tab: ITab, tabIdx: number) => (
                    <a
                        key={tab.name}
                        onClick={() => setCurrentActive(tabIdx)}
                        className={classNames(
                            isSecondary ? 'tablinks_sec' : 'tablinks',
                            currentActive === tabIdx ? 'active' : ''
                        )}
                        aria-current={currentActive === tabIdx ? 'page' : undefined}
                        data-testid={tabIdx}
                    >
                        <h3>{tab.name}</h3>
                        {!isSecondary && <span aria-hidden="true" />}
                    </a>
                ))}
            </nav>
            {/* content tabs */}
            {tabs?.map((tab: ITab, tabIdx: number) => (
                <div
                    key={`content-` + tab.name}
                    id={`tab-` + tabIdx}
                    className={classNames(
                        'tabcontent',
                        currentActive === tabIdx ? 'block' : 'hidden'
                    )}
                >
                    <h3>Título {tabIdx}</h3>
                    <p>Descripción {tabIdx}.</p>
                </div>
            ))}
        </div>
    );
};

export default Tabs;
