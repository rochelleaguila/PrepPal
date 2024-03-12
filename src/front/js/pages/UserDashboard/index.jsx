import React from "react";
import Breadcrumb from "../../component/Breadcrumb/index.jsx";
import Saved from "../../component/Saved/index.jsx";
import Menus from "../../component/Menus/index.jsx";
import Preference from "../../component/Preference/index.jsx";
import Create from "../../component/Create/index.jsx";

const UserDashboard = () => {
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
