import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext.js";

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const { actions } = useContext(Context);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuDescription, setNewMenuDescription] = useState("");

  useEffect(() => {
    actions.auth.fetchUserMenus()
      .then(userMenus => {
        setMenus(userMenus || []);
      })
      .catch(error => {
        console.error("Error fetching menus:", error);
        setMenus([]);
      });
  }, [actions.auth.fetchUserMenus]);

  const handleCreateMenu = async () => {
    try {
      await actions.auth.createNewMenu({ menuName: newMenuName, menuDescription: newMenuDescription, recipes: [] });
      setShowMenuForm(false);
      setNewMenuName("");
      setNewMenuDescription("");
      // Fetch the updated list of menus
      actions.auth.fetchUserMenus().then(setMenus).catch(console.error);
    } catch (error) {
      console.error("Error creating new menu:", error);
    }
  };

  return (
    <>
      <button type="submit" className="metro_btn-custom primary ml-3 mb-3" name="button" onClick={() => setShowMenuForm(!showMenuForm)}>Create New Menu</button>
      {showMenuForm && (
        <div className="form-group mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Menu Name"
            value={newMenuName}
            onChange={(e) => setNewMenuName(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Menu Description"
            value={newMenuDescription}
            onChange={(e) => setNewMenuDescription(e.target.value)}
          />
          <button type="submit" className="metro_btn-custom secondary ml-3 mb-3" name="button" onClick={handleCreateMenu}>Submit</button>
        </div>
      )}
      <div className="row">
        {menus.map(menu => (
          <div key={menu.menu_id} className="metro_post metro_recipe metro_recipe-3 col-md-6">
            <div className="metro_post-thumb metro_post-thumb-4">
              <a href={`/menu/${menu.menu_id}`}>
                <div className="row">
                  {menu.recipes.slice(0, 4).map((recipe, idx) => (
                    <div className="col-6" key={idx}>
                      <img src={recipe.image_url || "assets/img/empty.svg"} alt="Recipe" className="img-fluid" />
                    </div>
                  ))}
                </div>
              </a>
              <a href={`/menu-details/${menu.menu_id}`} className="metro_recipe-read-more">
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
            <div className="metro_post-body">
              <div className="metro_post-desc">
                <h5>
                  <a href={`/menu/${menu.menu_id}`}>{menu.menu_name}</a>
                </h5>
                <p>{menu.menu_description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menus;

/*
return (
    <>
      <button type="submit" className="metro_btn-custom primary ml-3 mb-3" name="button" onClick={() => setShowMenuForm(prev => !prev)}>Create New Menu</button>
      {showMenuForm && (
        <div className="form-group">
          <input
            type="text"
            placeholder="Menu Name"
            className="form-control mb-2" // Added mb-2 for spacing below the input
            value={newMenuName}
            onChange={(e) => setNewMenuName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Menu Description"
            className="form-control mb-2" // Added mb-2 for spacing below the input
            value={newMenuDescription} // Assuming you have a state variable for this
            onChange={(e) => setNewMenuDescription(e.target.value)} // Assuming you have a setter for this
          />
          <button type="submit" className="metro_btn-custom primary" name="button" onClick={handleCreateMenu}>Submit</button>
        </div>
      )}
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

return (
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
