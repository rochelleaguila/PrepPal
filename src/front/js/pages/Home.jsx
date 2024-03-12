import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    // Makes the requests to create a user.
    if (isLogin) {
      await actions.auth.login(username, password);
    } else {
      await actions.auth.signup(username, password);
    }
  };

  return (
    <div className="text-center mt-5">
      <form className="d-flex gap-3" onSubmit={(ev) => handleSubmit(ev)}>
        <label htmlFor="auth-toggle">
          <span className="login-label" style={{ opacity: isLogin ? 1 : 0.5 }}>
            Log In
          </span>
          /
          <span className="login-label" style={{ opacity: isLogin ? 0.5 : 1 }}>
            Sign Up
          </span>
        </label>
        <input
          className="d-none"
          type="checkbox"
          id="auth-toggle"
          checked={isLogin}
          onChange={(ev) => setIsLogin(ev.target.checked)}
        />
        <label htmlFor="auth-usr">Username:</label>
        <input
          type="text"
          id="auth-usr"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <label htmlFor="auth-pwd">Password:</label>
        <input
          type="password"
          id="auth-pwd"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="btn btn-primary">
          {isLogin ? "Log In" : "Sign Up"}
        </button>
      </form>
      <Link to="/secret">Visit the secret page!</Link>
    </div>
  );
};
