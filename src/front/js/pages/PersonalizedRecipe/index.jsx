import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../component/Breadcrumb/index.jsx";
import { Context } from "../../store/appContext.js"

const PersonalizedRecipe = ({ showBreadcrumb = true }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const { recipe: initialRecipe } = location.state;
  const isLoggedIn = !!store.access_token;
  const [userMenus, setUserMenus] = useState([]);
  const [showSaveOptions, setShowSaveOptions] = useState(false)
  const [newMenuName, setNewMenuName] = useState("")
  const [newMenuDescription, setNewMenuDescription] = useState("");
  const [showMenuCreation, setShowMenuCreation] = useState(false);
  const [showCreateMenuForm, setShowCreateMenuForm] = useState(false);
  const [savedRecipe, setSavedRecipe] = useState(null);
  const [showSaveToMenuOptions, setShowSaveToMenuOptions] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  /*console.log(location.state);
  //console.log(recipe);
  useEffect(() => {
    let isMounted = true;

    console.log("Is LoggednIn?", isLoggedIn);
    if (isLoggedIn) {
      actions.auth.fetchUserMenus().then(menus => {
        if (isMounted) setUserMenus(menus);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn, actions.auth]);*/

  useEffect(() => {
    if (store.access_token) {
      actions.auth.fetchUserMenus().then(setUserMenus);
    }
  }, [store.access_token, actions.auth]);

  const handleSaveRecipe = async () => {
    if (!store.access_token) {
      navigate('/login');
      return;
    }
    try {
      const recipeId = await actions.auth.saveRecipe(initialRecipe); // Save and get ID
      const fullRecipe = await actions.auth.fetchRecipeById(recipeId); // Fetch the full recipe details
      console.log("Recipe fetched successfully:", fullRecipe);
      setSavedRecipe(fullRecipe); // Update state with the fetched recipe
      setShowSaveOptions(true); // Show options to save to menus etc.
    } catch (error) {
      console.error("Error during recipe save/fetch:", error);
    }
  };

  const handleSaveToSelectedMenu = async () => {
    if (!selectedMenuId) {
      console.error("No menu selected.");
      return;
    }
    await actions.auth.addRecipeToMenu(selectedMenuId, savedRecipe.recipe_id);
    // Additional logic to handle success or failure
  };

  const handleCreateNewMenu = async () => {
    if (newMenuName && newMenuDescription && savedRecipe && savedRecipe.id) {
      try {
        const newMenu = await actions.auth.createNewMenu({
          menuName: newMenuName,
          menuDescription: newMenuDescription,
          recipes: [savedRecipe.id]
        });
        setUserMenus(prevMenus => [...prevMenus, newMenu]);
        setNewMenuName("");
        setNewMenuDescription("");
        setShowCreateMenuForm(false); // Hide the creation form after creating a new menu
        console.log("New menu created:", newMenu);
      } catch (error) {
        console.error("Error creating new menu:", error);
      }
    } else {
      console.log("Please provide a name and description for the new menu.");
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login', { state: { from: 'personalizedRecipe', recipe: initialRecipe } });
  };

  const renderSaveOptions = () => {
    if (!showSaveOptions) return null;

    return (
      <div>
        <button onClick={() => { setShowSaveToMenuOptions(true); setShowCreateMenuForm(false); }} className="metro_btn-custom primary ml-3">Save to Menu</button>
        <button onClick={() => { setShowCreateMenuForm(true); setShowSaveToMenuOptions(false); }} className="metro_btn-custom primary ml-3">Create New Menu</button>
      </div>
    );
  };

  const renderSaveToMenuOptions = () => {
    if (!showSaveToMenuOptions) return null;

    const handleRadioButtonChange = (e) => {
      console.log(`${e.target.value} clicked`);
      setSelectedMenuId(e.target.value);
    };

    return (
      <form onSubmit={e => e.preventDefault()}>
        {userMenus.map(menu => (
          <div key={menu.menu_id} className="mb-3 btn-group-toggle">
            <label className={`btn btn-danger btn-lg py-3 px-4 mr-3 ${selectedMenuId === menu.menu_id ? 'active' : ''}`}>
              <input
                type="radio"
                name="menuOption"
                id={menu.menu_id}
                autoComplete="off"
                value={menu.menu_id}
                onChange={handleRadioButtonChange}
              />
              {menu.menu_name}
            </label>
          </div>
        ))}
        <button onClick={() => handleSaveToSelectedMenu()} className="metro_btn-custom primary ml-4">Save</button>
      </form>
    );
  };


  const renderCreateMenuForm = () => {
    if (!showCreateMenuForm) return null;

    return (
      <div>
        <div className="mb-3">
          <input className="form-control" type="text" placeholder="Menu Name" value={newMenuName} onChange={e => setNewMenuName(e.target.value)} />
        </div>
        <div className="mb-3">
          <input className="form-control" type="text" placeholder="Menu Description" value={newMenuDescription} onChange={e => setNewMenuDescription(e.target.value)} />
        </div>
        <button onClick={handleCreateNewMenu} className="metro_btn-custom primary ml-4">Create Menu</button> {/* Adjusted class for consistency */}
      </div>
    );
  };


  const renderMacrosList = () => {
    if (!initialRecipe.macros) return null;
    const macroLines = initialRecipe.macros.split('\n');
    return macroLines.map((line, index) => {
      const [key, value] = line.split(':');
      if (!key || !value) return null; // Check if key or value is undefined
      return <li key={index}>{key.trim()} <span>{value.trim()}</span></li>;
    });
  };

  const renderList = (text) => {
    if (!text) return null;
    return text.split('\n').map((item, index) => <li key={index}>{item.trim()}</li>);

  };

  return (
    <>
      {showBreadcrumb && <Breadcrumb page="Recipe Generator" />}
      <div id="personal-recipe" className="section metro_post-single">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="metro_post-single-wrapper metro_recipe-single-wrapper">
                <div className="row">
                  <div className="col-md-4">
                    <div className="metro_post-single-thumb sticky-image">
                      <img src={initialRecipe.image_url || "assets/img/empty.svg"} alt="Recipe" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h2 className="entry-title">{initialRecipe.title || 'Generated Recipe'}</h2>
                    <div className="entry-content">
                      {/*
                      <span className="metro_post-meta">
                        <a href="#"><i className="far fa-user" /> Mic</a>
                      </span>
                      */}
                      <p>{initialRecipe.summary || 'A delightful recipe awaits'}</p>
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
                              <ul>{renderList(initialRecipe.ingredients)}</ul>
                            </div>
                            <div className="tab-pane fade" id="directions" role="tabpanel" aria-labelledby="directions-tab">
                              <ul>{renderList(initialRecipe.instructions)}</ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="metro_nutritional-facts">
                        <h6>Macros</h6>
                        <ul>{renderMacrosList()}</ul>
                      </div>
                      <div>
                        {!showSaveOptions && (
                          <button type="button" className="metro_btn-custom primary ml-3" onClick={isLoggedIn ? handleSaveRecipe : handleLoginRedirect}>
                            {isLoggedIn ? "Save Recipe" : "Login/Register to Save"}
                          </button>
                        )}
                        <div className="mb-3"> {/* Add margin-bottom here */}
                          {renderSaveOptions()}
                        </div>
                        <div className="mb-3"> {/* Add margin-bottom here */}
                          {showSaveToMenuOptions && renderSaveToMenuOptions()}
                        </div>
                        <div className="mb-3"> {/* Add margin-bottom here */}
                          {showCreateMenuForm && renderCreateMenuForm()}
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
