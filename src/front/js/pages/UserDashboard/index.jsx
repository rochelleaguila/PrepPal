import React, { useState } from "react";
import Breadcrumb from "../../component/Breadcrumb/index.jsx";
import Saved from "../../component/Saved/index.jsx";
import Menus from "../../component/Menus/index.jsx";
import Preference from "../../component/Preference/index.jsx";
import Create from "../../component/Create/index.jsx";
import PersonalizedRecipe from "../PersonalizedRecipe/index.jsx";
import RecipeGenerator from "../RecipeGenerator/index.jsx";
import avatarPic from "../../../img/avatar.jpg";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [createSubView, setCreateSubView] = useState("");

  const renderTabContent = () => {
    if (activeTab === "create") {
      switch (createSubView) {
        case "generate":
          return <PersonalizedRecipe showBreadcrumb={false} />;
        case "personalized":
          return <Preference />;
        default:
          return <Create onContentChange={setCreateSubView} />;
      }
    } else {
      switch (activeTab) {
        case "menus":
          return <Menus />;
        case "saved":
          return <Saved />;
        case "preferences":
          return <Preference />;
        default:
          return null;
      }
    }
  };

  return (
    <>
      <Breadcrumb page="Recipe Generator" />
      <div className="section metro_post-single">
        <div className="container">
          <div className="row position-relative">
            <img
              src={avatarPic}
              style={{ width: "130px" }}
              className="rounded-circle avatar"
              alt="Avatar"
            />
            <div className="col-lg-12 pt-4">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "create" ? "active" : ""
                    }`}
                    id="create-tab"
                    onClick={() => {
                      setActiveTab("create");
                      setCreateSubView("");
                    }}
                  >
                    Create
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "menus" ? "active" : ""
                    }`}
                    id="menus-tab"
                    data-toggle="tab"
                    href="#menus"
                    role="tab"
                    aria-controls="menus"
                    aria-selected={activeTab === "menus"}
                    onClick={() => setActiveTab("menus")}
                  >
                    Menus
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "saved" ? "active" : ""
                    }`}
                    id="saved-tab"
                    data-toggle="tab"
                    href="#saved"
                    role="tab"
                    aria-controls="saved"
                    aria-selected={activeTab === "saved"}
                    onClick={() => setActiveTab("saved")}
                  >
                    Saved
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "preferences" ? "active" : ""
                    }`}
                    id="preferences-tab"
                    data-toggle="tab"
                    href="#preferences"
                    role="tab"
                    aria-controls="preferences"
                    aria-selected={activeTab === "preferences"}
                    onClick={() => setActiveTab("preferences")}
                  >
                    Preferences
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

/*
import React, { useState } from "react";
import Breadcrumb from "../../component/Breadcrumb/index.jsx";
import Saved from "../../component/Saved/index.jsx";
import Menus from "../../component/Menus/index.jsx";
import Preference from "../../component/Preference/index.jsx";
import Create from "../../component/Create/index.jsx";
import PersonalizedRecipe from "../PersonalizedRecipe/index.jsx";
import RecipeGenerator from "../RecipeGenerator/index.jsx";

const UserDashboard = () => {
  const [activeContent, setActiveContent] = useState("create")

  const handleContentChange = (content) => {
    setActiveContent(content);
  }

  return (
    <>
      <Breadcrumb page="Recipe Generator" />

      <div className="section metro_post-single">
        <div className="container">
          <div className="row position-relative">
            <img
              src="/assets/img/avatar.jpg"
              width="130px"
              className="rounded-circle avatar"
              alt="Avatar"
            />
            <div className="col-lg-12 pt-4">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="create-tab"
                    data-toggle="tab"
                    href="#create"
                    role="tab"
                    aria-controls="create"
                    aria-selected="true"
                  >
                    Create
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link non-active"
                    id="menus-tab"
                    data-toggle="tab"
                    href="#menus"
                    role="tab"
                    aria-controls="menus"
                    aria-selected="false"
                  >
                    Menus
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="saved-tab"
                    data-toggle="tab"
                    href="#saved"
                    role="tab"
                    aria-controls="saved"
                    aria-selected="false"
                  >
                    Saved
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="preferences-tab"
                    data-toggle="tab"
                    href="#preferences"
                    role="tab"
                    aria-controls="preferences"
                    aria-selected="false"
                  >
                    Preferences
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="create"
                  role="tabpanel"
                  aria-labelledby="create-tab"
                >
                  <Create />
                </div>
                <div
                  className="tab-pane fade"
                  id="menus"
                  role="tabpanel"
                  aria-labelledby="menus-tab"
                >
                  <Menus />
                </div>
                <div
                  className="tab-pane fade"
                  id="saved"
                  role="tabpanel"
                  aria-labelledby="saved-tab"
                >
                  <Saved />
                </div>
                <div
                  className="tab-pane fade"
                  id="preferences"
                  role="tabpanel"
                  aria-labelledby="preferences-tab"
                >
                  <Preference />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
*/
