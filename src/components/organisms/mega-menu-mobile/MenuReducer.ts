const MenuReducer = (state, {type, value}) => {
  switch (type) {
    case 'setLevel':
      return {...state, ...value};
    default:
      throw new Error();
  }
};
export default MenuReducer;