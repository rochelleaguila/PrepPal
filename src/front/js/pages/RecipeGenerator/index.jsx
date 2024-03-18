import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../component/Breadcrumb/index.jsx";

const RecipeGenerator = () => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center py-5 my-5">
          <div className="col-md-7">
            <div className="metro_comments-form p-0 border-0 justify-content-center">
              <h4 className="text-center">Recipe Generator</h4>
              <form
                className="form_validate ajax_submit form_alert"
                action=""
                method="post"
                encType="multipart/form-data"
              >
                <div className="form-group">
                  <h6>Make your selections</h6>
                </div>
                <div className="row px-3 pb-3">
                  <div className="btn-group-toggle" data-toggle="buttons">
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3 active">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="omni"
                        autoComplete="off"
                        defaultChecked=""
                      />
                      Omni
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="carnivore"
                        autoComplete="off"
                      />
                      Carnivore
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="vegan"
                        autoComplete="off"
                      />
                      Vegan
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="vegetarian"
                        autoComplete="off"
                      />
                      Vegetarian
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="keto"
                        autoComplete="off"
                      />
                      Keto
                    </label>
                  </div>
                </div>
                <div className="row px-3 pb-3">
                  <div className="btn-group-toggle" data-toggle="buttons">
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3 active">
                      <input
                        type="radio"
                        name="protein3"
                        id="protein10"
                        autoComplete="off"
                      />
                      .........................
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="protein3"
                        id="protein11"
                        autoComplete="off"
                      />
                      .........................
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="protein3"
                        id="protein12"
                        autoComplete="off"
                      />
                      .........................
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="protein3"
                        id="protein13"
                        autoComplete="off"
                      />
                      ........................
                    </label>
                  </div>
                </div>

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
                <button
                  type="button"
                  className="metro_btn-custom primary"
                  name="button"
                  onClick={(e) => location = "/personalized-recipe"} //Remove it
                >
                  Generate Recipe
                </button>
                <div className="server_response w-100" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeGenerator;
