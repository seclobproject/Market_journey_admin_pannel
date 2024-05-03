import React, { useContext, useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toastify";
import { SlideMotion } from "../../../libs/FramerMotion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addBonnusUrl,
  addoreditNomineeUrl,
  editoraddBankUrl,
  edituserUrl,
  viewsingleuserUrl,
} from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";
import { Button, Form } from "react-bootstrap";
import Loader from "../../../Components/Loader";
import moment from "moment";
import ModalComponent from "../../../Components/ModalComponet";
import { Dropdown, Image } from "antd";
import { ContextData } from "../../../Services/Context";
import { Menu } from "antd";
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
  const [addNomineeDetails, setAddNomineeDetails] = useState({});
  const [userDetailsArray, setUserDetailsArray] = useState([]);
  const [bankModal, setBankModal] = useState({ show: false, id: null });
  const [userModal, setUserModal] = useState({ show: false, id: null });
  const [nomineeModal, setNomineeModal] = useState({ show: false, id: null });
  const [bonusModal, setBonusModal] = useState({ show: false, id: null });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);

  const [addBonnus, setAddBonnus] = useState({
    bonusAmount: 0,
  });
  const clearMessageDiv = () => {
    const messageDiv = document.getElementById("msg");
    const errormsgDiv = document.getElementById("errormsg");
    if (messageDiv) {
      messageDiv.innerHTML = "";
    } else {
      errormsgDiv.innerHTML = "";
    }
  };

  //-----------------get individaul user data-----------
  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", `${viewsingleuserUrl}/${id}`);
      if (response?.status === 200) {
        const detailsArray = [
          {
            walletAmount: response.data.walletAmount,
          },
          {
            totalLevelIncome: response.data.totalLevelIncome,
          },
          {
            inDirectIncome: response.data.inDirectIncome,
          },
          {
            directIncome: response.data.directIncome,
          },
        ];

        setDetails(response?.data);
        setUserDetailsArray(detailsArray);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("An error occurred while fetching user details", error);
    }
  };

  ///----------update user details--------

  const updateUser = async (e) => {
    e.preventDefault();
    const messageDiv = document.getElementById("msg");
    const errormsgDiv = document.getElementById("errormsg");

    if (
      !(
        editUser?.name ||
        editUser?.email ||
        editUser?.address ||
        editUser?.dateOfBirth ||
        editUser?.password
      )
    ) {
      errormsgDiv.innerHTML = "Please fill at least one field";
      Show_Toast("Please fill at least one field", false);
      return;
    }

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
        setUserModal(false);
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
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  //--------------add or edit bank dtails
  const addOrEditBank = async (e) => {
    e.preventDefault();
    const errormsgDiv = document.getElementById("errormsg");

    try {
      if (
        !(
          editBankDetails?.holderName ||
          editBankDetails?.bankName ||
          editBankDetails?.accountNum ||
          editBankDetails?.ifscCode
        )
      ) {
        errormsgDiv.innerHTML = "Please fill at least one field";
        Show_Toast("Please fill at least one field", false);
        return; // Add this return statement to prevent API call
      }

      const createResponse = await ApiCall(
        "POST",
        `${editoraddBankUrl}?id=${details?.id}`,
        { ...editBankDetails }
      );
      if (createResponse.status === 200) {
        setBankModal(false);
        setEditBankDetails("");
        getUserDetails();
        Show_Toast("Bank details added successfully", true);
      } else {
        Show_Toast(createResponse.error, false);
      }
    } catch (error) {
      Show_Toast(error.message, false);
    }
  };
  //--------------add or editNominee

  const addOrEditNominee = async (e) => {
    e.preventDefault();
    const errormsgDiv = document.getElementById("errormsg");

    try {
      if (
        !(
          addNomineeDetails?.name ||
          addNomineeDetails?.phone ||
          addNomineeDetails?.address ||
          addNomineeDetails?.bankName ||
          addNomineeDetails?.accountNum ||
          addNomineeDetails?.ifscCode ||
          addNomineeDetails?.pancardNum ||
          addNomineeDetails?.aadhaarNum
        )
      ) {
        errormsgDiv.innerHTML = "Please fill at least one field";
        Show_Toast("Please fill at least one field", false);
        return; // Add this return statement to prevent API call
      }

      const createResponse = await ApiCall(
        "POST",
        `${addoreditNomineeUrl}?id=${details?.id}`,
        { ...addNomineeDetails }
      );
      if (createResponse.status === 200) {
        setNomineeModal(false);
        setAddNomineeDetails("");
        getUserDetails();
        Show_Toast("Nominee details added successfully", true);
      } else {
        console.log(createResponse.error, "error");
        Show_Toast(createResponse.error, false);
      }
    } catch (error) {
      Show_Toast(error.message, false);
    }
  };
  //---add bonnus-----
  const addBonnusToUser = async () => {
    try {
      const userId = bonusModal?.id;
      const bonusAmountNumber = Number(addBonnus?.bonusAmount);
      if (!(bonusAmountNumber > 0)) {
        Show_Toast("Please add a valid amount.");
        return;
      }

      const response = await ApiCall("post", `${addBonnusUrl}/${userId}`, {
        bonusAmount: bonusAmountNumber,
        description: addBonnus?.description,
        transactionId: addBonnus?.transactionId,

      });

      if (response.status === 200) {
        Show_Toast("Bonus added successfully.", true);
        setValidated(false);
        setBonusModal(false);
        setAddBonnus({
          bonusAmount: 0,
        });
      } else {
        Show_Toast("Failed to add bonus. Please try again.", false);
      }
    } catch (error) {
      Show_Toast(error.message, false);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1"></Menu.Item>
      <Menu.Item key="2">
        {details.userStatus === "approved" && (
          <i
            className="fas fa-eye"
            onClick={() => {
              navigate("/invoice", {
                state: { data: details },
              });
            }}
          >
            View Invoice
          </i>
        )}
      </Menu.Item>
      {/* <Menu.Item key="3">
        {details.userStatus === "approved" && (
          <i
            className="fas fa-eye"
            onClick={() => {
              navigate("/certificate", {
                state: { data: details },
              });
            }}
          >
            View Certificate
          </i>
        )}
      </Menu.Item> */}
    </Menu>
  );
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
                  backgroundColor: "#0F1535",
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
                  <div class="card " style={{ background: "#0F1535" }}>
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
                  <div class="card " style={{ background: "#0F1535" }}>
                    <div className="row align-items-center  p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Level Income
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
                  <div class="card " style={{ background: "#0F1535" }}>
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
                  <div class="card " style={{ background: "#0F1535" }}>
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
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <h5
                                  className="card-title fw-semibold mb-4"
                                  style={{
                                    color: "#0F1535",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span>Profile Details</span>
                                  <i
                                    className="fas fa-pencil-alt"
                                    onClick={() => {
                                      setUserModal({ show: true, id: null });
                                      setEditUser(details);
                                      setPassword({ confirmpassword: "" });
                                    }}
                                    style={{
                                      color: "black",
                                      cursor: "pointer",
                                    }}
                                  ></i>
                                </h5>
                              </div>
                              <div className="d-flex justify-content-end flex-wrap mt-3">

                              {details.packageType === "Franchise" && details.userStatus==="approved"&&!details.isPromoter&&
  <Button
    className="btn btn-custom"
    onClick={() => {
      setBonusModal({
        show: true,
        id: details?.id,
      });
      setValidated(false);
    }}
  >
    <i className="fas fa-plus"></i>
    Add Bonus
  </Button>
}











                                {details.userStatus === "approved" && (
                                  <Dropdown
                                    overlay={menu}
                                    placement="bottomLeft"
                                  >
                                    <Button className="btn btn-custom ms-2">
                                      More
                                    </Button>
                                  </Dropdown>
                                )}
                              </div>

                              <a
                                className="nav-link nav-icon-hover"
                                href={undefined}
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
                                    <span className="badge bg-warning rounded-3 fw-semibold">
                                      Pending
                                    </span>
                                  ) : (
                                    <span className="badge bg-success rounded-3 fw-semibold">
                                      Approved
                                    </span>
                                  )}
                                </div>
 
                              </div>
                              <div className="row mt-3">
                              <div className="col-3">
                  
                  {details?.renewalStatus ? (
                    <span className="badge bg-success rounded-3 fw-semibold">
                      Active Plan
                    </span>
                  ) : (
                    <span className="badge bg-danger rounded-3 fw-semibold">
                      Non active Plan
                    </span>
                  )}
                
                </div>
                              </div>
                      

                              <div className="mt-2">
                                <h5
                                  className="fs-5 mb-0 fw-semibold" // Removed margin-bottom and adjusted margin-right
                                  style={{
                                    textTransform: "uppercase",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <span style={{ marginRight: "0.5rem" }}>
                                    Userid:
                                  </span>
                                  <span style={{ color: "rgb(247, 174, 21)" }}>
                                    {details?.ownSponserId || "--"}
                                  </span>
                                </h5>
                              </div>

                              <div className="mt-2">
                                <h5
                                  className="fs-5 mb-0 fw-semibold" // Removed margin-bottom and adjusted margin-right
                                  style={{
                                    textTransform: "uppercase",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <span style={{ marginRight: "0.5rem" }}>
                                    Name:
                                  </span>
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
                                {details?.franchise == "District Franchise" && (
                                  <>
                                     <li className="d-flex align-items-center gap-3 mb-4">
                                      <i className="fas fa-user text-dark fs-6" />
                                      <h6 className="fs-4 fw-semibold mb-0">
                                        State :{" "}
                                        <span
                                          style={{ color: "rgb(247, 174, 21)" }}
                                        >
                                          {details?.state || "--"}
                                        </span>
                                      </h6>
                                    </li>
                                  
                                  </>
                                )}
                                {details?.franchise == "Zonal Franchise" && (
                                  <>
                                     <li className="d-flex align-items-center gap-3 mb-4">
                                      <i className="fas fa-user text-dark fs-6" />
                                      <h6 className="fs-4 fw-semibold mb-0">
                                        State :{" "}
                                        <span
                                          style={{ color: "rgb(247, 174, 21)" }}
                                        >
                                          {details?.state || "--"}
                                        </span>
                                      </h6>
                                    </li>
                                    <li className="d-flex align-items-center gap-3 mb-4">
                                      <i className="fas fa-user text-dark fs-6" />
                                      <h6 className="fs-4 fw-semibold mb-0">
                                        District :{" "}
                                        <span
                                          style={{ color: "rgb(247, 174, 21)" }}
                                        >
                                          {details?.district || "--"}
                                        </span>
                                      </h6>
                                    </li>
                                  
                                 
                                  </>
                                )}
                                  {details?.franchise == "Mobile Franchise" && (
                                   <>
                                   <li className="d-flex align-items-center gap-3 mb-4">
                                    <i className="fas fa-user text-dark fs-6" />
                                    <h6 className="fs-4 fw-semibold mb-0">
                                      State :{" "}
                                      <span
                                        style={{ color: "rgb(247, 174, 21)" }}
                                      >
                                        {details?.state || "--"}
                                      </span>
                                    </h6>
                                  </li>
                                  <li className="d-flex align-items-center gap-3 mb-4">
                                    <i className="fas fa-user text-dark fs-6" />
                                    <h6 className="fs-4 fw-semibold mb-0">
                                      District :{" "}
                                      <span
                                        style={{ color: "rgb(247, 174, 21)" }}
                                      >
                                        {details?.district || "--"}
                                      </span>
                                    </h6>
                                  </li>
                                  <li className="d-flex align-items-center gap-3 mb-4">
                                    <i className="fas fa-user text-dark fs-6" />
                                    <h6 className="fs-4 fw-semibold mb-0">
                                      Zonal :{" "}
                                      <span
                                        style={{ color: "rgb(247, 174, 21)" }}
                                      >
                                        {details?.zonal || "--"}
                                      </span>
                                    </h6>
                                  </li>
                                  <li className="d-flex align-items-center gap-3 mb-4">
                                    <i className="fas fa-user text-dark fs-6" />
                                    <h6 className="fs-4 fw-semibold mb-0">
                                      Panchayath :{" "}
                                      <span
                                        style={{ color: "rgb(247, 174, 21)" }}
                                      >
                                        {details?.panchayath || "--"}
                                      </span>
                                    </h6>
                                  </li>
                                </>
                                )}
                                {details?.packageType == "Courses" || details?.packageType =="Signals" &&(
                                  <>
                                     <li className="d-flex align-items-center gap-3 mb-4">
                                      <i className="fas fa-user text-dark fs-6" />
                                      <h6 className="fs-4 fw-semibold mb-0">
                                        State :{" "}
                                        <span
                                          style={{ color: "rgb(247, 174, 21)" }}
                                        >
                                          {details?.state || "--"}
                                        </span>
                                      </h6>
                                    </li>
                                    <li className="d-flex align-items-center gap-3 mb-4">
                                      <i className="fas fa-user text-dark fs-6" />
                                      <h6 className="fs-4 fw-semibold mb-0">
                                        District :{" "}
                                        <span
                                          style={{ color: "rgb(247, 174, 21)" }}
                                        >
                                          {details?.district || "--"}
                                        </span>
                                      </h6>
                                    </li>
                                    <li className="d-flex align-items-center gap-3 mb-4">
                                      <i className="fas fa-user text-dark fs-6" />
                                      <h6 className="fs-4 fw-semibold mb-0">
                                        Zonal :{" "}
                                        <span
                                          style={{ color: "rgb(247, 174, 21)" }}
                                        >
                                          {details?.zonal || "--"}
                                        </span>
                                      </h6>
                                    </li>
                                    <li className="d-flex align-items-center gap-3 mb-4">
                                      <i className="fas fa-user text-dark fs-6" />
                                      <h6 className="fs-4 fw-semibold mb-0">
                                        Panchayath :{" "}
                                        <span
                                          style={{ color: "rgb(247, 174, 21)" }}
                                        >
                                          {details?.panchayath || "--"}
                                        </span>
                                      </h6>
                                    </li>
                                  </>
                                )}
                                

                                <li className="d-flex align-items-center gap-3 mb-4">
                                  <i className="fas fa-store text-dark fs-6" />
                                  <h6 className="fs-4 fw-semibold mb-0">
                                    Package Type:{" "}
                                    <span
                                      style={{ color: "rgb(247, 174, 21)" }}
                                    >
                                      {details?.packageType || "--"}
                                    </span>
                                  </h6>
                                </li>
                                
                                <li className="d-flex align-items-center gap-3 mb-4">
                                  <i className="fas fa-store text-dark fs-6" />
                                  <h6 className="fs-4 fw-semibold mb-0">
                                    Package:{" "}
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
                                      ₹ {details?.packageAmount || "--"}
                                    </span>
                                  </h6>
                                </li>
                         
                                {!(details?.franchise === "Mobile Franchise" || details?.packageType === "Courses"||details?.packageType==="Signals") && (
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


                                {details?.screenshot && (
                                  <Image
                                    width={200}
                                    // src={`http://192.168.29.152:6003/uploads/${details?.screenshot}`}
                                    src={`https://admin.marketjourney.in/uploads/${details?.screenshot}`}

                                  />
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div className="col-lg-6 col-md-12 ">
                  <div className="card">
                    <div className="card-body">
                      <h5
                        className="card-title fw-semibold mb-4"
                        style={{
                          color: "#0F1535",
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
                            cursor: "pointer",
                          }}
                        ></i>
                      </h5>

                      <ul className="list-unstyled mt-3">
                        <li className="d-flex align-items-center gap-3 mb-4">
                          <i className="fas fa-user text-dark fs-6" />
                          <h6 className="fs-4 fw-semibold mb-0">
                            Account Holder Name:{" "}
                            <span style={{ color: "rgb(247, 174, 21)" }}>
                              {details?.bankDetails?.holderName}
                            </span>
                          </h6>
                        </li>

                        <li className="d-flex align-items-center gap-3 mb-4">
                          <i className="fas fa-university text-dark fs-6" />
                          <h6 className="fs-4 fw-semibold mb-0">
                            Bank Name:{" "}
                            <span style={{ color: "rgb(247, 174, 21)" }}>
                              {details?.bankDetails?.bankName}
                            </span>
                          </h6>
                        </li>

                        <li className="d-flex align-items-center gap-3 mb-4">
                          <i className="fas fa-credit-card text-dark fs-6" />
                          <h6 className="fs-4 fw-semibold mb-0">
                            Account Number:{" "}
                            <span style={{ color: "rgb(247, 174, 21)" }}>
                              {details?.bankDetails?.accountNum}
                            </span>
                          </h6>
                        </li>

                        <li className="d-flex align-items-center gap-3 mb-4">
                          <i className="fas fa-unlock text-dark fs-6" />
                          <h6 className="fs-4 fw-semibold mb-0">
                            IFSC code:{" "}
                            <span style={{ color: "rgb(247, 174, 21)" }}>
                              {details?.bankDetails?.ifscCode}
                            </span>
                          </h6>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card mt-4">
                    <div className="card-body">
                      <h5
                        className="card-title fw-semibold mb-4"
                        style={{
                          color: "#0F1535",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Nominee Details</span>
                        <i
                          className="fas fa-pencil-alt"
                          onClick={() => {
                            setNomineeModal({ show: true, id: null });
                            setAddNomineeDetails(details?.nomineeDetails);
                          }}
                          style={{
                            color: "black",
                            cursor: "pointer",
                          }}
                        ></i>
                      </h5>

                      <ul className="list-unstyled mt-3">
                        <li className="d-flex align-items-center gap-3 mb-4">
                          <i className="fas fa-user text-dark fs-6" />
                          <h6 className="fs-4 fw-semibold mb-0">
                            Name:{" "}
                            <span style={{ color: "rgb(247, 174, 21)" }}>
                              {details?.nomineeDetails?.name}
                            </span>
                          </h6>
                        </li>
                        <li className="d-flex align-items-center gap-3 mb-4">
                          <i className="fas fa-phone text-dark fs-6" />
                          <h6 className="fs-4 fw-semibold mb-0">
                            Phone:{" "}
                            <span style={{ color: "rgb(247, 174, 21)" }}>
                              {details?.nomineeDetails?.phone}
                            </span>
                          </h6>
                        </li>
                        <li className="d-flex align-items-center gap-3 mb-4">
                          <i className="fas fa-id-card text-dark fs-6" />
                          <h6 className="fs-4 fw-semibold mb-0">
                            Aadhaar Number:{" "}
                            <span style={{ color: "rgb(247, 174, 21)" }}>
                              {details?.nomineeDetails?.aadhaarNum}
                            </span>
                          </h6>
                        </li>
                        <li className="d-flex align-items-center gap-3 mb-4">
                          <i className="fas fa-id-card-alt text-dark fs-6" />
                          <h6 className="fs-4 fw-semibold mb-0">
                            Pan Card Number:{" "}
                            <span style={{ color: "rgb(247, 174, 21)" }}>
                              {details?.nomineeDetails?.pancardNum}
                            </span>
                          </h6>
                        </li>
                        <li className="d-flex align-items-center gap-3 mb-4">
                          <i className="fas fa-map-marker-alt text-dark fs-6" />
                          <h6 className="fs-4 fw-semibold mb-0">
                            Address:{" "}
                            <span style={{ color: "rgb(247, 174, 21)" }}>
                              {details?.nomineeDetails?.address}
                            </span>
                          </h6>
                        </li>

                        <li className="d-flex align-items-center gap-3 mb-4">
                          <i className="fas fa-university text-dark fs-6" />
                          <h6 className="fs-4 fw-semibold mb-0">
                            Bank Name:{" "}
                            <span style={{ color: "rgb(247, 174, 21)" }}>
                              {details?.nomineeDetails?.bankName}
                            </span>
                          </h6>
                        </li>

                        <li className="d-flex align-items-center gap-3 mb-4">
                          <i className="fas fa-credit-card text-dark fs-6" />
                          <h6 className="fs-4 fw-semibold mb-0">
                            Account Number:{" "}
                            <span style={{ color: "rgb(247, 174, 21)" }}>
                              {details?.nomineeDetails?.accountNum}
                            </span>
                          </h6>
                        </li>

                        <li className="d-flex align-items-center gap-3 mb-4">
                          <i className="fas fa-unlock text-dark fs-6" />
                          <h6 className="fs-4 fw-semibold mb-0">
                            IFSC code:{" "}
                            <span style={{ color: "rgb(247, 174, 21)" }}>
                              {details?.nomineeDetails?.ifscCode}
                            </span>
                          </h6>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideMotion>
        )}
      </div>
      {/* update  user detials modal */}
      <ModalComponent
        show={userModal.show}
        onHide={() => {
          setUserModal({ show: false, id: null });
        }}
        title={
          <h5 style={{ color: "#F7AE15", margin: 0 }}>
            <span>Edit User Details</span>
          </h5>
        }
        centered
        width={"500px"}
      >
        <Form onSubmit={updateUser}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              // placeholder={details?.name}
              value={editUser?.name}
              onChange={(e) => {
                setEditUser({
                  ...editUser,
                  name: e.target.value,
                });
                clearMessageDiv();
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="franchiseType" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              value={editUser?.email}
              placeholder="Enter email"
              onChange={(e) => {
                setEditUser({
                  ...editUser,
                  email: e.target.value,
                });
                clearMessageDiv();
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleTextarea" className="form-label">
              Address
            </label>
            <textarea
              className="form-control"
              id="exampleTextarea"
              rows="3"
              value={editUser?.address}
              placeholder="Enter address"
              onChange={(e) => {
                setEditUser({
                  ...editUser,
                  address: e.target.value,
                });
                clearMessageDiv();
              }}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleTextarea" className="form-label">
              Date Of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleTextarea"
              rows="3"
              value={editUser?.dateOfBirth}
              onChange={(e) => {
                setEditUser({
                  ...editUser,
                  dateOfBirth: e.target.value,
                });
                clearMessageDiv();
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
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
            <label htmlFor="exampleInputPassword1" className="form-label">
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
          <div id="errormsg" style={{ color: "red" }}></div>

          <div className="col-12 mt-4">
            <Button
              className={`btn btn-custom  float-end me-1 ${
                isLoading ? "loading" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
        <Button
          className="btn btn-cancel  float-end me-1"
          onClick={() => {
            setUserModal({ show: false, id: null });
          }}
        >
          Cancel
        </Button>
      </ModalComponent>
      {/* update  user Bank detils modal */}
      <ModalComponent
        show={bankModal.show}
        onHide={() => {
          setBankModal({ show: false, id: null });
        }}
        title={
          <h5 style={{ color: "#F7AE15", margin: 0 }}>
            <span>Add Or Update Bank Details</span>
          </h5>
        }
        centered
        width={"500px"}
      >
        <Form onSubmit={addOrEditBank}>
          <div className="mb-3">
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
              onChange={(e) => {
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
              onChange={(e) => {
                setEditBankDetails({
                  ...editBankDetails,
                  accountNum: e.target.value,
                });
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
          <div id="errormsg" style={{ color: "red" }}></div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-custom float-end ms-1">
              {editBankDetails?.id ? "Update" : "Save"}
            </button>
          </div>
        </Form>
        <button
          className="btn btn-cancel float-end me-1"
          onClick={() => {
            setBankModal({ show: false, id: null });
          }}
        >
          cancel
        </button>
      </ModalComponent>
      {/* update  Nominee  detils modal */}
      <ModalComponent
        show={nomineeModal.show}
        onHide={() => {
          setNomineeModal({ show: false, id: null });
        }}
        title={
          <h5 style={{ color: "#F7AE15", margin: 0 }}>
            <span>Add Or Update Nominee Details</span>
          </h5>
        }
        centered
        width={"500px"}
      >
        <Form onSubmit={addOrEditNominee}>
          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Nominee Name{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Enter nominee name"
                value={addNomineeDetails?.name}
                onChange={(e) => {
                  setAddNomineeDetails({
                    ...addNomineeDetails,
                    name: e.target.value,
                  });
                  clearMessageDiv();
                }}
              />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="franchiseType" className="form-label">
                Phone number
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder=" Enter phone number"
                value={addNomineeDetails?.phone}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  const numericValue = enteredValue.replace(/\D/g, "");
                  const limitedValue = numericValue.slice(0, 15);
                  setAddNomineeDetails({
                    ...addNomineeDetails,
                    phone: limitedValue,
                  });
                  clearMessageDiv();
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="franchiseType" className="form-label">
              Address
            </label>
            <textarea
              className="form-control form-control-lg"
              style={{ height: "100px" }}
              placeholder="Enter a address"
              value={addNomineeDetails?.address}
              onChange={(e) => {
                setAddNomineeDetails({
                  ...addNomineeDetails,
                  address: e.target.value,
                });
                clearMessageDiv();
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleTextarea" className="form-label">
              Bank Name
            </label>
            <input
              className="form-control"
              id="exampleTextarea"
              rows="3"
              value={addNomineeDetails?.bankName}
              placeholder=" Enter Bank Name"
              onChange={(e) => {
                setAddNomineeDetails({
                  ...addNomineeDetails,
                  bankName: e.target.value,
                });
                clearMessageDiv();
              }}
            ></input>
          </div>
          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="exampleTextarea" className="form-label">
                Account Number
              </label>
              <input
                className="form-control"
                id="exampleTextarea"
                rows="3"
                value={addNomineeDetails?.accountNum}
                placeholder=" Enter account name"
                onChange={(e) => {
                  setAddNomineeDetails({
                    ...addNomineeDetails,
                    accountNum: e.target.value,
                  });
                  clearMessageDiv();
                }}
              ></input>
            </div>

            <div className="col-6 mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                IFCE code
              </label>
              <label
                htmlFor="transactionPassword"
                className="form-label"
              ></label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder=" Enter IFSE code"
                value={addNomineeDetails?.ifscCode}
                onChange={(e) => {
                  setAddNomineeDetails({
                    ...addNomineeDetails,
                    ifscCode: e.target.value,
                  });
                  clearMessageDiv();
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="exampleTextarea" className="form-label">
                Aadhaar Number
              </label>
              <input
                className="form-control"
                id="exampleTextarea"
                rows="3"
                value={addNomineeDetails?.aadhaarNum}
                placeholder=" Enter aadhaar Number"
                onChange={(e) => {
                  setAddNomineeDetails({
                    ...addNomineeDetails,
                    aadhaarNum: e.target.value,
                  });
                  clearMessageDiv();
                }}
              ></input>
            </div>

            <div className="col-6 mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Pancard Number
              </label>
              <label
                htmlFor="transactionPassword"
                className="form-label"
              ></label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder=" Enter pancard number"
                value={addNomineeDetails?.pancardNum}
                onChange={(e) => {
                  setAddNomineeDetails({
                    ...addNomineeDetails,
                    pancardNum: e.target.value,
                  });
                  clearMessageDiv();
                }}
              />
            </div>
          </div>
          <div id="errormsg" style={{ color: "red" }}></div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-custom float-end ms-1">
              Save
            </button>
          </div>
        </Form>
        <button
          className="btn btn-cancel float-end me-1"
          onClick={() => {
            setBankModal({ show: false, id: null });
          }}
        >
          cancel
        </button>
      </ModalComponent>

      {/* add bonnus modal */}

      <ModalComponent
        show={bonusModal.show}
        onHide={() => {
          setBonusModal({ show: false, id: null });
        }}
        title={<h5 style={{ color: "#F7AE15", margin: 0 }}>Add Bonus</h5>}
        width={"500px"}
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => Check_Validation(e, addBonnusToUser, setValidated)}
        >
          <h1 style={{ color: "#00335B" }}>₹{addBonnus?.bonusAmount}</h1>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Bonnus Amount
            </label>
            <input
              required
              className="form-control form-control-lg"
              type="number"
              placeholder="Enter an amount"
              value={addBonnus?.bonusAmount}
              onChange={(e) =>
                setAddBonnus({
                  ...addBonnus,
                  bonusAmount: e.target.value,
                })
              }
            />

            <Form.Control.Feedback type="invalid">
              Please provide a bonus amount.
            </Form.Control.Feedback>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Description
            </label>
            <textarea
              required
              className="form-control form-control-lg"
              style={{ height: "100px" }}
              placeholder="Enter a description"
              value={addBonnus?.description}
              onChange={(e) =>
                setAddBonnus({
                  ...addBonnus,
                  description: e.target.value,
                })
              }
            />

            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
          </div>
    

          <div className="col-12 mt-5">
            <button type="submit" className="btn btn-custom float-end">
              {/* {addLocation?._id ? 'Update' : 'Save'}  */}Send
            </button>
          </div>
        </Form>
        <button
          className="btn btn-cancel float-end me-1"
          onClick={() => {
            setBonusModal({ show: false, id: null });
            setAddBonnus({
              bonusAmount: 0,
            });
          }}
        >
          Cancel
        </button>
      </ModalComponent>
    </>
  );
}

export default Viewdetails;
