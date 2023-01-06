export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const classColumns = (columns = 1) => {
  const classes = ["grid-cols-1"];
  if (columns > 1) classes.push("md:grid-cols-2");
  if (columns > 2) classes.push("lg:grid-cols-3");
  if (columns > 3) classes.push("xl:grid-cols-4");
  if (columns > 4) classes.push("2xl:grid-cols-5");
  return classes.join(" ");
};

export const getBackgroundColorClass = (name) => {
  switch (name) {
    case "Blanco":
      return "bg-white";
    case "Negro":
      return "bg-black";
    case "Gris":
      return "bg-grey-120";
    case "Gris Claro":
      return "bg-grey-100";
    case "Azul":
      return "bg-neutral-80";
    case "Azul Degradado":
      return "bg-gradient-blue";
    case "Azul Degradado Oscuro":
      return "bg-gradient-blue-dark";
    default:
      return "bg-transparent";
  }
};

export const getButtonType = (type) => {
  switch (type) {
    case "Primario":
      return "button-primary";
    case "Secundario":
      return "button-secondary";
    case "Contorno":
      return "button-outline";
    default:
      return "text-button";
  }
};