import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setLoginStatus: (status) => {
    status = false;
  },
});

export default AuthContext;
