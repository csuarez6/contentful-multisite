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
      return {
        background: "bg-white",
        title: "text-blue-dark",
        text: "text-neutral-30"
      };
    case "Negro":
      return {
        background: "bg-black",
        title: "text-white",
        text: "text-white"
      };
    case "Gris":
      return {
        background: "bg-grey-120",
        title: "text-blue-dark",
        text: "text-neutral-30"
      };
    case "Gris Claro":
      return {
        background: "bg-grey-100",
        title: "text-blue-dark",
        text: "text-neutral-30"
      };
    case "Azul":
      return {
        background: "bg-neutral-80",
        title: "text-blue-dark",
        text: "text-neutral-30"
      };
    case "Azul Degradado":
      return {
        background: "bg-gradient-blue",
        title: "text-white",
        text: "text-white"
      };
    case "Azul Degradado Oscuro":
      return {
        background: "bg-gradient-blue-dark",
        title: "text-white",
        text: "text-white"
      };
    case "Azul profundo":
      return {
        background: "bg-sky-900",
        title: "text-white",
        text: "text-white"
      };
    case "Azul Oscuro":
      return {
        background: "bg-blue-dark",
        title: "text-white",
        text: "text-white"
      };
    case "Verde":
      return {
        background: "bg-green-900",
        title: "text-white",
        text: "text-white"
      };
    case "Violeta":
      return {
        background: "bg-indigo-900",
        title: "text-white",
        text: "text-white"
      };
    default:
      return {
        background: "bg-transparent",
        title: "text-blue-dark",
        text: "text-neutral-30"
      };
  }
};

export const getTextAlignClass = (align) => {
  switch (align) {
    case "Izquierda":
      return "text-left";
    case "Centrado":
      return "text-center";
    default:
      return "text-center";
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

export const getAlign = (name) => {
  switch (name) {
    case "Centro":
      return "center";
    case "Izquierda":
      return "left";
    case "Derecha":
      return "right";
    default:
      return "center";
  }
};