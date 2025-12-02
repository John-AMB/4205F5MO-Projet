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
  const updateUser = (update) => {
    //utilise pr mettre a jour les infos utilisateur dans le context
    //utilise pr la change des photos de profil
    setUser((prevUser) => ({ ...prevUser, ...update })); //copie les anciennes infos + ajoute les nouvelles
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user, //nest pas null=>true
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
