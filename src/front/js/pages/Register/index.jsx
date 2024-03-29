import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  // State management for username, password, confirmPassword, and email
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const history = useNavigate(); // For redirecting after successful registration

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // POST request
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, confirm_password: confirmPassword }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.msg); // Display error message from the backend
      } else {
        // Handle successful registration
        alert("Registration successful!");
        navigate('/user-dashboard'); // Redirect to userdashboard after
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

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
              <form className="form_validate ajax_submit form_alert" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="metro_btn-custom primary">
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;



/*

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
*/
