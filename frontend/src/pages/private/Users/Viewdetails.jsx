import React, { useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toastify";
import { SlideMotion } from "../../../libs/FramerMotion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  editoraddBankUrl,
  edituserUrl,
  viewsingleuserUrl,
} from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";
import { Button, Form } from "react-bootstrap";
import Loader from "../../../Components/Loader";
import moment from "moment";
import ModalComponent from "../../../Components/ModalComponet";

function Viewdetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const id = data;
  const [password, setPassword] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [editBankDetails, setEditBankDetails] = useState({});
  console.log(editBankDetails,"editBankDetails")
  const [bankModal, setBankModal] = useState({ show: false, id: null });

  const clearMessageDiv = () => {
    const messageDiv = document.getElementById("msg");
    const errorDiv = document.getElementById("editmsg");

    if (messageDiv||errorDiv) {
      messageDiv.innerHTML = "";
      errorDiv.innerHTML = "";

    }
  };


  //-----------------get individaul user data-----------
  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", `${viewsingleuserUrl}/${id}`);
      console.log(response, "response");
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
    if (editUser?.name||editUser?.email||editUser?.address||editUser?.dateOfBirth||editUser?.password) {

    try {
      setIsLoading(true);
      const res = await ApiCall("post", `${edituserUrl}/${id}`, editUser);
      if (res?.status === 200) {
        Show_Toast("Successfully updated password", true);
        setIsLoading(false);
        setEditUser({
          name: "",
          address: "",
          password: "",
        });
        setPassword({
          confirmpassword: "",
        });
        getUserDetails();
      } else {
        console.log("Invalid user");
      }
    } catch (error) {
      Show_Toast(error, false);
    }    }

  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  //--------------add or edit bank dtails
  const addOrEditBank = async (e) => {
    e.preventDefault();
    const errorDiv = document.getElementById("editmsg");
  
    try {
      if (!editBankDetails?.holderName || editBankDetails?.bankName || editBankDetails?.accountNum || editBankDetails?.ifscCode) {
        errorDiv.innerHTML = "Please fill atleast one fields";
        Show_Toast("Please fill atleast one fields", false);
      }
  
      const createResponse = await ApiCall(
        "POST",
        `${editoraddBankUrl}?id=${details?.id}`,
        { ...editBankDetails }
      );
      console.log(createResponse, "response");
      if (createResponse.status === 200) {
        setBankModal(false);
        setEditBankDetails("");
        getUserDetails();
        Show_Toast("Bank details added successfully", true);
      } else {
        console.log(createResponse.error, "error");
        Show_Toast(createResponse.error, false);
      }
    } catch (error) {
      Show_Toast(error.message, false);
    }
  };
  
  
  useEffect(() => {
    if (id) {
      getUserDetails();
    }
  }, [data, id]);
  return (
    <>
      <div className="mt-5" style={{ alignItems: "center" }}>
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
                <i
                  className="fas fa-arrow-left "
                  style={{ marginRight: "5px" }}
                />
              </button>
              <div class="row mt-2">
                <div class="col-md-3  mb-4">
                  <div class="card " style={{ background: "#00335B" }}>
                    <div className="row align-items-center  p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Wallet Amount
                        </h5>
                        <div className="d-flex align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-3"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            {details?.walletAmount}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3  mb-4">
                  <div class="card " style={{ background: "#00335B" }}>
                    <div className="row align-items-center  p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Total Level Income
                        </h5>
                        <div className="d-flex align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-3"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            {details?.totalLevelIncome}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3  mb-4">
                  <div class="card " style={{ background: "#00335B" }}>
                    <div className="row align-items-center  p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          InDirect Income
                        </h5>
                        <div className="d-flex align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-3"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            {details?.inDirectIncome}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-3 mb-4">
                  <div class="card " style={{ background: "#00335B" }}>
                    <div className="row align-items-center p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Direct Income
                        </h5>
                        <div className="d-flex align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-3"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            {details?.directIncome}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                              <h5
                                className="card-title fw-semibold mb-4"
                                style={{ color: "rgba(247, 174, 21)" }}
                              >
                                Profile Details
                              </h5>
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
                                    <span
                                      style={{ color: "rgb(247, 174, 21)" }}
                                    >
                                      {details?.address || "--"}
                                    </span>
                                  </h6>
                                </li>
                                <li className="d-flex align-items-center gap-3 mb-4">
                                  <i className="fas fa-calendar-alt text-dark fs-6" />{" "}
                                  {/* Change the icon class to represent date of birth */}
                                  <h6 className="fs-4 fw-semibold mb-0">
                                    Date of Birth:{" "}
                                    <span
                                      style={{ color: "rgb(247, 174, 21)" }}
                                    >
                                      {details?.dateOfBirth
                                        ? moment(details.dateOfBirth).format(
                                            "DD/MM/YYYY"
                                          )
                                        : "--"}
                                    </span>
                                  </h6>
                                </li>

                                <li className="d-flex align-items-center gap-3 mb-4">
                                  <i className="fas fa-envelope text-dark fs-6" />
                                  <h6 className="fs-4 fw-semibold mb-0">
                                    Email:{" "}
                                    <span
                                      style={{ color: "rgb(247, 174, 21)" }}
                                    >
                                      {details?.email || "--"}
                                    </span>
                                  </h6>
                                </li>

                                <li className="d-flex align-items-center gap-3 mb-4">
                                  <i className="fas fa-phone text-dark fs-6" />
                                  <h6 className="fs-4 fw-semibold mb-0">
                                    Phone:{" "}
                                    <span
                                      style={{ color: "rgb(247, 174, 21)" }}
                                    >
                                      {details?.phone || "--"}
                                    </span>
                                  </h6>
                                </li>

                                <li className="d-flex align-items-center gap-3 mb-4">
                                  <i className="fas fa-user text-dark fs-6" />
                                  <h6 className="fs-4 fw-semibold mb-0">
                                    Sponsor Name:{" "}
                                    <span
                                      style={{ color: "rgb(247, 174, 21)" }}
                                    >
                                      {details?.sponserName || "--"}
                                    </span>
                                  </h6>
                                </li>

                                <li className="d-flex align-items-center gap-3 mb-4">
                                  <i className="fas fa-store text-dark fs-6" />
                                  <h6 className="fs-4 fw-semibold mb-0">
                                    Franchise Type:{" "}
                                    <span
                                      style={{ color: "rgb(247, 174, 21)" }}
                                    >
                                      {details?.franchise || "--"}
                                    </span>
                                  </h6>
                                </li>
                                <li className="d-flex align-items-center gap-3 mb-4">
                                  <i className="fas fa-money-bill-alt text-dark fs-6" />
                                  <h6 className="fs-4 fw-semibold mb-0">
                                    Package Amount:{" "}
                                    <span
                                      style={{ color: "rgb(247, 174, 21)" }}
                                    >
                                      {details?.packageAmount || "--"}
                                    </span>
                                  </h6>
                                </li>
                                {}
                                {details?.franchise !== "Mobile Franchise" && (
                                  <li className="d-flex align-items-center gap-3 mb-4">
                                    <i className="fas fa-building text-dark fs-6" />
                                    <h6 className="fs-4 fw-semibold mb-0">
                                      Franchise Name:{" "}
                                      <span
                                        style={{ color: "rgb(247, 174, 21)" }}
                                      >
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
                  <div className="col-lg-6 col-md-12 mt-4">
                    
                       
                        
                            <div className="card" style={{width:"200%"}}>
                              <div className="card-body" >
                                <h5
                                  className="card-title fw-semibold mb-4"
                                  style={{
                                    color: "rgba(247, 174, 21)",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span>Bank Details</span>
                                  <i
                                    className="fas fa-pencil-alt"
                                    onClick={() => {
                                      setBankModal({ show: true, id: null });
                                      setEditBankDetails(details?.bankDetails);
                                    }}
                                    style={{
                                      color: "black",
                                    }}
                                  ></i>
                                </h5>

                                <ul className="list-unstyled mt-3">
                                  <li className="d-flex align-items-center gap-3 mb-4">
                                    <i className="fas fa-user text-dark fs-6" />
                                    <h6 className="fs-4 fw-semibold mb-0">
                                      Account Holder Name:{" "}
                                      <span
                                        style={{ color: "rgb(247, 174, 21)" }}
                                      >
                                        {details?.bankDetails?.holderName}
                                      </span>
                                    </h6>
                                  </li>

                                  <li className="d-flex align-items-center gap-3 mb-4">
                                    <i className="fas fa-university text-dark fs-6" />
                                    <h6 className="fs-4 fw-semibold mb-0">
                                      Bank Name:{" "}
                                      <span
                                        style={{ color: "rgb(247, 174, 21)" }}
                                      >
                                        {details?.bankDetails?.bankName}
                                      </span>
                                    </h6>
                                  </li>

                                  <li className="d-flex align-items-center gap-3 mb-4">
                                    <i className="fas fa-credit-card text-dark fs-6" />
                                    <h6 className="fs-4 fw-semibold mb-0">
                                      Account Number:{" "}
                                      <span
                                        style={{ color: "rgb(247, 174, 21)" }}
                                      >
                                        {details?.bankDetails?.accountNum}
                                      </span>
                                    </h6>
                                  </li>

                                  <li className="d-flex align-items-center gap-3 mb-4">
                                    <i className="fas fa-unlock text-dark fs-6" />
                                    <h6 className="fs-4 fw-semibold mb-0">
                                      IFSC code:{" "}
                                      <span
                                        style={{ color: "rgb(247, 174, 21)" }}
                                      >
                                        {details?.bankDetails?.ifscCode}
                                      </span>
                                    </h6>
                                  </li>
                                </ul>
                              </div>
                            </div>
                        
                     
                   
                  </div>
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
                                htmlFor="franchiseType"
                                className="form-label"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control form-control-lg"
                                value={editUser?.email}
                                placeholder={details?.email}
                                onChange={(e) =>
                                  setEditUser({
                                    ...editUser,
                                    email: e.target.value,
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
                                htmlFor="exampleTextarea"
                                className="form-label"
                              >
                                Date Of Birth
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="exampleTextarea"
                                rows="3"
                                value={editUser?.dateOfBirth}
                                onChange={(e) =>
                                  setEditUser({
                                    ...editUser,
                                    dateOfBirth: e.target.value,
                                  })
                                }
                              />
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

      <ModalComponent
        show={bankModal.show}
        onHide={() => {
          setBankModal({ show: false, id: null });
        }}
        title={
          <h5 style={{ color: "#F7AE15", margin: 0 }}>
            <span>
              {editBankDetails?.id ? "Update Bank Details" : "Add Bank Details"}
            </span>
          </h5>
        }
        centered
        width={"500px"}
      >
        <Form onSubmit={addOrEditBank}>
          <div className="mb-3">
          <div id="editmsg" style={{ color: "red" }}></div>

            <label htmlFor="exampleInputEmail1" className="form-label">
              Account Holder Name{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder=" Enter account holder name"
              value={editBankDetails?.holderName}
              onChange={(e) => {
                setEditBankDetails({
                  ...editBankDetails,
                  holderName: e.target.value,
                });
                clearMessageDiv();
              }}
              
            />
          </div>
          <div className="mb-3">
            <label htmlFor="franchiseType" className="form-label">
              Bank Name
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={editBankDetails?.bankName}
              placeholder=" Enter bank name"
              onChange={(e) =>{
                setEditBankDetails({
                  ...editBankDetails,
                  bankName: e.target.value,
                });
                clearMessageDiv();
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleTextarea" className="form-label">
              Account Number
            </label>
            <input
              className="form-control"
              id="exampleTextarea"
              rows="3"
              value={editBankDetails?.accountNum}
              placeholder=" Enter account name"
              onChange={(e) =>{
                setEditBankDetails({
                  ...editBankDetails,
                  accountNum: e.target.value,
                })
                clearMessageDiv();
              }}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              IFCE code
            </label>
            <label htmlFor="transactionPassword" className="form-label"></label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder=" Enter IFSE code"
              value={editBankDetails?.ifscCode}
              onChange={(e) => {
                setEditBankDetails({
                  ...editBankDetails,
                  ifscCode: e.target.value,
                });
                clearMessageDiv();
              }}
            />
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-custom float-end ms-1">
              {editBankDetails?.id ? "Update" : "Save"}
            </button>
          </div>
        </Form>
        <button
          className="btn btn-cancel float-end me-1"
          onClick={() => {
            setStateModal({ show: false, id: null });
          }}
        >
          cancel
        </button>
      </ModalComponent>
    </>
  );
}

export default Viewdetails;
