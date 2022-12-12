import { IExampleIcons } from './ExampleIcons';
import { IIcon } from '../../atoms/icon/Icon';

const dataIcon: IIcon = {
  icon: 'none',
  size: 40,
  className: 'text-blue-dark'
};

const data: IExampleIcons = {
  name: 'Icons',
  dataIcon
};

export const mockExampleIconsProps = {
  data
};
