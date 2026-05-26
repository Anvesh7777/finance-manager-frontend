import {

  createContext,

  useEffect,

  useState

} from "react";

export const AuthContext =
  createContext();

function AuthProvider({

  children

}) {

  // INITIAL TOKEN
  const [token, setToken] =
    useState(

      localStorage.getItem("token")
      || ""
    );

  // LOGIN
  const login =
    (jwtToken) => {

      localStorage.setItem(
        "token",
        jwtToken
      );

      setToken(jwtToken);
    };

  // LOGOUT
  const logout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "username"
      );

      setToken("");

      window.location.href =
        "/login";
    };

  // SYNC TOKEN ON REFRESH
  useEffect(() => {

    const storedToken =
      localStorage.getItem(
        "token"
      );

    if (storedToken) {

      setToken(storedToken);
    }

  }, []);

  return (

    <AuthContext.Provider

      value={{

        token,

        login,

        logout,

        isAuthenticated:
          !!token,

      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export default AuthProvider;