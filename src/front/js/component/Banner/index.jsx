import React from "react";
import { Link } from "react-router-dom";
import bannerLogo from "../../../img/banners/banner2.jpg";

const Banner = () => {
  return (
    <>
      <div className="metro_banner banner-1">
        <div className="metro_banner-slider">
          <div
            className="metro_banner-item dark-overlay dark-overlay-2"
            style={{ backgroundImage: `url(${bannerLogo})` }}
          >
            <div className="container">
              <div className="metro_banner-text">
                <h1>Welcome to PrepPal</h1>
                <Link
                  to="/recipe-generator"
                  className="metro_btn-custom btn-lg mt-5"
                >
                  Generate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
