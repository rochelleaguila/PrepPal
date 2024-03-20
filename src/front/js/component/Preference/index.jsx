import React from "react";

const Preference = (props) => {
  const [formData, setFormData] = useState({
    dietStyle: '',
    servingSize: '',
    protein: '',
    fat: '',
    carbs: '',
    calories: '',
    cuisine: '',
    restriction: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  /*
  const submissionData = {
    // Assuming you convert dietStyle to its corresponding ID etc.
    // This conversion requires you to have predefined mappings or fetch mappings from your API
    diet_style_id: convertDietStyleToID(formData.dietStyle),
    serving_size: formData.servingSize,
    protein_g: formData.protein,
    fat_g: formData.fat,
    carbs_g: formData.carbs,
    calories: formData.calories,
    cuisine_id: convertCuisineToID(formData.cuisine),
    diet_restriction_id: convertRestrictionToID(formData.restriction),
    other_info: JSON.stringify({
      sugar: formData.sugar,
      others: formData.others,
      allergies: formData.allergies,
      health_condition: formData.health_condition,
    }),
  };

  try {
    const response = await fetch('/api/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    if (response.ok) {
      // Handle successful preference save
      console.log("Preferences saved successfully");
    } else {
      // Handle errors
      console.error("Failed to save preferences");
    }
  } catch (error) {
    console.error("Error submitting form", error);
  }
};*/


  return (
    <>
      <div className="container">
        <div className="row justify-content-start py-5 my-5">
          <div className="col-md-7">
            <div className="metro_comments-form create-form p-0 border-0 justify-content-start">
              <h4>Dieting Style</h4>
              <form
                className="form_validate ajax_submit form_alert"
                action=""
                method="post"
                encType="multipart/form-data"
              >
                <div className="form-group">
                  <div className="btn-group-toggle" data-toggle="buttons">
                    <label className="btn btn-danger btn-lg mr-3 active">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="omni"
                        autoComplete="off"
                        defaultChecked=""
                      />
                      Omni
                    </label>
                    <label className="btn btn-danger btn-lg mr-3">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="carnivore"
                        autoComplete="off"
                      />
                      Carnivore
                    </label>
                    <label className="btn btn-danger btn-lg mr-3">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="vegan"
                        autoComplete="off"
                      />
                      Vegan
                    </label>
                    <label className="btn btn-danger btn-lg mr-3">
                      <input
                        type="radio"
                        name="dietStyle"
                        id="Vegetarian"
                        autoComplete="off"
                      />
                      Vegetarian
                    </label>
                    <label className="btn btn-danger btn-lg mr-3">
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
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Others"
                    className="form-control"
                    name="style"
                  />
                </div>
                <hr />
                <hr />
                <h6>Serving Size</h6>
                <div className="form-group">
                  <select className="form-control" name="servingSize" id="servingSize">
                    <option value="" disabled selected>Select Serving Size</option>
                    {[...Array(20).keys()].map(number => (
                    <option key={number + 1} value={number + 1}>{number + 1}</option>
                    ))}
                  </select>
                </div>

                <hr />
                <h6>Macros (per serving)</h6>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Protein"
                    className="form-control"
                    name="protein"
                  />
                  <i>g</i>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Fat"
                    className="form-control"
                    name="fat"
                  />
                  <i>g</i>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Carbs"
                    className="form-control"
                    name="carbs"
                  />
                  <i>g</i>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Calories"
                    className="form-control"
                    name="calories"
                  />
                  <i>g</i>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Sugar"
                    className="form-control"
                    name="sugar"
                  />
                  <i>g</i>
                </div>
                <h6>Cuisine types</h6>
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
                <h6>Diet Restrictions</h6>
                <div className="btn-group-toggle" data-toggle="buttons">
                  <label className="btn btn-danger btn-lg mr-3">
                    <input
                      type="radio"
                      name="restriction"
                      id="gluten_free"
                      autoComplete="off"
                    />
                    Gluten Free
                  </label>
                  <label className="btn btn-danger btn-lg mr-3">
                    <input
                      type="radio"
                      name="restriction"
                      id="dairy_free"
                      autoComplete="off"
                    />
                    Dairy Free
                  </label>
                  <label className="btn btn-danger btn-lg mr-3">
                    <input
                      type="radio"
                      name="restriction"
                      id="nut_free"
                      autoComplete="off"
                    />
                    Nut Free
                  </label>
                  <label className="btn btn-danger btn-lg mr-3">
                    <input
                      type="radio"
                      name="restriction"
                      id="low_carb"
                      autoComplete="off"
                    />
                    Low Carb
                  </label>
                  <div className="form-group mt-4">
                    <input
                      type="text"
                      placeholder="Others"
                      className="form-control"
                      name="others"
                    />
                  </div>
                  <div className="form-group mt-4">
                    <input
                      type="text"
                      placeholder="Allergies"
                      className="form-control"
                      name="allergies"
                    />
                  </div>
                  <div className="form-group mt-4">
                    <input
                      type="text"
                      placeholder="Health Condition"
                      className="form-control"
                      name="health_condition"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <button
                      type="submit"
                      className="btn btn-secondary btn-lg primary"
                      name="button"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="submit"
                      className="metro_btn-custom float-right primary"
                      name="button"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="server_response w-100" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preference;
