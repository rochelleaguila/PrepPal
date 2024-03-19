import React, { useEffect, useState } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import LightLogo from "../../../../../public/assets/img/logo-light.png";
import Logo from "../../../../../public/assets/img/logo.png";

const Header = () => {
  const [appearance, setAppearance] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const userPreference = getStoredPreference() || getSystemPreference();
    applyAppearance(userPreference);
  }, []);

  const getStoredPreference = () => {
    return localStorage.getItem("appearance");
  };

  const getSystemPreference = () => {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const applyAppearance = (mode) => {
    setAppearance(mode);
    const imgElement = document.getElementById("toggle-img");
    if (mode === "dark") {
      document.body.classList.add("dark");
      imgElement.src =
        "https://uploads-ssl.webflow.com/655cd88e6249ce66bb02cfbc/655da2e5d85dfa7bc6a65215_moon.svg";
    } else {
      document.body.classList.remove("dark");
      imgElement.src =
        "https://assets-global.website-files.com/655cd88e6249ce66bb02cfbc/655d0474630f5c8d9e34d057_sun.svg";
    }
    localStorage.setItem("appearance", mode); // Store preference in localStorage
  };

  const toggleMode = () => {
    const newMode = document.body.classList.contains("dark") ? "light" : "dark";
    applyAppearance(newMode);
  };

  const handleToggleClick = () => {
    toggleMode();
  };

  return (
    <>
      <aside className="metro_aside metro_aside-left">
        <Link className="navbar-brand" to="/">
          <img className="logo-light" src={LightLogo} alt="logo" />
          <img className="logo-dark" src={Logo} alt="logo" />
        </Link>
      </aside>
      <div className="metro_aside-overlay aside-trigger-left" />
      <header className="metro_header header-1 can-sticky">
        <div className="metro_header-middle">
          <div className="container">
            <nav className="navbar">
              <Link className="navbar-brand logo-light" to="/">
                <img src="/assets/img/logo-light.png" alt="logo" />
                <h4 className="d-inline-block">PrepPal</h4>
              </Link>
              <Link className="navbar-brand logo-dark" to="/">
                <img src="/assets/img/logo.png" alt="logo" />
                <h4 className="d-inline-block">PrepPal</h4>
              </Link>

              <div className="metro_header-controls">
                <address
                  id="toggle-button"
                  className="theme-toggle mr-4"
                  onClick={handleToggleClick}
                >
                  <img
                    src={
                      appearance === "dark"
                        ? "https://uploads-ssl.webflow.com/655cd88e6249ce66bb02cfbc/655da2e5d85dfa7bc6a65215_moon.svg"
                        : "https://assets-global.website-files.com/655cd88e6249ce66bb02cfbc/655d0474630f5c8d9e34d057_sun.svg"
                    }
                    loading="lazy"
                    id="toggle-img"
                    alt="sun icon"
                  />
                </address>

                {token ? (
                  <>
                    <Link to="/login" className="metro_btn-custom">
                      Login/Register
                    </Link>
                  </>
                ) : (
                  <div className="dropdown">
                    <i
                      className="fa fa-user-circle"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    ></i>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link className="dropdown-item" to="#">
                        <i className="fas fa-user"></i>
                        Username
                      </Link>
                      <hr />
                      <Link className="dropdown-item" to="/user-dashboard">
                        <i className="fas fa-tachometer-alt"></i>
                        Dashboard
                      </Link>
                      <Link className="dropdown-item" to="/settings">
                        <i className="fas fa-cog"></i>
                        Settings
                      </Link>
                      <hr />
                      <Link className="dropdown-item" to="#">
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
