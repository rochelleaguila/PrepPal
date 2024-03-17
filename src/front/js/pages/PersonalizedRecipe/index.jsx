import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../component/Breadcrumb/index.jsx";

const PersonalizedRecipe = () => {
  return (
    <>
      <Breadcrumb page="Recipe Generator" />

      <div id="personal-recipe" className="section metro_post-single">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="metro_post-single-wrapper metro_recipe-single-wrapper">
                <div className="row">
                  <div className="col-md-4">
                    <div className="metro_post-single-thumb sticky-image">
                      <img src="assets/img/empty.svg" alt="post" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h2 className="entry-title">Planting Season Begins</h2>
                    <div className="entry-content">
                      <span className="metro_post-meta">
                        <a href="#">
                          <i className="far fa-user" /> Michel
                        </a>
                        <a href="#">
                          <i className="far fa-clock" /> 55 minutes
                        </a>
                      </span>
                      <p>
                        Cras ultricies ligula sed magna dictum porta. Cras
                        ultricies ligula sed magna dictum porta. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere
                        cubilia Curae; Donec velit neque, auctor sit amet
                        aliquam vel, ullamcorper sit amet ligula. Quisque velit
                        nisi, pretium ut lacinia in, elementum id enim. Donec
                        sollicitudin molestie malesuada. Cras ultricies ligula
                        sed magna dictum porta. Donec rutrum congue leo eget
                        malesuada. Cras ultricies ligula sed magna dictum porta.
                        Cras ultricies ligula sed magna dictum porta. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices
                        posuere cubilia Curae; Donec velit neque, auctor sit
                        amet aliquam vel, ullamcorper sit amet ligula. Quisque
                        velit nisi, pretium ut lacinia in, elementum id enim.
                        Donec sollicitudin molestie malesuada. Cras ultricies
                        ligula sed magna dictum porta. Donec rutrum congue leo
                        eget malesuada.
                      </p>
                      <div className="row">
                        <div className="col-12">
                          <ul
                            className="nav nav-tabs"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                id="incredients-tab"
                                data-toggle="tab"
                                href="#incredients"
                                role="tab"
                                aria-controls="incredients"
                                aria-selected="true"
                              >
                                Incredients List
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                id="directions-tab"
                                data-toggle="tab"
                                href="#directions"
                                role="tab"
                                aria-controls="directions"
                                aria-selected="true"
                              >
                                Directions
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content" id="myTabContent">
                            <div
                              className="tab-pane fade show active"
                              id="incredients"
                              role="tabpanel"
                              aria-labelledby="incredients-tab"
                            >
                              <div className="metro_nutritional-facts">
                                <ul>
                                  <li>
                                    Calories <span>329</span>
                                  </li>
                                  <li>
                                    Sugar <span>10.5g</span>
                                  </li>
                                  <li>
                                    Protein <span>22.5g</span>
                                  </li>
                                  <li>
                                    Fat <span>3g</span>
                                  </li>
                                  <li>
                                    Carbs <span>18g</span>
                                  </li>
                                  <li>
                                    Food Far <span>0.1</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="directions"
                              role="tabpanel"
                              aria-labelledby="directions-tab"
                            >
                              <div className="metro_nutritional-facts">
                                <ul>
                                  <li> 1 Cup Sifted all purpose Flour </li>
                                  <li> 4 Cups Dry-roasted macadamia nuts </li>
                                  <li> 4 Large eggs </li>
                                  <li> 5 Cup sifted all purpose flour </li>
                                  <li> 8 Cups dry-roasted macadami nuts </li>
                                  <li> 5 Mineral water </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="metro_btn-custom primary ml-3"
                          name="button"
                        >
                          Save Recipe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalizedRecipe;
