import { useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user, //nest pas null=>true
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
