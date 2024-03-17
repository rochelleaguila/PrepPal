import React from "react";
import Banner from "../../component/Banner/index.jsx";
import "./home.scss";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="section pt-0">
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-12 pt-5">
              <div className="text-center">
                <h2>How PrepPal Works</h2>
                <p>
                  PrepPal leverages the power of advanced AI algorithms to
                  revolutionize your cooking experience.
                </p>
              </div>
            </div>

            <div className="row py-5">
              <div className="col-lg-4 col-md-6">
                <article className="metro_post metro_recipe">
                  <div className="metro_post-body">
                    <div className="metro_post-desc">
                      <h5>
                        <a href="#">User Preferences</a>
                      </h5>
                      <p>
                        You start by telling PrepPal your dietary preferences,
                        such as vegan, gluten-free, or low-carb, and any
                        ingredients you want to include or avoid.
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div className="col-lg-4 col-md-6">
                <article className="metro_post metro_recipe">
                  <div className="metro_post-body">
                    <div className="metro_post-desc">
                      <h5>
                        <a href="#">Ingredient Analysis</a>
                      </h5>
                      <p>
                        Our AI analyzes the ingredients you have on hand or
                        suggest substitutes if needed, ensuring that the recipes
                        generated are tailored to what you already have in your
                        kitchen.
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div className="col-lg-4 col-md-6">
                <article className="metro_post metro_recipe">
                  <div className="metro_post-body">
                    <div className="metro_post-desc">
                      <h5>
                        <a href="#">Recipe Generation</a>
                      </h5>
                      <p>
                        Based on your preferences and available ingredients,
                        PrepPal generates customized recipes from a vast
                        database of culinary knowledge and creativity.
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div className="col-lg-4 col-md-6">
                <article className="metro_post metro_recipe">
                  <div className="metro_post-body">
                    <div className="metro_post-desc">
                      <h5>
                        <a href="#">Step-by-Step Guidance</a>
                      </h5>
                      <p>
                        Each recipe comes with clear, easy-to-follow
                        instructions, guiding you through every step of the
                        cooking process.
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div className="col-lg-4 col-md-6">
                <article className="metro_post metro_recipe">
                  <div className="metro_post-body">
                    <div className="metro_post-desc">
                      <h5>
                        <a href="#">Adaptability</a>
                      </h5>
                      <p>
                        PrepPal is adaptable to your skill level, offering
                        beginner-friendly recipes as well as more advanced
                        culinary challenges.
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div className="col-lg-4 col-md-6">
                <article className="metro_post metro_recipe">
                  <div className="metro_post-body">
                    <div className="metro_post-desc">
                      <h5>
                        <a href="#">Feedback Loop</a>
                      </h5>
                      <p>
                        As you use PrepPal, it learns from your choices and
                        feedback, continuously improving its recommendations to
                        better suit your tastes and needs.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="section section-padding pt-0 metro_home-slider-wrapper-2">
                <h2 className="title text-center py-5">Features</h2>
                <div className="container">
                  <div className="row">
                    <div className="metro_post metro_recipe metro_recipe-3 col-md-3">
                      <div className="metro_post-thumb">
                        <a href="recipe-details.html">
                          <img src="assets/img/recipes/1.jpg" alt="recipe" />
                        </a>
                        <a
                          href="recipe-details.html"
                          className="metro_recipe-read-more"
                        >
                          <i className="fas fa-arrow-right" />
                        </a>
                      </div>
                      <div className="metro_post-body">
                        <div className="metro_post-desc">
                          <h5>
                            <a href="#"> Customizable Preferences </a>
                          </h5>
                          <p>
                            Allow users to customize their recipe preferences
                            based on dietary restrictions, allergies, preferred
                            cuisines, and cooking skill level.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="metro_post metro_recipe metro_recipe-3 col-md-3">
                      <div className="metro_post-thumb">
                        <a href="recipe-details.html">
                          <img src="assets/img/recipes/2.jpg" alt="recipe" />
                        </a>
                        <a
                          href="recipe-details.html"
                          className="metro_recipe-read-more"
                        >
                          <i className="fas fa-arrow-right" />
                        </a>
                      </div>
                      <div className="metro_post-body">
                        <div className="metro_post-desc">
                          <h5>
                            <a href="#"> Ingredient Substitution </a>
                          </h5>
                          <p>
                            Provide the ability for users to substitute
                            ingredients in generated recipes based on what they
                            have available or their dietary preferences.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="metro_post metro_recipe metro_recipe-3 col-md-3">
                      <div className="metro_post-thumb">
                        <a href="recipe-details.html">
                          <img src="assets/img/recipes/3.jpg" alt="recipe" />
                        </a>
                        <a
                          href="recipe-details.html"
                          className="metro_recipe-read-more"
                        >
                          <i className="fas fa-arrow-right" />
                        </a>
                      </div>
                      <div className="metro_post-body">
                        <div className="metro_post-desc">
                          <h5>
                            <a href="#"> Recipe Rating and Reviews </a>
                          </h5>
                          <p>
                            Allow users to rate and review recipes they've
                            tried, providing valuable feedback to the community
                            and helping others decide.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="metro_post metro_recipe metro_recipe-3 col-md-3">
                      <div className="metro_post-thumb">
                        <a href="recipe-details.html">
                          <img src="assets/img/recipes/4.jpg" alt="recipe" />
                        </a>
                        <a
                          href="recipe-details.html"
                          className="metro_recipe-read-more"
                        >
                          <i className="fas fa-arrow-right" />
                        </a>
                      </div>
                      <div className="metro_post-body">
                        <div className="metro_post-desc">
                          <h5>
                            <a href="#">Personalized Recipes </a>
                          </h5>
                          <p>
                            Utilize machine learning algorithms to provide
                            personalized recipe recommendations based on users'
                            past recipe selections.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 pt-5">
              <div className="text-center">
                <h2>Lets Get Started</h2>
                <a href="/register" className="metro_btn-custom">
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
