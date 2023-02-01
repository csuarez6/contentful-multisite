const MenuReducer = (state, action) => {
  switch (action.type) {
    case 'toggle':
      return {panel: !state.panel};
    case 'open':
      return {panel: true};
    case 'close':
      return {panel: false};
    default:
      throw new Error();
  }
};
export default MenuReducer;