import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../component/Breadcrumb/index.jsx";
import { Context } from "../../store/appContext.js"

const PersonalizedRecipe = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const { recipe } = location.state;

  const isLoggedIn = !!store.access_token;
  const [userMenus, setUserMenus] = useState([]);
  const [showSaveOptions, setSaveOptions] = useState(false)
  const [showOptions, setShowOptions] =useState(false);

  /*console.log(location.state);
  //console.log(recipe);
  */

  useEffect(() => {
    if (isLoggedIn) {
      actions.fetchUserMenus().then(setUserMenus);
    }
  }, [isLoggedIn, actions]);

  const handleSaveRecipe = () => {
    if (!isLoggedIn) {
      //navigate('/login'); return;
      console.log("Save recipe logic for logged-in users goes here.");
    }
    // Implement saving recipe logic here for logged-in users
    actions.saveRecipe(recipe);
  };

  const handleSaveToMenu = (menu_id) => {
    actions.saveToMenu(recipe, menu_id);
  }

  const handleCreateNewMenu = () => {
    actions.createNewMenu(recipe);
  }

  const handleShowOptions = () => {
    if (!isLoggedIn) {
      setShowOptions(true); // Show login/register options for non-logged-in users
    } else {
      // Here you could directly call your save function or set 'showOptions' to true
      // to display additional options for logged-in users (if applicable)
      handleSaveRecipe();
    }
  };

  const handleSaveRecipeClick = () => {
    if (!isLoggedIn) {
      setShowOptions(true); // Show login/register options for non-logged-in users
    } else {
      // For logged-in users, directly proceed to show save options or perform the save action
      // Optionally toggle showing save options for logged-in users or directly invoke save logic
      setShowSaveOptions(!showSaveOptions); // Assuming you have a state to manage this for logged-in users
    }
  };


  // Logic to render Save to Menu and Create New Menu options for logged-in users
  const renderOptions = () => {
    if (!isLoggedIn) {
      if (showOptions) {
        return (
          <>
            <button onClick={() => navigate('/login')} className="metro_btn-custom primary ml-3">Login</button>
            <button onClick={() => navigate('/register')} className="metro_btn-custom secondary ml-3">Register</button>
          </>
        );
      }
      return null; // No additional buttons shown by default for non-logged-in users
    }

    if (showOptions) {
      return (
        <>
          <button onClick={() => handleSaveRecipe()} className="metro_btn-custom success ml-3">Save Recipe</button>
          {userMenus.map(menu => (
            <button key={menu.menu_id} onClick={() => handleSaveToMenu(menu.menu_id)} className="metro_btn-custom info ml-3">
              Save to {menu.menu_name}
            </button>
          ))}
          <button onClick={handleCreateNewMenu} className="metro_btn-custom primary ml-3">Create New Menu</button>
        </>
      );
    }

    return null;
  };

  const renderSaveForNonUser = () => {
    if (showOptions && !isLoggedIn) {
      return (
        <>
          <button onClick={() => navigate('/login')} className="metro_btn-custom primary ml-3">Login</button>
          <button onClick={() => navigate('/register')} className="metro_btn-custom secondary ml-3">Register</button>
        </>
      );
    }
    return null;
  };

  const renderSaveForUser = () => {
    if (showOptions && isLoggedIn) {
      return (
        <>
          <button onClick={handleSaveRecipe} className="metro_btn-custom primary ml-3">Add to Saved Recipes</button>
          {userMenus.length > 0 && (
            <>
              {userMenus.map(menu => (
                <button key={menu.menu_id} onClick={() => handleSaveToMenu(menu.menu_id)} className="metro_btn-custom info ml-3">
                  Save to {menu.menu_name}
                </button>
              ))}
            </>
          )}
          <button onClick={handleCreateNewMenu} className="metro_btn-custom success ml-3">Create New Menu</button>
        </>
      );
    }
    return null;
  };


  const renderMacrosList = () => {
    if (!recipe.macros) return null;
    const macroLines = recipe.macros.split('\n');
    return macroLines.map((line, index) => {
      const [key, value] = line.split(':');
      return <li key={index}>{key.trim()} <span>{value.trim()}</span></li>;
    });
  };

  const renderList = (text) => {
    if (!text) return null;
    return text.split('\n').map((item, index) => <li key={index}>{item.trim()}</li>);

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
                      <span className="metro_post-meta">
                        <a href="#"><i className="far fa-user" /> Mic</a>
                        <a href="#"><i className="far fa-clock" /> 55 minutes</a>
                      </span>
                      <p>{recipe.summary || 'A delightful recipe awaits'}</p>
                      <div className="row">
                        <div className="col-12">
                          <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                              <a className="nav-link active" id="ingredients-tab" data-toggle="tab" href="#ingredients" role="tab" aria-controls="incredients" aria-selected="true">
                                Ingredients List
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" id="directions-tab" data-toggle="tab" href="#directions" role="tab" aria-controls="directions" aria-selected="false">
                                Directions
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="ingredients" role="tabpanel" aria-labelledby="incredients-tab">
                              <ul>{renderList(recipe.ingredients)}</ul>
                            </div>
                            <div className="tab-pane fade" id="directions" role="tabpanel" aria-labelledby="directions-tab">
                              <ul>{renderList(recipe.instructions)}</ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="metro_nutritional-facts">
                        <h6>Macros</h6>
                        <ul>{renderMacrosList()}</ul>
                      </div>
                      <div>
                        <button type="submit" className="metro_btn-custom primary ml-3" name="button" onClick={handleShowOptions}>
                          Save Recipe
                        </button>
                      </div>

                      <div className="save-recipe-options">
                      {renderSaveForNonUser()}
                      {renderSaveForUser()}
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
