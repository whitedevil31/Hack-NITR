import React, { createContext, useState, useEffect } from "react";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const AuthContext = createContext({
  loggedIn: false,
  setLoggedIn: (data: boolean) => {},
});

const AuthProvider = (props: any) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    sleep(2000).then(() => setLoggedIn(true));
  };

  const logout = () => {
    sleep(2000).then(() => setLoggedIn(false));
  };

  const authContextValue = {
    login,
    loggedIn,
    logout,
    setLoggedIn,
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
