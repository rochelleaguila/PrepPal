import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../component/Breadcrumb/index.jsx";

const RecipeGenerator = () => {
  const [dietStyle, setDietStyle] = useState('');
  const [healthFocus, setHealthFocus] = useState('');
  const [cuisine, setCuisine] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*
    const formData = new FormData(document.querySelector('form'));
    const data = Object.fromEntries(formData.entries());
    */
    const data = {
      dietStyle,
      cuisine,
      health_focus: healthFocus,
    };
    // POST request to create basic recipe
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/generate-basic-recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Recipe generation failed');

      const result = await response.json();

      console.log(result);

      // Navigate to the PersonalizedRecipe component with the recipe data
      navigate('/personalized-recipe', { state: { recipe: result } });

    } catch (error) {
      console.error(error);
    }

  };

  const handleRadioButtonChange = (event) => {
    const { name, value } = event.target;
    if (name === "dietStyle") setDietStyle(value);
    if (name === "health_focus") setHealthFocus(value);
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center py-5 my-5">
          <div className="col-md-7">
            <div className="metro_comments-form p-0 border-0 justify-content-center">
              <h4 className="text-center">Recipe Generator</h4>
              <form
                className="form_validate ajax_submit form_alert"
                onSubmit={handleSubmit}
                /*
                action=""
                method="post"
                encType="multipart/form-data"
                */
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
                        value="Omni"
                        onChange={handleRadioButtonChange}
                        //defaultChecked=""
                      />
                      Omni
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="carnivore"
                        autoComplete="off"
                        value="Carnivore"
                        onChange={handleRadioButtonChange}
                      />
                      Carnivore
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="vegan"
                        autoComplete="off"
                        value="Vegan"
                        onChange={handleRadioButtonChange}
                      />
                      Vegan
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="vegetarian"
                        autoComplete="off"
                        value="Vegetarian"
                        onChange={handleRadioButtonChange}
                      />
                      Vegetarian
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="keto"
                        autoComplete="off"
                        value="Keto"
                        onChange={handleRadioButtonChange}
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
                        name="health_focus"
                        id="protein10"
                        autoComplete="off"
                        value="Healthy"
                        onChange={handleRadioButtonChange}
                      />
                      Healthy
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="health_focus"
                        id="protein11"
                        autoComplete="off"
                        value="Hearty"
                        onChange={handleRadioButtonChange}
                      />
                      Hearty
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="health_focus"
                        id="protein12"
                        autoComplete="off"
                        value="Low Carb"
                        onChange={handleRadioButtonChange}
                      />
                      Low Carb
                    </label>
                    <label className="btn btn-danger btn-lg py-3 px-4 mr-3">
                      <input
                        type="radio"
                        name="health_focus"
                        id="protein13"
                        autoComplete="off"
                        value="Whole Foods"
                        onChange={handleRadioButtonChange}
                      />
                      Whole Foods
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <select className="form-control" name="cuisine" id="cuisine" value={cuisine} onChange={e => setCuisine(e.target.value)} >
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
                  type="submit"
                  //type="button"
                  className="metro_btn-custom primary"
                  name="button"
                  //onClick={handleSubmit}
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
