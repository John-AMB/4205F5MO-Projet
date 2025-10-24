import { createContext } from "react";

export const AuthContext = createContext({
  //valeur par defaut
  token: null,
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});
