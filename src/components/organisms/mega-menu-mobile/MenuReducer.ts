const MenuReducer = (state, action) => {
  switch (action.type) {
    case 'setLevel':
      return {level: action.value};
    default:
      throw new Error();
  }
};
export default MenuReducer;