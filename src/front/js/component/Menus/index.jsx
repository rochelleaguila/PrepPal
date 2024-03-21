import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext.js"

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const { actions } = useContext(Context);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const userMenus = await actions.auth.fetchUserMenus();
        // Assuming the fetch was successful but check if userMenus is valid
        if (userMenus) {
          setMenus(userMenus);
        } else {
          // Handle case where userMenus might be undefined or not an array
          setMenus([]);
        }
      } catch (error) {
        console.error("Error fetching menus:", error);
        setMenus([]);
      }
    };

    fetchMenus();
  }, [actions]);

  return (
    <>
      <div className="row">
        {menus.map((menu) => (
          <div key={menu.menu_id} className="metro_post metro_recipe metro_recipe-3 col-md-6">
            <h3>{menu.menu_name}</h3>
            <div className="images-container">
              {(menu.recipes?.length > 0 ? menu.recipes.slice(0, 4) : Array(4).fill(null)).map((recipe, index) => (
                <img key={index} src={recipe ? recipe.imageUrl : "path/to/default/image.svg"} alt="Recipe" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menus;

/*  return (
    <>
      <div className="row">
        <div className="metro_post metro_recipe metro_recipe-3 col-md-6">
          <div className="metro_post-thumb metro_post-thumb-4">
            <a href="/">
              <div className="row">
                <div className="col-6">
                  <img src="assets/img/empty.svg" alt="recipe" />
                </div>
                <div className="col-6">
                  <img src="assets/img/empty.svg" alt="recipe" />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <img src="assets/img/empty.svg" alt="recipe" />
                </div>
                <div className="col-6">
                  <img src="assets/img/empty.svg" alt="recipe" />
                </div>
              </div>
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
        <div className="metro_post metro_recipe metro_recipe-3 col-md-6">
          <div className="metro_post-thumb metro_post-thumb-4">
            <a href="/">
              <div className="row">
                <div className="col-6">
                  <img src="assets/img/empty.svg" alt="recipe" />
                </div>
                <div className="col-6">
                  <img src="assets/img/empty.svg" alt="recipe" />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <img src="assets/img/empty.svg" alt="recipe" />
                </div>
                <div className="col-6">
                  <img src="assets/img/empty.svg" alt="recipe" />
                </div>
              </div>
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
        <div className="metro_post metro_recipe metro_recipe-3 col-md-6">
          <div className="metro_post-thumb metro_post-thumb-4">
            <a href="/">
              <div className="row">
                <div className="col-6">
                  <img src="assets/img/empty.svg" alt="recipe" />
                </div>
                <div className="col-6">
                  <img src="assets/img/empty.svg" alt="recipe" />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <img src="assets/img/empty.svg" alt="recipe" />
                </div>
                <div className="col-6">
                  <img src="assets/img/empty.svg" alt="recipe" />
                </div>
              </div>
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

export default Menus; */
