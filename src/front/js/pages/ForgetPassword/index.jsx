import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Attempt to request password reset
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/recover_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to request password reset");
      }

      // Handle successful request here
      alert("Password reset link has been sent to your email.");
    } catch (error) {
      console.error("Password reset error:", error.message);
      // Handle error
      alert("Password reset error: " + error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center py-5 my-5">
          <div className="col-md-7">
            <div className="metro_comments-form p-0 border-0 justify-content-center text-center">
              <h4>Enter your email to reset your password</h4>
              <form
                className="form_validate ajax_submit form_alert"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <i className="far fa-envelope"></i>
                </div>
                <button
                  type="submit"
                  className="metro_btn-custom primary"
                  name="button"
                >
                  Send Reset Link
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

export default ForgetPassword;

/*
const ForgetPassword = () => {
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

export default ForgetPassword;
*/
