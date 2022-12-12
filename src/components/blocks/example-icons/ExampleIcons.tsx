import iconSet from "../../../../public/icons-def.json";
import Icon, { IIcon } from '../../atoms/icon/Icon';

export interface IExampleIcons {
  name?: string,
  dataIcon: IIcon
};

const ExampleIcons: React.FC<IExampleIcons> = ({ name, dataIcon }) => {
  const listIcons = [...iconSet.icons].map(item => {
    const newIcon: IIcon = {
      icon: item.properties.name
    };

    return {...dataIcon, ...newIcon};
  }).sort((a, b) => a.icon.localeCompare(b.icon));

  return (
    <div className="p-2">
      <h1>{name}</h1>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 grid-flow-row gap-4">
        {listIcons.map(item => (
          <div className="grid gap-4" key={item.icon}>
            <p>name: <span className="bg-neutral-200 rounded block"><code>{item.icon}</code></span></p>
            <Icon {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExampleIcons;
