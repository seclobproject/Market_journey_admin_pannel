import React, { useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toast";
import { SlideMotion } from "../../../libs/FramerMotion";
import { useLocation, useNavigate } from "react-router-dom";
import { edituserUrl, viewsingleuserUrl } from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";
import { Button } from "react-bootstrap";
import Loader from "../../../Components/Loader";

function Viewdetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const id = data;
  const [password, setPassword] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({});
  console.log(details,"sss")
  const [showPassword, setShowPassword] = useState(false);

  const [editUser, setEditUser] = useState({});
  const [update, setUpdate] = useState({});
  console.log(editUser,"editUser")



  const clearMessageDiv = () => {
    const messageDiv = document.getElementById("msg");
    if (messageDiv) {
      messageDiv.innerHTML = "";
    }
  };

  //-----------------get individaul user data----------------------
  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", `${viewsingleuserUrl}/${id}`);
      if (response?.status === 200) {
        setDetails(response?.data);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("An error occurred while fetching user details", error);
    }
  };

  ///----------update user details--------

  const updateUser = async () => {
    const messageDiv = document.getElementById("msg");

    if (
      typeof password?.confirmpassword === "string" &&
      typeof editUser?.password === "string" &&
      password?.confirmpassword.trim() !== editUser?.password.trim()
    ) {
      messageDiv.innerHTML = "Password and confirm password do not match";
      Show_Toast("Password and confirm password do not match", false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await ApiCall("post", `${edituserUrl}/${id}`, editUser);
      if (res?.status === 200) {
        Show_Toast("Successfully updated password", true);
        setIsLoading(false);
        setEditUser({
          name:"",
          address:"",
          password:""
        });
        setPassword({
          confirmpassword:""
        });
        set
        getUserDetails();
      } else {
        console.log("Invalid user");
      }
    } catch (error) {
      Show_Toast(error, false);
    }
  };
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (id) {
      getUserDetails();
    }
  }, [data, id]);
  return (
    <>
    <div className="mt-5"style={{alignItems:'center'}}>
        {isLoading ? (
            <Loader />
          ) : (
      <SlideMotion>
        <div className="container-fluid">
          <button
            className="mt-3"
            onClick={() => {
              navigate(-1);
            }}
            style={{
              backgroundColor: "#00335B",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Icon */}
            <i className="fas fa-arrow-left " style={{ marginRight: "5px" }} />
          </button>
          <div className="row mt-2">
            <div className="col-lg-6 col-md-12">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                  tabIndex={0}
                >
                  <div className="row">
                    <div className="">
                      <div className="card shadow-none border">
                        <div className="card-body">
                          <a
                            className="nav-link nav-icon-hover"
                            href="javascript:void(0)"
                            id="drop2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img
                              src="../../dist/images/profile/user-7.jpg"
                              className="rounded-circle"
                              width={100}
                              height={100}
                              alt
                            />
                          </a>
                          <div className="row mt-3">
                            <div className="col-3">
                              {details?.userStatus === "readyToApprove" ? (
                                <span className="badge bg-danger rounded-3 fw-semibold">
                                  Ready to approve
                                </span>
                              ) : details?.userStatus === "pending" ? (
                                <span className="badge bg-primary rounded-3 fw-semibold">
                                  Pending
                                </span>
                              ) : (
                                <span className="badge bg-success rounded-3 fw-semibold">
                                  Approved
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-4">
                            <h5
                              className="fs-5 mb-0 fw-semibold"
                              style={{ textTransform: "uppercase" }}
                            >
                              Name:{" "}
                              <span style={{ color: "rgb(247, 174, 21)" }}>
                                {details?.name || "--"}
                              </span>
                            </h5>
                          </div>

                          <ul className="list-unstyled mt-3">
                            <li className="d-flex align-items-center gap-3 mb-4">
                              <i className="fas fa-map-marker-alt text-dark fs-6" />
                              <h6 className="fs-4 fw-semibold mb-0">
                                Address:{" "}
                                <span style={{ color: "rgb(247, 174, 21)" }}>
                                  {details?.address || "--"}
                                </span>
                              </h6>
                            </li>

                            <li className="d-flex align-items-center gap-3 mb-4">
                              <i className="fas fa-envelope text-dark fs-6" />
                              <h6 className="fs-4 fw-semibold mb-0">
                                Email:{" "}
                                <span style={{ color: "rgb(247, 174, 21)" }}>
                                  {details?.email || "--"}
                                </span>
                              </h6>
                            </li>

                            <li className="d-flex align-items-center gap-3 mb-4">
                              <i className="fas fa-phone text-dark fs-6" />
                              <h6 className="fs-4 fw-semibold mb-0">
                                Phone:{" "}
                                <span style={{ color: "rgb(247, 174, 21)" }}>
                                  {details?.phone || "--"}
                                </span>
                              </h6>
                            </li>

                            <li className="d-flex align-items-center gap-3 mb-4">
                              <i className="fas fa-user text-dark fs-6" />
                              <h6 className="fs-4 fw-semibold mb-0">
                                Sponsor Name:{" "}
                                <span style={{ color: "rgb(247, 174, 21)" }}>
                                  {details?.sponserName || "--"}
                                </span>
                              </h6>
                            </li>

                            <li className="d-flex align-items-center gap-3 mb-4">
                              <i className="fas fa-store text-dark fs-6" />
                              <h6 className="fs-4 fw-semibold mb-0">
                                Franchise Type:{" "}
                                <span style={{ color: "rgb(247, 174, 21)" }}>
                                  {details?.franchise || "--"}
                                </span>
                              </h6>
                            </li>
{

}
                            {details?.franchise!== "Mobile Franchise" && (
  <li className="d-flex align-items-center gap-3 mb-4">
    <i className="fas fa-building text-dark fs-6" />
    <h6 className="fs-4 fw-semibold mb-0">
      Franchise Name:{" "}
      <span style={{ color: "rgb(247, 174, 21)" }}>
        {details?.franchiseName || "--"}
      </span>
    </h6>
  </li>
)}

                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5
                    className="card-title fw-semibold mb-4"
                    style={{ color: "rgba(247, 174, 21)" }}
                  >
                    Edit Details
                  </h5>
                  <div className="card">
                    <div className="card-body">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateUser();
                        }}
                      >
                        {" "}
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Name{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder={details?.name}
                            value={editUser?.name}
                            onChange={(e) =>
                              setEditUser({
                                ...editUser,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleTextarea"
                            className="form-label"
                          >
                            Address
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleTextarea"
                            rows="3"
                            value={editUser?.address}
                            placeholder={details?.address}
                            onChange={(e) =>
                              setEditUser({
                                ...editUser,
                                address: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label"
                          >
                            New Password
                          </label>
                          <label
                            htmlFor="transactionPassword"
                            className="form-label"
                            onClick={handlePasswordToggle}
                          >
                            {showPassword ? (
                              <i className="fas fa-eye-slash"></i>
                            ) : (
                              <i className="fas fa-eye"></i>
                            )}{" "}
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="**********"
                            value={editUser?.password}
                            onChange={(e) => {
                              setEditUser({
                                ...editUser,
                                password: e.target.value,
                              });
                              clearMessageDiv();
                            }}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label"
                          >
                            Confirm Password
                          </label>
                          <label
                            htmlFor="transactionPassword"
                            className="form-label"
                            onClick={handlePasswordToggle}
                          >
                            {showPassword ? (
                              <i className="fas fa-eye-slash"></i>
                            ) : (
                              <i className="fas fa-eye"></i>
                            )}{" "}
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="**********"
                            value={password?.confirmpassword}
                            onChange={(e) => {
                              setPassword({
                                ...password,
                                confirmpassword: e.target.value,
                              });
                              clearMessageDiv();
                            }}
                          />
                        </div>
                        <div id="msg" style={{ color: "red" }}></div>
                        <Button
                          className={`btn btn-custom mt-3 w-100 py-8 rounded-2 ${
                            isLoading ? "loading" : ""
                          }`}
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? "Updating..." : "Update"}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </SlideMotion>
                  )}
                              </div>

    </>
  );
}

export default Viewdetails;
