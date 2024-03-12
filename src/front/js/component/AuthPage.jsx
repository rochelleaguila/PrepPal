import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ children }) => {
  const { store } = useContext(Context);
  const nav = useNavigate();

  useEffect(() => {
    if (!store.access_token) {
      nav("/");
    }
  }, []);

  return <>{children}</>;
};

export default AuthPage;
