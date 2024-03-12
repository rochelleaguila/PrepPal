import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../component/Breadcrumb/index.jsx";

const Settings = () => {
  return (
    <>
      <Breadcrumb page="Settings" />

      <div className="container">
        <div className="row justify-content-center py-5">
          <div className="col-md-8">
            <div className="metro_comments-form p-0 border-0 justify-content-center">
              <div className="card">
                <div className="card-body">
                  <h6>Profile Avatar</h6>
                  <div className="row justify-content-center text-center">
                    <div className="col-12">
                      <img
                        src="/assets/img/avatar.jpg"
                        width="150px"
                        className="rounded-circle"
                        alt="Avatar"
                      />
                    </div>
                    <div className="col-12 mt-3">
                      <button
                        type="submit"
                        className="btn btn-danger active primary"
                        name="button"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="metro_comments-form p-0 border-0 justify-content-center mt-4">
              <div className="card">
                <div className="card-body">
                  <h6>Email Address</h6>
                  <label>Update Email</label>
                  <p>Note: You will need to re-verify your email address</p>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Username"
                      className="form-control"
                      name="name"
                    />
                    <i className="far fa-envelope"></i>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-danger active primary"
                    name="button"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <div className="metro_comments-form p-0 border-0 justify-content-center mt-4">
              <div className="card">
                <div className="card-body">
                  <h6>Update Password</h6>
                  <label>New</label>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Password (Must be 12 characters)"
                      className="form-control"
                      name="password"
                    />
                    <i className="far fa-eye" />
                  </div>
                  <label>Old</label>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Re-Enter your password"
                      className="form-control"
                      name="password"
                    />
                    <i className="far fa-eye" />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-danger active primary"
                    name="button"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <div
              className="modal metro_comments-form fade"
              id="exampleModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <input
                        type="file"
                        placeholder="File"
                        className="form-control"
                        name="file"
                      />
                      <i className="far fa-file" />
                    </div>
                    <p>PNG or JPG (Max 10mb)</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-danger active">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
