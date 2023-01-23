import Icon from "@/components/atoms/icon/Icon";
import { classNames } from '../../../../utils/functions';

export interface IHeadingCard {
  children?: React.ReactNode;
  title?: string;
  icon?: string;
  classes?: string;
  headClasses?: string;
  isCheck?: boolean;
  hideCheck?: boolean;
}

/**
  * Componente HeadingCard
  *
  * @component
  *
  * @param {ReactNode} children Contenido body(HTML) para card.
  * @param {string} title título cabecera card.
  * @param {string} icon ícono a la izquierda del título de cabecera card.
  * @param {string} classes clases CSS para card completa (head y body).
  * @param {string} headClasses clases CSS para head card.
  * @param {boolean} isCheck Verifica estado check ícono a la derecha de cabecera card.
  * @param {boolean} hideCheck deshabilitar ícono check de la derecha de cabecera card.
  *
  */

const HeadingCard: React.FC<IHeadingCard> = ({
  children,
  title,
  icon,
  classes,
  headClasses,
  isCheck,
  hideCheck
}) => {
  return (
    <div className={classNames("w-full rounded-xl shadow-[-2px_-2px_0px_0px_rgb(0,0,0,0.04),2px_2px_4px_0px_rgb(0,0,0,0.08)]", classes)}>
      <div className={classNames(
        "flex flex-wrap justify-between p-[18px] border-b border-gray-200 rounded-t-lg bg-neutral-90 items-center",
        headClasses
      )}
      >
        <div className="flex gap-3">
          {icon &&
            <span className="flex text-neutral-30 items-center shrink-0 w-6 h-6">
              <Icon icon={icon} className="w-full h-full" aria-hidden="true" />
            </span>
          }
          <span>{title}</span>
        </div>
        {!hideCheck &&
          <span className="flex text-neutral-30 items-center shrink-0 w-[34px] h-[34px]">
            <Icon icon={isCheck ? 'check' : 'loader'} className="w-full h-full text-blue-dark" aria-hidden="true" />
          </span>
        }
      </div>
      <div id="Content" className="p-6">
        {children}
      </div>
    </div>
  );
};

export default HeadingCard;
