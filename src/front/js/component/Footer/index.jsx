import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="metro_footer metro_footer-dark">
      <div className="metro_footer-bottom">
        <div className="container">
          <div className="metro_footer-copyright footer-widget">
            <p>
              Copyright © 2024 <Link to="/">PrepPal</Link> All Rights Reserved.
            </p>
            <ul className="social-media">
              <li>
                <a href="#" target="_blank" className="github">
                  <i className="fab fa-github" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
