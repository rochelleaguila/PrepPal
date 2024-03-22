import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext.js";

const Saved = (props) => {
  //const [savedRecipes, setSavedRecipes] = useState([])
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.access_token) {
      actions.auth.fetchUserRecipes();
    }
  }, [store.access_token, actions.auth]);

  // Utilizing the state from the store instead of local state
  const savedRecipes = store.userRecipes || [];

  return (
    <>
      <div className="row">
        {savedRecipes.map((recipe, index) => (
          <div key={index} className="metro_post metro_recipe metro_recipe-3 col-md-4">
            <div className="metro_post-thumb">
              <a href={`/recipe-details/${recipe.recipe_id}`}>
                <img src={recipe.image_url || "assets/img/empty.svg"} alt={recipe.title} />
              </a>
              <a href={`/recipe-details/${recipe.recipe_id}`} className="metro_recipe-read-more">
                <i className="fas fa-arrow-right" />
              </a>
            </div>
            <div className="metro_post-body">
              <div className="metro_post-desc">
                <h5>
                  <a href={`/recipe-details/${recipe.recipe_id}`}>{recipe.title}</a>
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Saved;

  /*

  return (
    <>
      <div className="row">
        <div className="metro_post metro_recipe metro_recipe-3 col-md-4">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src="assets/img/empty.svg" alt="recipe" />
            </a>
            <a href="recipe-details.html" className="metro_recipe-read-more">
              <i className="fas fa-arrow-right" />
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <h5>
                <a href="#"> Heading</a>
              </h5>
            </div>
          </div>
        </div>
        <div className="metro_post metro_recipe metro_recipe-3 col-md-4">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src="assets/img/empty.svg" alt="recipe" />
            </a>
            <a href="recipe-details.html" className="metro_recipe-read-more">
              <i className="fas fa-arrow-right" />
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <h5>
                <a href="#"> Heading</a>
              </h5>
            </div>
          </div>
        </div>
        <div className="metro_post metro_recipe metro_recipe-3 col-md-4">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src="assets/img/empty.svg" alt="recipe" />
            </a>
            <a href="recipe-details.html" className="metro_recipe-read-more">
              <i className="fas fa-arrow-right" />
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <h5>
                <a href="#"> Heading</a>
              </h5>
            </div>
          </div>
        </div>
        <div className="metro_post metro_recipe metro_recipe-3 col-md-4">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src="assets/img/empty.svg" alt="recipe" />
            </a>
            <a href="recipe-details.html" className="metro_recipe-read-more">
              <i className="fas fa-arrow-right" />
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <h5>
                <a href="#"> Heading</a>
              </h5>
            </div>
          </div>
        </div>
        <div className="metro_post metro_recipe metro_recipe-3 col-md-4">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src="assets/img/empty.svg" alt="recipe" />
            </a>
            <a href="recipe-details.html" className="metro_recipe-read-more">
              <i className="fas fa-arrow-right" />
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <h5>
                <a href="#"> Heading</a>
              </h5>
            </div>
          </div>
        </div>
        <div className="metro_post metro_recipe metro_recipe-3 col-md-4">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src="assets/img/empty.svg" alt="recipe" />
            </a>
            <a href="recipe-details.html" className="metro_recipe-read-more">
              <i className="fas fa-arrow-right" />
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <h5>
                <a href="#"> Heading</a>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Saved;
*/
