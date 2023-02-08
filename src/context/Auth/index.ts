import { createContext } from "react";
import { CommerceLayerClient, Customer } from "@commercelayer/sdk";

export interface IAuth {
  isLogged: boolean;
  user: Customer;
  clientLogged: CommerceLayerClient;
}

const AuthContext = createContext<IAuth>({
  isLogged: false,
  user: undefined,
  clientLogged: undefined,
});

export default AuthContext;
