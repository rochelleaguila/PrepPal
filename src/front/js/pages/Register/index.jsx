import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center py-5 my-5">
          <div className="col-md-7">
            <div className="metro_comments-form p-0 border-0 justify-content-center">
              <div className="row justify-content-center">
                <Link to="/login" className="metro_btn-custom non-active mx-2">
                  Login
                </Link>
                <Link to="/register" className="metro_btn-custom mx-2">
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
                  <input
                    type="text"
                    placeholder="Confirm Password"
                    className="form-control"
                    name="password"
                  />
                  <i className="far fa-eye" />
                </div>
                <button
                  type="submit"
                  className="metro_btn-custom primary"
                  name="button"
                >
                  Create Account
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
