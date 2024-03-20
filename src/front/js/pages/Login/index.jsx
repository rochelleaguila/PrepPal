import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { actions } = useContext(Context);
  const navigate = useNavigate(); // For navigation after successful login

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await actions.auth.login(username, password);
      // If login is successful, navigate to the dashboard
      console.log("Login successful:", username);
      navigate('/user-dashboard');
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  /*
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Attempt to login
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to login");
      }

      // Handle successful login
      console.log("Login successful:", data);

      if (data.access_token) {
        localStorage.setItem("token", data.access_token); // Store the token
      } else {
        console.error("No access token received");
        return;
      }

      navigate('/user-dashboard'); // Redirect to dashboard route

    } catch (error) {
      console.error("Login error:", error.message);
    }
  };*/

  return (
    <>
      <div className="container">
        <div className="row justify-content-center py-5 my-5">
          <div className="col-md-7">
            <div className="metro_comments-form p-0 border-0 justify-content-center">
              <div className="row justify-content-center">
                <Link to="/login" className="metro_btn-custom mx-2">
                  Login
                </Link>
                <Link to="/register" className="metro_btn-custom non-active mx-2">
                  Register
                </Link>
              </div>
              <h4></h4>
              <form className="form_validate ajax_submit form_alert" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password (Must be 12 characters)"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Link to="/forget-password">Forgot Password?</Link>
                </div>
                <button type="submit" className="metro_btn-custom primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

/*
const Login = () => {

  return (
    <>
      <div className="container">
        <div className="row justify-content-center py-5 my-5">
          <div className="col-md-7">
            <div className="metro_comments-form p-0 border-0 justify-content-center">
              <div className="row justify-content-center">
                <Link to="/login" className="metro_btn-custom mx-2">
                  Login
                </Link>
                <Link to="/register" className="metro_btn-custom non-active mx-2">
                  Register
                </Link>
              </div>
              <h4></h4>
              <form
                className="form_validate ajax_submit form_alert"
                action=""
                method="post"
                encType="multipart/form-data"
              >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    name="name"
                  />
                  <i className="far fa-user" />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Password (Must be 12 characters)"
                    className="form-control"
                    name="password"
                  />
                  <i className="far fa-eye" />
                </div>
                <div className="form-group">
                  <Link to="/forget-password">Forget Password?</Link>
                </div>
                <button
                  type="submit"
                  className="metro_btn-custom primary"
                  name="button"
                >
                  Login
                </button>
                <div className="server_response w-100" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

*/
