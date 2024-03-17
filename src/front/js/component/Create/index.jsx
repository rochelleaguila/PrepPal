import React, { useState } from "react";
import {Link} from "react-router-dom"

const Create = (props) => {
  const [activeSection, setActiveSection] = useState("navigator");

  const handleGenerateClick = (section) => {
    const top = document.getElementById("top");
    if (top) {
      top.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(section);    
  };


  return (
    <>
      <div id="top" className="container">
        <div id="navigator" className={`${activeSection !== 'navigator' ? 'd-none' : ''}`}>
          <div className="row py-5">
            <div className="col-md-6">
              <article className="metro_post metro_recipe">
                <div className="metro_post-body">
                  <div className="metro_post-desc">
                    <h5>
                      <Link to="/">Recipe Generator</Link>
                    </h5>
                    <p>Will Create recipes based off profile preferences.</p>
                    <Link to="/generate" className="metro_btn-custom">
                      Generate
                    </Link>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-md-6">
              <article className="metro_post metro_recipe">
                <div className="metro_post-body">
                  <div className="metro_post-desc">
                    <h5>
                      <Link to="#">Personalized AI</Link>
                    </h5>
                    <p>Will Create recipes based off of custom instructions.</p>
                    <button onClick={() => handleGenerateClick('personalized')} className="metro_btn-custom">
                      Generate
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div id="personalized" className={`${activeSection !== 'personalized' ? 'd-none' : ''}`}>
          <div className="row justify-content-start py-5 my-5">
            <div className="col-md-7">
              <div className="metro_comments-form create-form p-0 border-0 justify-content-start">
                <h4>Dieting Style</h4>
                <form
                  className="form_validate ajax_submit form_alert"
                  action=""
                  method="post"
                  encType="multipart/form-data"
                >
                  <div className="form-group">
                    <div className="btn-group-toggle" data-toggle="buttons">
                      <label className="btn btn-danger btn-lg mr-3 active">
                        <input
                          type="radio"
                          name="style"
                          id="option1"
                          autoComplete="off"
                          defaultChecked=""
                        />
                        Omni
                      </label>
                      <label className="btn btn-danger btn-lg mr-3">
                        <input
                          type="radio"
                          name="style"
                          id="option2"
                          autoComplete="off"
                        />
                        Carnivore
                      </label>
                      <label className="btn btn-danger btn-lg mr-3">
                        <input
                          type="radio"
                          name="style"
                          id="option3"
                          autoComplete="off"
                        />
                        Vegan
                      </label>
                      <label className="btn btn-danger btn-lg mr-3">
                        <input
                          type="radio"
                          name="style"
                          id="option2"
                          autoComplete="off"
                        />
                        Vegetarian
                      </label>
                      <label className="btn btn-danger btn-lg mr-3">
                        <input
                          type="radio"
                          name="style"
                          id="option3"
                          autoComplete="off"
                        />
                        Keto
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Others"
                      className="form-control"
                      name="style"
                    />
                  </div>
                  <hr />
                  <h6>Macros (per serving)</h6>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Protein"
                      className="form-control"
                      name="protein"
                    />
                    <i>g</i>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Fat"
                      className="form-control"
                      name="fat"
                    />
                    <i>g</i>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Carbs"
                      className="form-control"
                      name="carbs"
                    />
                    <i>g</i>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Calories"
                      className="form-control"
                      name="calories"
                    />
                    <i>g</i>
                  </div>
                  <h6>Cuisine types</h6>
                  <div className="form-group">
                    <select className="form-control" name="cuisine" id="cuisine">
                      <option value="" disabled selected>
                        Select Cuisine
                      </option>
                      <option value="Chinese">Chinese</option>
                      <option value="Thai">Thai</option>
                      <option value="Russian">Russian</option>
                      <option value="Indian">Indian</option>
                      <option value="English">English</option>
                    </select>
                    <i className="far fa-arrow-down" />
                  </div>
                  <h6>Die Restrictions</h6>
                  <div className="btn-group-toggle" data-toggle="buttons">
                    <label className="btn btn-danger active btn-lg mr-3">
                      <input
                        type="radio"
                        name="style"
                        id="option2"
                        autoComplete="off"
                      />
                      .........
                    </label>
                    <label className="btn btn-danger btn-lg mr-3">
                      <input
                        type="radio"
                        name="style"
                        id="option3"
                        autoComplete="off"
                      />
                      .........
                    </label>
                    <label className="btn btn-danger btn-lg mr-3">
                      <input
                        type="radio"
                        name="style"
                        id="option2"
                        autoComplete="off"
                      />
                      .........
                    </label>
                    <label className="btn btn-danger btn-lg mr-3">
                      <input
                        type="radio"
                        name="style"
                        id="option3"
                        autoComplete="off"
                      />
                      .........
                    </label>
                    <div className="form-group mt-4">
                      <input
                        type="text"
                        placeholder="Others"
                        className="form-control"
                        name="others"
                      />
                    </div>
                    <div className="form-group mt-4">
                      <input
                        type="text"
                        placeholder="Allergies"
                        className="form-control"
                        name="allergies"
                      />
                    </div>
                    <div className="form-group mt-4">
                      <input
                        type="text"
                        placeholder="Health Condition"
                        className="form-control"
                        name="health_condition"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <button
                        type="button"
                        className="btn btn-secondary btn-lg primary"
                        name="button"
                        onClick={() => handleGenerateClick('personlized')}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        type="button"
                        className="metro_btn-custom float-right primary"
                        name="button"
                        onClick={() => handleGenerateClick('generate-recipe')}
                      >
                        Generate Recipe
                      </button>
                    </div>
                  </div>
                  <div className="server_response w-100" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div id="generate-recipe" className={`section metro_post-single ${activeSection !== 'generate-recipe' ? 'd-none' : ''}`}>
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
      </div>
    </>
  );
};

export default Create;
