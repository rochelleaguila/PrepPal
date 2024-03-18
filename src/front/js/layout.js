import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Home from "./pages/Home/index.jsx";
import Login from "./pages/Login/index.jsx";
import Register from "./pages/Register/index.jsx"; // This needs to have
import ForgetPassword from "./pages/ForgetPassword/index.jsx"; // This needs to have
import PersonalizedRecipe from "./pages/PersonalizedRecipe/index.jsx";
import RecipeGenerator from "./pages/RecipeGenerator/index.jsx";
import UserDashboard from "./pages/UserDashboard/index.jsx";
import Settings from "./pages/Settings/index.jsx";
import ResetPassword from "./pages/ResetPassword/index.jsx";
import Preference from "./component/Preference/index.jsx";
// import Error from "./pages/Error/index.jsx";

import injectContext from "./store/appContext";

import Header from "./component/Header/index.jsx";
import Footer from "./component/Footer/index.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="/personalized-recipe"
              element={<PersonalizedRecipe />}
            />
            <Route path="/recipe-generator" element={<RecipeGenerator />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route element={<h1>Oops!</h1>} /> {/* Error page goes here. */}
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/preference" element={<Preference />} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
