import IcomoonReact from "icomoon-react";
import iconSet from "../../../../public/icons-def.json";

export interface IIcon {
  size?: string | number;
  icon: string;
  className?: string;
}

const Icon: React.FC<IIcon> = ({ size = "100%", icon, className = "" }) => {
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      size={size}
      icon={icon}
    />
  );
};

export default Icon;
