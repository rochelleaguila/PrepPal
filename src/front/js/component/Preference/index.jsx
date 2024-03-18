import React from "react";

const Preference = (props) => {
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
                        name="style"
                        id="option1"
                        autoComplete="off"
                        defaultChecked=""
                      />
                      Omni
                    </label>
                    <label className="btn btn-danger btn-lg mr-3">
                      <input
                        type="radio"
                        name="style"
                        id="option2"
                        autoComplete="off"
                      />
                      Carnivore
                    </label>
                    <label className="btn btn-danger btn-lg mr-3">
                      <input
                        type="radio"
                        name="style"
                        id="option3"
                        autoComplete="off"
                      />
                      Vegan
                    </label>
                    <label className="btn btn-danger btn-lg mr-3">
                      <input
                        type="radio"
                        name="style"
                        id="option2"
                        autoComplete="off"
                      />
                      Vegetarian
                    </label>
                    <label className="btn btn-danger btn-lg mr-3">
                      <input
                        type="radio"
                        name="style"
                        id="option3"
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
                <h6>Die Restrictions</h6>
                <div className="btn-group-toggle" data-toggle="buttons">
                  <label className="btn btn-danger btn-lg mr-3">
                    <input
                      type="radio"
                      name="style"
                      id="option2"
                      autoComplete="off"
                    />
                    .........
                  </label>
                  <label className="btn btn-danger btn-lg mr-3">
                    <input
                      type="radio"
                      name="style"
                      id="option3"
                      autoComplete="off"
                    />
                    .........
                  </label>
                  <label className="btn btn-danger btn-lg mr-3">
                    <input
                      type="radio"
                      name="style"
                      id="option2"
                      autoComplete="off"
                    />
                    .........
                  </label>
                  <label className="btn btn-danger btn-lg mr-3">
                    <input
                      type="radio"
                      name="style"
                      id="option3"
                      autoComplete="off"
                    />
                    .........
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