import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactNode } from 'react';
import CustomTable from './CustomTable';
import { mockTabsProps } from './CustomTable.mocks';

interface ITable {
  children: ReactNode;
  table: any;
}

export default {
  title: 'Organisms/CustomTable',
  component: CustomTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof CustomTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomTable> = (args: ITable) => (
  <CustomTable>
    {
      args.table?.map((item, i) => (
        <tr key={`tr_${i}`} className="bg-white overflow-hidden pointer-events-none scroll-smooth flex md:table-row w-full">
          {
            item?.map((value, v) => (
              <td key={`td_${v}`} className="pointer-events-auto first:sticky left-0 block w-1/2 flex-shrink-0 md:table-cell md:w-auto first:bg-gray-200 py-2 px-3 leading-tight">
                {value}
              </td>
            ))
          }
        </tr>
      ))
    }
  </CustomTable>
);

export const Base = Template.bind({});
Base.args = {
  ...mockTabsProps.dataTable,
};
