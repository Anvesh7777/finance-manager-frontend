import {
  useContext,
} from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

function ProtectedRoute({

  children

}) {

  const {
    isAuthenticated,
  } = useContext(
    AuthContext
  );

  const location =
    useLocation();

  // TOKEN CHECK
  const token =
    localStorage.getItem(
      "token"
    );

  // REDIRECT IF NOT AUTHENTICATED
  if (
    !isAuthenticated ||
    !token
  ) {

    return (

      <Navigate

        to="/login"

        replace

        state={{
          from:
            location.pathname,
        }}

      />

    );
  }

  return children;
}

export default ProtectedRoute;