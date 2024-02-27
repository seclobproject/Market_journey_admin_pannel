import React, { useContext, useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import ModalComponent from "../../../Components/ModalComponet";
import { ContextData } from "../../../Services/Context";
import { Form } from "react-bootstrap";
import DeleteConfirmation from "../../../Components/DeleteConfirmation";
import Select from "react-select";
import {
  districtlistinZonalUrl,
  memberaddUrl,
  packagesListUrl,
  panchayathlistindropdownUrl,
  statelistPageUrl,
  zonallistindropdownUrl,
} from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";
import { Show_Toast } from "../../../utils/Toast";

function Member() {
  const [memberModal, setMemberModal] = useState({ show: false, id: null });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [addMember, setAddMember] = useState({});
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [zonalList, setZonalList] = useState([]);
  const [panchayathList, setPanchayathList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  console.log(packageList, "packageList dataaaaa");
  const [packageAmount, setPackageAmount] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showTransPassword, setShowTransPassword] = useState(false);

  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [selectedZonalId, setSelectedZonalId] = useState(null);
  console.log(selectedStateId, "selectedStateId List");
  console.log(selectedDistrictId, "selectedDistrictId List");
  console.log(selectedZonalId, "selectedZonalId");

  console.log(districtList, "district List");
  const [selectedState, setSelectedState] = useState(null);

  //-----------list district in drop down--------
  const getStateList = async () => {
    try {
      const response = await ApiCall("get", statelistPageUrl);

      if (response.status === 200) {
        setStateList(response?.data?.states);
      } else {
        console.error(
          "Error fetching state list. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching state list:", error);
    }
  };
  //-----------list district in drop down--------
  const getDistrictList = async () => {
    try {
      console.log("District api is called api ");

      const response = await ApiCall(
        "get",
        `${districtlistinZonalUrl}/${selectedStateId}`
      );
      console.log(response, "from api call");
      if (response.status === 200) {
        setDistrictList(response?.data?.districts);
      } else {
        console.error(
          "Error fetching state list. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching state list:", error);
    }
  };
  //-----------list Zonal in drop down--------
  const getZonallist = async () => {
    try {
      const response = await ApiCall(
        "get",
        `${zonallistindropdownUrl}/${selectedDistrictId}`
      );
      console.log(response, "from api call");
      if (response.status === 200) {
        setZonalList(response?.data?.zonals);
      } else {
        console.error(
          "Error fetching state list. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching state list:", error);
    }
  };
  //-----------list Zonal in drop down--------
  const getPanchayathList = async () => {
    try {
      const response = await ApiCall(
        "get",
        `${panchayathlistindropdownUrl}/${selectedZonalId}`
      );
      console.log(response, "from api callssssssssssss");
      if (response.status === 200) {
        setPanchayathList(response?.data?.panchayaths);
      } else {
        console.error(
          "Error fetching state list. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching state list:", error);
    }
  };
  //-----------list pacakges in drop down--------
  const getPackagesList = async () => {
    try {
      const response = await ApiCall("get", packagesListUrl);
      console.log(response, "from api callssssssssssss");
      if (response.status === 200) {
        setPackageList(response?.data?.packageData);
      } else {
        console.error(
          "Error fetching state list. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching state list:", error);
    }
  };
  //---------Add--panchayath---------
  const addMemberFun = async () => {
    console.log("here");

    try {
      const response = await ApiCall("post", memberaddUrl, addMember);
      console.log(response, " from add panchyath");
      if (response.status === 200) {
        setMemberModal(false);
        setValidated(false);
        setAddMember("");
        // ();
        Show_Toast("Member added successfully", true);
      } else {
        Show_Toast("Member added failed", false);
      }
    } catch (error) {
      Show_Toast(error, false);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordTransToggle = () => {
    setShowTransPassword(!showTransPassword);
  };

  useEffect(() => {
    getPackagesList();
    if (
      selectedStateId &&
      (addMember?.franchise === "Zonal Franchise" ||
        addMember?.franchise === "Mobile Franchise")
    ) {
      getDistrictList();
    }
  }, [selectedStateId, addMember?.franchise]);

  useEffect(() => {
    if (selectedDistrictId) {
      getZonallist();
    }

    if (selectedZonalId) {
      getPanchayathList();
    }
  }, [selectedDistrictId, selectedZonalId]);

  console.log(addMember, "add member");

  const packageOptions = packageList.map((pack) => ({
    value: pack.franchiseName,
    label: pack.franchiseName,
    packageAmount: pack.packageAmount, // Add the packageAmount property
  }));
  return (
    <>
      <SlideMotion>
        <div className="card w-100 position-relative overflow-hidden">
          {" "}
          <h5
            className="card-title fw-semibold mb-0 lh-sm px-4 mt-3"
            style={{ color: "#F7AE15" }}
          >
            Members
          </h5>
          <div className="px-4 py-3 border-bottom d-flex  align-items-center justify-content-between">
            <div className=" d-flex align-items-center ">
              <form className="position-relative">
                <input
                  type="text"
                  className="form-control search-chat py-2 ps-5"
                  id="text-srh"
                  placeholder="Search "
                  // onChange={(e) =>
                  //   setParams({ ...params, query: e.target.value })
                  // }
                  // value={params?.query}
                />
                <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
              </form>
            </div>

            <div>
              <button
                className="btn btn-custom  ms-3 float-end"
                onClick={() => setMemberModal({ show: true, id: null })}
              >
                Add
              </button>
            </div>
          </div>
          <div className="card-body p-2">
            <div className="table-container table-responsive rounded-2 mb-4">
              <table className="table border text-nowrap customize-table mb-0 align-middle">
                <thead className="text-dark fs-4 table-light">
                  <tr>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Name</h6>
                    </th>

                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Phone</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Email</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Username</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Password</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">User Role</h6>
                    </th>

                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Action</h6>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-1">
                            <h6 className="fs-4 fw-semibold mb-0"></h6>
                          </div>
                        </div>
                      </td>

                      <td></td>
                      <td>
                        <p className="mb-0 fw-normal"></p>
                      </td>
                      <td>
                        <span className="mb-0 fw-normal"></span>
                      </td>
                      <td>
                        <span className="mb-0 fw-normal"></span>
                      </td>

                      <td>
                        <div className="dropdown dropstart">
                          <a
                            href="#"
                            className="text-muted"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="ti ti-dots fs-5" />
                          </a>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li>
                              <a
                                className="dropdown-item d-flex align-items-center gap-3"
                                //   onClick={() => handleEdit(staff)}
                              >
                                <i className="fs-4 ti ti-edit" />
                                Edit
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item d-flex align-items-center gap-3"
                                href="#"
                                onClick={() =>
                                  setDeleteModal({
                                    show: true,
                                    // id: staff?._id,
                                  })
                                }
                              >
                                <i className="fs-4 ti ti-trash" />
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </>
                </tbody>
              </table>
            </div>
          </div>
          <div className="me-2">
            {/* -------------------------pagination--------------------- */}
            {/* <Pagination
              pagination={pagination}
              params={params}
              setParams={setParams}
            /> */}
            {/* -------------------------pagination--------------------- */}
          </div>
        </div>
        <ModalComponent
          show={memberModal.show}
          onHide={() => {
            setMemberModal({ show: false, id: null });
          }}
          title={<h5 style={{ color: "#F7AE15", margin: 0 }}>Add Members</h5>}
          width={"900px"}
        >
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => Check_Validation(e, addMemberFun, setValidated)}
          >
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="franchiseType" className="form-label">
                  Name
                </label>
                <input
                  required
                  className="form-control form-control-lg"
                  placeholder="Enter a name"
                  value={addMember?.name}
                  onChange={(e) =>
                    setAddMember({
                      ...addMember,
                      name: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a name.
                </Form.Control.Feedback>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="franchiseType" className="form-label">
                  Email
                </label>
                <input
                  required
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a email"
                  value={addMember?.email}
                  onChange={(e) =>
                    setAddMember({
                      ...addMember,
                      email: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide an email.
                </Form.Control.Feedback>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="franchiseType" className="form-label">
                  Mobile
                </label>
                <input
                  type="tel"
                  required
                  className="form-control form-control-lg"
                  placeholder="Enter phone number"
                  value={addMember?.phone}
                  onChange={(e) => {
                    const enteredValue = e.target.value;
                    // Allow only numeric characters
                    const numericValue = enteredValue.replace(/\D/g, "");

                    // Restrict to a maximum of 10 digits
                    const limitedValue = numericValue.slice(0, 15);

                    setAddMember({
                      ...addMember,
                      phone: limitedValue,
                    });
                  }}
                />

                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="franchiseType" className="form-label">
                Address
              </label>
              <textarea
                required
                className="form-control form-control-lg"
                style={{ height: "100px" }}
                placeholder="Enter a address"
                value={addMember?.address}
                onChange={(e) =>
                  setAddMember({
                    ...addMember,
                    address: e.target.value,
                  })
                }
              />

              <Form.Control.Feedback type="invalid">
                Please provide an address.
              </Form.Control.Feedback>
            </div>
            <div
              className=""
              style={{ border: "1px solid ", height: "1px", color: "#F7AE15" }}
            ></div>
            <div className="mb-4 row mt-3">
              <div className="col-md-6">
                <label htmlFor="franchiseType" className="form-label">
                  Franchise Type
                </label>

                <Select
                  options={packageOptions}
                  value={{
                    value: addMember?.franchise,
                    label: addMember?.franchise,
                  }}
                  onChange={(selectedOption) => {
                    setAddMember({
                      ...addMember,
                      franchise: selectedOption.value,
                      packageAmount: selectedOption.packageAmount,
                    });
                    getStateList();
                  }}
                  placeholder="Select a franchise type" // Set the placeholder here
                  isSearchable={true}
                  required={true}
                />

                <Form.Control.Feedback type="invalid">
                  Please select a franchise type.
                </Form.Control.Feedback>
              </div>
              <div className="col-md-6">
                <label htmlFor="readOnlyInput" className="form-label">
                  Package Amount
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  readOnly
                  value={addMember?.packageAmount || "0"}
                />
              </div>
              {addMember?.franchise === "District Franchise" && (
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    State
                  </label>
                  <Select
                    required
                    options={stateList?.map((states) => ({
                      value: states?.id,
                      label: states?.name,
                    }))}
                    value={selectedState?.state}
                    onChange={(selectedOption) => {
                      console.log(selectedOption, "selectedoptions");

                      setAddMember({
                        ...addMember,
                        state: selectedOption?.label,
                      });
                    }}
                    placeholder="Select a state"
                    isSearchable={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a state name.
                  </Form.Control.Feedback>
                </div>
              )}
            </div>

            {addMember?.franchise === "Zonal Franchise" && (
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    State
                  </label>
                  <Select
                    required
                    options={stateList?.map((states) => ({
                      value: states?.id,
                      label: states?.name,
                    }))}
                    value={selectedState?.state}
                    onChange={(selectedOption) => {
                      console.log(selectedOption, "selectedoptions");
                      setSelectedStateId(selectedOption?.value);

                      setAddMember({
                        ...addMember,
                        state: selectedOption?.label,
                      });
                    }}
                    placeholder="Select a state"
                    isSearchable={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a package Amount.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-6 mb-4">
                  <label htmlFor="stateDropdown2" className="form-label">
                    District
                  </label>
                  <Select
                    required
                    options={districtList?.map((districts) => ({
                      value: districts?.id,
                      label: districts?.name,
                    }))}
                    value={selectedState?.district}
                    onChange={(selectedOption) => {
                      console.log(selectedOption, "selectedoptions");

                      setAddMember({
                        ...addMember,
                        district: selectedOption?.label,
                      });
                    }}
                    placeholder="Select a state"
                    isSearchable={true}
                  />{" "}
                  <Form.Control.Feedback type="invalid">
                    Please provide a district name.
                  </Form.Control.Feedback>
                </div>
              </div>
            )}

            {addMember?.franchise === "Mobile Franchise" && (
              <div className="row">
                <div className="col-md-3 mb-4">
                  <label htmlFor="stateDropdown1" className="form-label">
                    State
                  </label>
                  <Select
                    required
                    options={stateList?.map((states) => ({
                      value: states?.id,
                      label: states?.name,
                    }))}
                    value={selectedState?.state}
                    onChange={(selectedOption) => {
                      console.log(selectedOption, "selectedoptions");
                      setSelectedStateId(selectedOption?.value);

                      setAddMember({
                        ...addMember,
                        state: selectedOption?.label,
                      });
                    }}
                    placeholder="Select a state"
                    isSearchable={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a state Amount.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-3 mb-4">
                  <label htmlFor="stateDropdown2" className="form-label">
                    District
                  </label>
                  <Select
                    required
                    options={districtList?.map((districts) => ({
                      value: districts?.id,
                      label: districts?.name,
                    }))}
                    value={selectedState?.district}
                    onChange={(selectedOption) => {
                      console.log(selectedOption, "selectedoptions");
                      setSelectedDistrictId(selectedOption?.value);

                      setAddMember({
                        ...addMember,
                        district: selectedOption?.label,
                      });
                    }}
                    placeholder="Select a district"
                    isSearchable={true}
                  />{" "}
                  <Form.Control.Feedback type="invalid">
                    Please provide a district Amount.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-3 mb-4">
                  <label htmlFor="stateDropdown3" className="form-label">
                    Zonal
                  </label>
                  <Select
                    required
                    options={zonalList?.map((zonal) => ({
                      value: zonal?.id,
                      label: zonal?.name,
                    }))}
                    value={selectedState?.zonal}
                    onChange={(selectedOption) => {
                      console.log(selectedOption, "selectedoptions");
                      setSelectedZonalId(selectedOption?.value);
                      setAddMember({
                        ...addMember,
                        zonal: selectedOption?.label,
                      });
                    }}
                    placeholder="Select a zonal"
                    isSearchable={true}
                  />{" "}
                  <Form.Control.Feedback type="invalid">
                    Please provide a zonal name.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-3 mb-4">
                  <label htmlFor="stateDropdown4" className="form-label">
                    Panchayath
                  </label>
                  <Select
                    required
                    options={panchayathList?.map((panchayath) => ({
                      value: panchayath?.id,
                      label: panchayath?.name,
                    }))}
                    value={selectedState?.panchayath}
                    onChange={(selectedOption) => {
                      console.log(selectedOption, "selectedoptions");

                      setAddMember({
                        ...addMember,
                        panchayath: selectedOption?.label,
                      });
                    }}
                    placeholder="Select a panchayath"
                    isSearchable={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a panchayath Amount.
                  </Form.Control.Feedback>
                </div>
              </div>
            )}

            <div className="mb-4 row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-9">
                    <label htmlFor="transactionPassword" className="form-label">
                      Transaction Password
                    </label>
                    <label
                      htmlFor="transactionPassword"
                      className="form-label"
                      onClick={handlePasswordTransToggle}
                    >
                      {showTransPassword ? (
                        <i className="fas fa-eye-slash"></i>
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}{" "}
                    </label>
                  </div>
                  {/* <div className="col-3">
            <span className="eye-icon" onClick={handlePasswordToggle}>
                {showPassword ? (
                    <i className="fas fa-eye-slash"></i>
                ) : (
                    <i className="fas fa-eye"></i>
                )}
            </span>
        </div> */}
                </div>

                <div className="input-group">
                  <input
                  required 
                    type={showTransPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    placeholder="Enter your Transition password"
                    value={addMember?.transactionPassword}
                    onChange={(e) =>
                      setAddMember({
                        ...addMember,
                        transactionPassword: e.target.value,
                      })
                    }
                  />
                      <Form.Control.Feedback type="invalid">
                    Please provide a Transaction Password.
                  </Form.Control.Feedback>
                </div>
              </div>

              {/* Add another div for the regular password input */}
              <div className="col-md-6">
                <div className="row">
                  <div className="col-9">
                    <label htmlFor="transactionPassword" className="form-label">
                      Password
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
                  </div>
                  {/* <div className="col-3">
            <span className="eye-icon" onClick={handlePasswordToggle}>
                {showPassword ? (
                    <i className="fas fa-eye-slash"></i>
                ) : (
                    <i className="fas fa-eye"></i>
                )}
            </span>
        </div> */}
                </div>

                <div className="input-group">
                  <input
                  required
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={addMember?.password}
                    onChange={(e) =>
                      setAddMember({
                        ...addMember,
                        password: e.target.value,
                      })
                    }
                  />
                   <Form.Control.Feedback type="invalid">
                    Please provide a Password.
                  </Form.Control.Feedback>
                </div>
              </div>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-custom float-end">
                {/* {addLocation?._id ? 'Update' : 'Save'}  */}Save
              </button>
            </div>
          </Form>
        </ModalComponent>

        {/* -------------deleteConfirmation */}
        <DeleteConfirmation
          show={deleteModal.show}
          onHide={() => setDeleteModal({ show: false, id: null })}
          onDelete={() => handleDelete(deleteModal.id)}
        />
      </SlideMotion>
    </>
  );
}

export default Member;
