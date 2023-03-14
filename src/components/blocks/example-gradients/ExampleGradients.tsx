import { classNames, getBackgroundColorClass } from "@/utils/functions";

export interface IExampleGradients {
  backgrounds: string[];
};

const ExampleGradients: React.FC<IExampleGradients> = ({ backgrounds }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {backgrounds.map((el) => {
        const backgroundColor = getBackgroundColorClass(el);
        return (
          <div
            key={el}
            className={
              classNames(
                "p-4 rounded-lg",
                backgroundColor.background
              )
            }
          >
            <p className={
              classNames(
                "title is-4",
                backgroundColor.title
              )
            }>
              Nombre: {el}
            </p>
            <p className={
              classNames(
                backgroundColor.text
              )
            }>
              Lorem ipsum dolor sit amet.
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ExampleGradients;
