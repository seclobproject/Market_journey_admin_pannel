import React, { useContext, useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toastify";
import { SlideMotion } from "../../../libs/FramerMotion";
import ModalComponent from "../../../Components/ModalComponet";
import { ContextData } from "../../../Services/Context";
import { Form } from "react-bootstrap";
import DeleteConfirmation from "../../../Components/DeleteConfirmation";
import Select from "react-select";
import {
  districtlistinZonalUrl,
  districtnotTakenUrl,
  memberaddUrl,
  nottakenZonalUrl,
  packagesListUrl,
  panchayathlistindropdownUrl,
  statelistPageUrl,
  viewalluserUrl,
  zonallistindropdownUrl,
} from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader";
import moment from "moment";

function Member() {
  const [memberModal, setMemberModal] = useState({ show: false, id: null });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [bonusModal, setBonusModal] = useState({ show: false, id: null });
  const [addMember, setAddMember] = useState({});
  console.log(addMember,"memberAdded");
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [zonalList, setZonalList] = useState([]);
  const [notTakenZonal, setNotTakenZonal] = useState([]);
  const [panchayathList, setPanchayathList] = useState([]);
  const [addBonnus, setAddBonnus] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [notTakenDistrict, setnotTakenDistrict] = useState([]);
  const [packageAmount, setPackageAmount] = useState({});
  console.log(packageAmount,"packageAmoun..t");
 
  const [totalgstAmount, setTotalGstAmount] = useState("");
console.log(totalgstAmount," totalgstAmounts sum");
  const [showPassword, setShowPassword] = useState(false);
  const [showTransPassword, setShowTransPassword] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [selectedZonalId, setSelectedZonalId] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataStatus, setFilteredDataStatus] = useState([]);
  const [filter, setFilter] = useState();
  const [statusfilter, setStatusFilter] = useState();

  const navigate = useNavigate();
  const startIndex = (params.page - 1) * params.pageSize;
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
  //----------- not taken district in drop down--------
  const getDistrictList = async () => {
    console.log("here");
    try {
      const response = await ApiCall(
        "get",
        `${districtnotTakenUrl}/${selectedStateId}`
      );
      console.log(response, "not taken");
      if (response.status === 200) {
        setnotTakenDistrict(response?.data?.districts);
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
  //-----------  all district in drop down--------

  const getAllDistrictList = async () => {
    try {
      const response = await ApiCall(
        "get",
        `${districtlistinZonalUrl}/${selectedStateId}`
      );
      console.log(response, "ddistrict get");
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
  //-----------not taken Zonal in drop down--------
  const getZonallist = async () => {
    console.log("reached hereee ver bad");
    try {
      const response = await ApiCall(
        "get",
        `${nottakenZonalUrl}/${selectedDistrictId}`
      );
      console.log(response, "reached hereee ver bad");

      if (response.status === 200) {
        setNotTakenZonal(response?.data?.zonals);
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
  const getAllZonallist = async () => {
    try {
      const response = await ApiCall(
        "get",
        `${zonallistindropdownUrl}/${selectedDistrictId}`
      );
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
    console.log("reaction");
    try {
      const response = await ApiCall(
        "get",
        `${panchayathlistindropdownUrl}/${selectedZonalId}`
      );
      console.log(response, "res res res from api");
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
    try {
      const response = await ApiCall("post", memberaddUrl, addMember);
      if (response.status === 200) {
        setMemberModal(false);
        setValidated(false);
        setAddMember("");
        getallUsers();
        setSelectedStateId("");
        selectedDistrictId("");
        selectedZonalId("");
        // ();
        Show_Toast("Member added successfully", true);
      }
    } catch (error) {
      Show_Toast(error, false);
    }
  };

  //-----------get all users
  const getallUsers = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", viewalluserUrl, {}, params);
      if (response.status === 200) {
        console.log("all userssss......", response);
        setAllUser(response?.data?.userData?.results);
        setFilteredData(response?.data?.userData?.results);
        setTotalPages(response?.data?.userData?.totalPages);
        setIsLoading(false);
      } else {
        console.error(
          "Error fetching user data. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordTransToggle = () => {
    setShowTransPassword(!showTransPassword);
  };
  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };
  useEffect(() => {
    getallUsers();
    getPackagesList();
   
    // if (packageAmount?.packageAmount) {
    //   const partAmount = Number(packageAmount.packageAmount) ; 
    //   console.log(`partAmount: ${typeof(partAmount)}%`);
      
    //   const percentage = partAmount * 0.18;
    //   console.log(`percentage: ${typeof (percentage)}%`);
  
  
    //   const sum = partAmount + percentage;
    //   console.log(`Sum: ${sum}`);

    //   setTotalGstAmount(sum)
    // }
  }, [params]);

  // useEffect(() => {
  //   if (selectedDistrictId) {
  //     getZonallist();
  //   }

  //   if (selectedZonalId) {
  //     getPanchayathList();
  //   }
  // }, [selectedDistrictId, selectedZonalId]);



  useEffect(() => {
    if (filter === "View_all") {
      getallUsers();
    }
  }, [filter]);

  useEffect(() => {
    if (selectedStateId) {
      if (addMember?.franchise === "District Franchise") {
        getDistrictList();
      } else {
        getAllDistrictList();
      }
    }
    if (selectedDistrictId) {
      if (addMember?.franchise === "Zonal Franchise") {
        getZonallist();
      } else {
        getAllZonallist();
      }
    }

    if (selectedZonalId) {
      getPanchayathList();
    }
  }, [selectedStateId, selectedDistrictId, selectedZonalId]);

  const handleFilterAndSetFilter = (e) => {
    const filter = e.target.value;

    setFilter(filter);
    const newFilteredData = allUser.filter((item) => {
      return filter ? item.franchise === filter : true;
    });
    setFilteredData(newFilteredData);
  };

  const handleFilterAndSetFilterStatus = (e) => {
    const filterStatus = e.target.value;

    setFilter(filterStatus);
    console.log(filterStatus,"==")
    const newFilteredData = allUser.filter((item) => {
      console.log(item, "iteamssssss///");
      return filterStatus ? item.userStatus === filterStatus : true;
    });
    console.log(newFilteredData, "fgdffdfd");
    setFilteredData(newFilteredData);
  };

  const packageOptions = packageList.map((pack) => ({
    value: pack?.packageName,
    label: pack?.packageName || pack?.franchiseName,
    packageAmount: pack?.packageAmount,
  }));

  const calculateTotalGstAmount = () => {
    if (addMember?.packageAmount) {
      console.log('working..........');

      const partAmount = Number(addMember?.packageAmount);
      console.log(`partAmount: ${typeof(partAmount)}`);
  
      const percentage = partAmount * 0.18;
      console.log(`percentage: ${typeof(percentage)}`);
  
      const sum = partAmount + percentage;
      console.log(`Sum: ${sum}`);
      setTotalGstAmount(sum)
  
    }
  };
console.log(packageOptions?.packageAmount,"packageOptions")

useEffect(()=>{
  calculateTotalGstAmount()
},[addMember?.packageAmount]);
  return (
    <>
      <SlideMotion>
        <div className="card w-100 position-relative overflow-hidden">
          {" "}
          <div className="px-4 py-3 border-bottom d-flex  align-items-center justify-content-between">
            <h5
              className="card-title fw-semibold mb-0 lh-sm px-0 mt-3"
              style={{ color: "#F7AE15" }}
            >
              Members
            </h5>

            <div>
              <button
                className="btn btn-custom  ms-3 float-end"
                onClick={() => {
                  setMemberModal({ show: true, id: null });
                  setAddMember("");
                  setTotalGstAmount("");
                  setValidated(false);
                }}
              >
                Add
              </button>
            </div>
          </div>
          <div className="row ms-2 me-2">
            <div className="col-md-3 mt-3 sm-2">
              <select
                value={filter}
                onChange={(e) => handleFilterAndSetFilter(e)}
                className="form-control"
              >
                <option selected disabled>
                  Search by franchise type...
                </option>

                <option value="View_all">View All</option>
                <option value="District Franchise">District Franchise</option>
                <option value="Zonal Franchise">Zonal Franchise</option>
                <option value="Mobile Franchise">Mobile Franchise</option>
                {/* Add more filter options as needed */}
              </select>
            </div>
            <div className="col-md-3 mt-3">
              <select
                value={statusfilter}
                onChange={(e) => handleFilterAndSetFilterStatus(e)}
                className="form-control"
              >
                <option selected disabled>
                  Search by status...
                </option>

                <option value="View_all">View All</option>
                <option value="readyToApprove">Ready to Approve</option>
                <option value="pending">pending</option>
                <option value="approved">Approved</option>
                {/* Add more filter options as needed */}
              </select>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="card-body p-2">
              <div className="table-container table-responsive rounded-2 mb-4">
                <table className="table border text-nowrap customize-table mb-0 align-middle">
                  <thead className="text-dark fs-4 table-light">
                    <tr>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">SL.NO</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Date</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">User ID</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Name</h6>
                      </th>

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Sponsor Name</h6>
                      </th>
                   
                    
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Package Amount
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Franchise Type
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Franchise Name
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Status</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">View Details</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Add bonus</h6>
                      </th>
                     
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">View Tree</h6>
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData?.length ? (
                      <>
                        {filteredData.map((users, index) => (
                          console.log(users),
                          <tr key={index}>
                            <td>{startIndex + index + 1}</td>
                            <td>
                              {users?.createdAt
                                ? moment(users.createdAt).format("DD/MM/YYYY")
                                : "--"}
                            </td>
                            <td>{users?.ownSponserId || "--"}</td>

                            <td>
                              {(users?.name && users.name.toUpperCase()) ||
                                "--"}
                            </td>
                            <td>
                              {(users?.sponserName &&
                                users.sponserName.toUpperCase()) ||
                                "--"}
                            </td>

                            {/* <td>{users?.phone || "--"}</td> */} 
                           
                            <td>{users?.packageAmount}</td>
                            <td>{users?.franchise || "--"}</td>
                            <td>{users?.franchiseName || "--"}</td>
                            <td>
                              {users?.userStatus === "readyToApprove" ? (
                                <span className="badge bg-danger rounded-3 fw-semibold">
                                  Ready to Approve
                                </span>
                              ) : users?.userStatus === "pending" ? (
                                <span className="badge bg-warning rounded-3 fw-semibold">
                                  Pending
                                </span>
                              ) : (
                                <span className="badge bg-success rounded-3 fw-semibold">
                                  Approved
                                </span>
                              )}
                            </td>
                            <td>
                              <i
                                className="fas fa-eye"
                                onClick={() =>
                                  navigate("/user/details", {
                                    state: { data: users?._id },
                                  })
                                }
                              ></i>
                            </td>
                            <td>
                              {" "}
                              <button
                                className="btn btn-custom"
                                onClick={() => {
                                  setBonusModal({ show: true, id: null });
                                  // setAddMember("");
                                  setValidated(false);
                                }}
                              >
                                <i className="fas fa-plus"></i> Add Bonus
                              </button>
                            </td>
                          
                            <td>
                              <button className="btn btn-custom "
                              onClick={() =>
                                navigate("/user/downline", {
                                  state: { data: users?._id },
                                })
                              }
                              >
                                <i className="fas fa-sitemap"></i> View Tree
                              </button>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={20} style={{ textAlign: "center" }}>
                          <b>No Users Found</b>{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* -------------------------pagination--------------------- */}
          <div className="me-2 mb-3 d-flex ms-auto">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={params.page}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
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
                    const numericValue = enteredValue.replace(/\D/g, "");
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
            <div className="row">
              <div className="col-md-6">
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
              <div className="col-md-6">
                <div className="row">
                <div className="col-9">
                    <label htmlFor="transactionPassword" className="form-label">
                      Date Of Birth
                    </label>
                    <label
                      htmlFor="transactionPassword"
                      className="form-label"
                    >
                    
                    </label>
                  </div>
                <div className="input-group mb-2">
                  <input
                    required
                 type="date"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={addMember?.dateOfBirth}
                    onChange={(e) =>
                      setAddMember({
                        ...addMember,
                        dateOfBirth: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a Date.
                  </Form.Control.Feedback>
                </div>
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
              <div className="col-md-6">
                <div className="row">
             
             
                </div>

               
              </div>
           
            </div>

            <div className="mb-4 row"></div>
            <div
              className=""
              style={{ border: "1px solid ", height: "1px", color: "#F7AE15" }}
            ></div>
            <div className="mb-4 row mt-2">
              <div className="col-md-4">
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
              <div className="col-md-4">
                <label htmlFor="readOnlyInput" className="form-label">
                  Package Amount
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  readOnly
                  value={addMember?.packageAmount}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="readOnlyInput" className="form-label">
                  Package Amount Included GST
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  readOnly
                  value={totalgstAmount}
                />
<span style={{ color: 'red' }}>Included 18% of GST</span>
              </div>

              {addMember?.franchise === "District Franchise" && (
                <div className="row mt-4">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      State
                    </label>
                    <Select
                      required
                      options={stateList?.map((states) => ({
                        value: states?.id,
                        label: states?.stateName,
                      }))}
                      value={selectedState?.state}
                      onChange={(selectedOption) => {
                        setSelectedStateId(selectedOption?.value);
                        if (selectedStateId) {
                          getDistrictList();
                        }
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
                      District Franchise Name
                    </label>
                    <Select
                      required
                      options={notTakenDistrict?.map((districts) => ({
                        value: districts?.id,
                        label: districts?.name,
                      }))}
                      value={selectedState?.franchiseName}
                      onChange={(selectedOption) => {
                        setAddMember({
                          ...addMember,
                          franchiseName: selectedOption?.label,
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
            </div>

            {addMember?.franchise === "Zonal Franchise" && (
              <div className="row">
                <div className="col-md-4 mb-4">
                  <label htmlFor="stateDropdown1" className="form-label">
                    State
                  </label>
                  <Select
                    required
                    options={stateList?.map((states) => ({
                      value: states?.id,
                      label: states?.stateName,
                    }))}
                    value={selectedState?.state}
                    onChange={(selectedOption) => {
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

                <div className="col-md-4 mb-4">
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

                <div className="col-md-4 mb-4">
                  <label htmlFor="stateDropdown3" className="form-label">
                    Zonal Franchise Name
                  </label>
                  <Select
                    required
                    options={notTakenZonal?.map((zonal) => ({
                      value: zonal?.id,
                      label: zonal?.name,
                    }))}
                    value={selectedState?.franchiseName}
                    onChange={(selectedOption) => {
                      setSelectedZonalId(selectedOption?.value);
                      setAddMember({
                        ...addMember,
                        franchiseName: selectedOption?.label,
                      });
                    }}
                    placeholder="Select a zonal"
                    isSearchable={true}
                  />{" "}
                  <Form.Control.Feedback type="invalid">
                    Please provide a zonal name.
                  </Form.Control.Feedback>
                </div>
              </div>
            )}

            {(addMember?.franchise === "Mobile Franchise" ||
              addMember?.franchise === "Premium calls" ||
              addMember?.franchise === "Diamond course" ||
              addMember?.franchise === "Platinum course" ||
              addMember?.franchise === "Algo course") && (
              <div className="row">
                <div className="col-md-3 mb-4">
                  <label htmlFor="stateDropdown1" className="form-label">
                    State
                  </label>
                  <Select
                    required
                    options={stateList?.map((states) => ({
                      value: states?.id,
                      label: states?.stateName,
                    }))}
                    value={selectedState?.state}
                    onChange={(selectedOption) => {
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

            <div className="col-12 mt-5">
              <button type="submit" className="btn btn-custom float-end">
                {/* {addLocation?._id ? 'Update' : 'Save'}  */}Save
              </button>
            </div>
          </Form>
          <button
            className="btn btn-cancel float-end me-1"
            onClick={() => {
              setMemberModal({ show: false, id: null });
              setSelectedStateId("");
              selectedDistrictId("");
              selectedZonalId("");
            }}
          >
            Cancel
          </button>
        </ModalComponent>

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
            onSubmit={(e) => Check_Validation(e, addMemberFun, setValidated)}
          >
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Amount
              </label>
              <input
                required
                className="form-control form-control-lg"
                type="number"
                pattern="[0-9]*"
                placeholder="Enter an amount"
                value={addBonnus?.amount}
                onChange={(e) =>
                  setAddBonnus({
                    ...addBonnus,
                    amount: e.target.value,
                  })
                }
              />

              <Form.Control.Feedback type="invalid">
                Please provide a amount.
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
              setMemberModal({ show: false, id: null });
              setSelectedStateId("");
              selectedDistrictId("");
              selectedZonalId("");
            }}
          >
            Cancel
          </button>
        </ModalComponent>
      </SlideMotion>
    </>
  );
}

export default Member;
