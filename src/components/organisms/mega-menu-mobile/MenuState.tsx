import { useReducer } from "react";
import reducer from "./MenuReducer";
import MenuContext from "./MenuContext";

const initialState = {
  panel: false
};

const MenuState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MenuContext.Provider value={{state, dispatch}}>
      {children}
    </MenuContext.Provider>
    );
};

export default MenuState;