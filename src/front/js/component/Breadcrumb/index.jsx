import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
  return (
    <>
      <div
        className="metro_subheader dark-overlay dark-overlay-2"
        style={{ backgroundImage: "url(/assets/img/banners/1.jpg)" }}
      >
        <div className="container">
          <div className="metro_subheader-inner">
            <h1>{props.page}</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {props.page}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
