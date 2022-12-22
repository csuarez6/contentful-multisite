export interface IExampleComponent {
  name: string;
  view?: any;
};

const ExampleComponent: React.FC<IExampleComponent> = ({ name, view }) => {
  const { bannerWidth } = view;

  return (
    <div>
      <h1>Hola {name}</h1>

      <h2 className="text-violet-500">View bannerWidth: {bannerWidth}</h2>
      <h3 className="text-cyan-500">This is a h3 cyan</h3>
      <h4 className="text-lime-500">This is a h4 lime</h4>
      <h5 className="text-teal-500">This is a h5 teal</h5>
      <h6 className="font-dm-sans">This is a h6 with .font-dm-sans</h6>

      <p className="text-size-p1 font-mono">Paragraph 1 with .font-mono</p>
      <p className="text-size-p2">Paragraph 2</p>
      <p className="text-size-p3">Paragraph 3</p>
    </div>
  );
};

export default ExampleComponent;
