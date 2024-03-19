import React from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../component/Breadcrumb/index.jsx";

const PersonalizedRecipe = () => {
  const location = useLocation();
  const { recipe } = location.state?.recipe || {};

  const renderMacrosList = (macros) => {
    return Object.entries(macros).map(([key, value]) => (
      <li key={key}>
        {key.charAt(0).toUpperCase() + key.slice(1)}: <span>{value}</span>
      </li>
    ));
  };

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
                      <img src={recipe.image_url || "assets/img/empty.svg"} alt="Recipe" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h2 className="entry-title">{recipe.title || 'Generated Recipe'}</h2>
                    <div className="entry-content">
                      <p>{recipe.summary || 'A delightful recipe awaits.'}</p>
                      <div className="metro_post-meta">
                        {/* Your meta content */}
                      </div>
                      <div className="nav nav-tabs" id="recipeTab" role="tablist">
                        <a className="nav-item nav-link active" id="ingredients-tab" data-toggle="tab" href="#ingredients" role="tab" aria-controls="ingredients" aria-selected="true">Ingredients</a>
                        <a className="nav-item nav-link" id="instructions-tab" data-toggle="tab" href="#instructions" role="tab" aria-controls="instructions" aria-selected="false">Instructions</a>
                      </div>
                      <div className="tab-content" id="recipeTabContent">
                        <div className="tab-pane fade show active" id="ingredients" role="tabpanel" aria-labelledby="ingredients-tab">
                          <p>{recipe.ingredients}</p>
                        </div>
                        <div className="tab-pane fade" id="instructions" role="tabpanel" aria-labelledby="instructions-tab">
                          <p>{recipe.instructions}</p>
                        </div>
                      </div>
                      <div className="metro_nutritional-facts">
                        <h6>Macros</h6>
                        <ul>
                          {recipe.macros && renderMacrosList(recipe.macros)}
                        </ul>
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

/*
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
                      {/*<img src={recipe.imageURL || "assets/img/empty.svg"} alt="Recipe" />
                      <img src="assets/img/empty.svg" alt="post" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h2 className="entry-title">{recipe.title || 'Generated Recipe'}</h2>
                    <div className="entry-content">
                      <span className="metro_post-meta">
                        <a href="#">
                          <i className="far fa-user" /> Mic
                        </a>
                        <a href="#">
                          <i className="far fa-clock" /> 55 minutes
                        </a>
                      </span>
                      <p>
                        {recipe.summary || 'A delightful recipe awaits'}
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
                                id="ingredients-tab"
                                data-toggle="tab"
                                href="#ingredients"
                                role="tab"
                                aria-controls="incredients"
                                aria-selected="true"
                              >
                                Ingredients List
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
                              id="ingredients"
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
*/
