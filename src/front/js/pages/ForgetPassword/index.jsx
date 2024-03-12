import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center py-5 my-5">
          <div className="col-md-7">
            <div className="metro_comments-form p-0 border-0 justify-content-center text-center">
              <h4>Enter your email to reset your password</h4>
              <form
                className="form_validate ajax_submit form_alert"
                action=""
                method="post"
                encType="multipart/form-data"
              >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                  />
                  <i className="far fa-envelope"></i>
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
