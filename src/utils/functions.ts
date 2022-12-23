const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const classColumns = (columns = 1) => {
  const classes = ["grid-cols-1"];
  if (columns > 1) classes.push("md:grid-cols-2");
  if (columns > 2) classes.push("lg:grid-cols-3");
  if (columns > 3) classes.push("xl:grid-cols-4");
  if (columns > 4) classes.push("2xl:grid-cols-5");
  return classes.join(" ");
};

export { classNames, classColumns };