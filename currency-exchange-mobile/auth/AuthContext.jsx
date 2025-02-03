import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [balances, setBalances] = useState([]);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, balances, setBalances }}>
      {children}
    </AuthContext.Provider>
  );
};
