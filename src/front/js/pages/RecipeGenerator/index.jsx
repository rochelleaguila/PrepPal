import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../component/Breadcrumb/index.jsx";

const RecipeGenerator = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector('form'));
    const data = Object.fromEntries(formData.entries());

    // POST request to create basic recipee
    try {
      const response = await fetch('/api/generate-basic-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Recipe generation failed');

      const result = await response.json();
      // Redirect or display the generated recipe
      console.log(result); // You might want to display this result in the UI
    } catch (error) {
      console.error(error);
    }
  };
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
                      Healthy
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="protein3"
                        id="protein11"
                        autoComplete="off"
                      />
                      Hearty
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="protein3"
                        id="protein12"
                        autoComplete="off"
                      />
                      Low Carb
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="protein3"
                        id="protein13"
                        autoComplete="off"
                      />
                      Whole Foods
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
                  onClick={handleSubmit}
                  //onClick={(e) => (location = "/personalized-recipe")} //Remove it
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
