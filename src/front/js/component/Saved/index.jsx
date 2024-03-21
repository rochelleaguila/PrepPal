import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext.js";

const Saved = (props) => {
  const [savedRecipes, setSavedRecipes] = useState([])
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/user/recipes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.access_token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch saved recipes');
        }
        const data = await response.json();
        setSavedRecipes(data);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    if (store.access_token) {
      fetchSavedRecipes();
    }
  }, [store.access_token, actions]);

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
