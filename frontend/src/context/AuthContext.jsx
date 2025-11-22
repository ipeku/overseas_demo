import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : { user: null, token: null };
  });

  const login = ({ user, token }) => {
    const next = { user, token };
    setAuth(next);
    localStorage.setItem("auth", JSON.stringify(next));
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user: auth.user, token: auth.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
