import IcomoonReact from "icomoon-react";
import iconSet from "../../../../public/icons-def.json";

export interface IIcon {
  color?: string;
  size?: string | number;
  icon: string;
  className?: string;
}

const Icon: React.FC<IIcon> = (props) => {
  const { color = "currentColor", size = "100%", icon, className = "" } = props;
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      color={color}
      size={size}
      icon={icon}
    />
  );
};

export default Icon;
