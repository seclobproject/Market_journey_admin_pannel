import React, { useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import Loader from "../../../Components/Loader";
import { Pagination, Stack } from "@mui/material";
import Select from "react-select";
import { ApiCall } from "../../../Services/Api";
import {
  districtlistinZonalUrl,
  panchayathlistindropdownUrl,
  reportuserUrl,
  statelistPageUrl,
  zonallistindropdownUrl,
} from "../../../utils/Constants";
import { Button } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Report() {
  const navigate =useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [selectedZonalId, setselectedZonalId] = useState(null);
  const [selectedPanId, setselectedPanId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [zonalList, setZonalList] = useState([]);
  const [panchayathList, setPanchayathList] = useState([]);
  const [filterReport, setFilterReport] = useState({
    state: "",
    district: "",
    zonal: "",
    panchayath: "",
  });
  const [reportData, setReportData] = useState({});
  const [stateLabel, setStateLabel] = useState("");
  const [selectKey, setSelectKey] = useState(0); // Add selectKey state


  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(1);

  const [filter, setFilter] = useState();
  const startIndex = (params.page - 1) * params.pageSize;
  const options = [
    { value: "view_all", label: "View all" },

    { value: "District Franchise", label: "District Franchise" },
    { value: "Zonal Franchise", label: "Zonal Franchise" },
    { value: "Mobile Franchise", label: "Mobile Franchise" },
    { value: "Algo", label: "Algo Trade" },
    { value: "Morning Cafe", label: "Morning Cafe" },
    { value: "Night Cafe", label: "Night Cafe" },    { value: "Loet 0.1", label: "Loet 0.1" },
    { value: "Loet Pro", label: "Loet Pro" },
    { value: "Loet Promax", label: "Loet Pro Max" },
    { value: "Nifty", label: "Nifty" },
    { value: "Nifty & Bank Nifty", label: "Nifty & Bank Nifty" },
    { value: "Bank Nifty", label: "Bank Nifty" },
    { value: "Bank Nifty & CrudeOil", label: "Bank Nifty & Crude Oil" },
    { value: "Nifty & CrudeOil", label: "Nifty & Crude Oil" },
    { value: "CrudeOil", label: "Crude Oil" },
  ];
  //-----------list state in drop down--------
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

  const getAllDistrictList = async () => {
    try {
      const response = await ApiCall(
        "get",
        `${districtlistinZonalUrl}/${selectedStateId}`
      );
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
    try {
      const response = await ApiCall(
        "get",
        `${panchayathlistindropdownUrl}/${selectedZonalId}`
      );
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

  const getFilterData = async () => {
    try {
      const response = await ApiCall(
        "post",
        reportuserUrl,
        filterReport,
        params
      );
      if (response.status === 200) {
        setReportData(response?.data?.filteredUsers);
        setTotalPages(response?.data?.pagination);
        setFilteredData(response?.data?.filteredUsers)
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
    }
  };
  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };

  useEffect(() => {
    if (filterReport?.state != "" || filterReport?.district != "" || filterReport?.zonal != "" || filterReport?.panchayath != ""){
      getFilterData();

    }
  }, [filterReport, params]);

  useEffect(() => {
    getStateList();
    if (selectedStateId) {
      getAllDistrictList();
    }
    if (selectedDistrictId) {
      getAllZonallist();
    }
    if (selectedZonalId) {
      getPanchayathList();
    }
  }, [selectedStateId, selectedDistrictId, selectedZonalId]);
  
useEffect(()=>{
  getFilterData();
},[params]);

useEffect(()=>{
  if(filter==="view_all")
getFilterData();
},[filter]);


  const handleReset = () => {
    setSelectedStateId("");
    setStateLabel(""); // Ensure stateLabel is set to an empty string or null
    setFilterReport({
      state: "",
      district: "",
      zonal: "",
      panchayath: "",
    });
    // setFilteredData([]);
    setSelectedState("");
    setReportData({});
    setSelectedDistrictId("");
    setselectedPanId("");
    setselectedZonalId("");
    setFilter("");
  
    // Increment selectKey to force re-render
    setSelectKey(selectKey + 1);
    getFilterData();
  };
  const viewAll = () => {
    useEffect(()=>{
      getFilterData();

    },[params]);
  };



  const handleFilterAndSetFilter = (selectedOption) => {
    const filter = selectedOption.value;

    setFilter(filter);
    const newFilteredData = reportData.filter((item) => {
      return filter ? item.franchise === filter : true;
    });
    setFilteredData(newFilteredData);
  };



  return (
    <>
      <SlideMotion>
        <div className="container-fluid"></div>
        <div className="container-fluid">
          <div className="card w-100 position-relative overflow-hidden">
            {" "}
            <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
              <h5
                className="card-title fw-semibold mb-0 lh-sm px-0 mt-4"
                style={{ color: "#0F1535" }}
              >
                Reports
              </h5>
              <div className="col-md-3 mt-3 sm-2">
              <Select
                                key={selectKey}

                onChange={(selectedOption) =>
                  handleFilterAndSetFilter(selectedOption)
                }
                options={options}
                placeholder="Search by type..."
                isSearchable={true}
              />
            </div>
            </div>
            <div className="row ms-2 me-2">
              <div className="col-md-2 mt-3 sm-2">
                <Select
                  required
                  key={selectKey}
                  options={stateList?.map((states) => ({
                    value: states?.id,
                    label: states?.stateName,
                  }))}
                  onChange={(selectedOption) => {
                    setSelectedStateId(selectedOption?.value);
                    if (selectedStateId) {
                      getAllDistrictList();
                    }
                    setselectedZonalId("");
                    setSelectedDistrictId("");
                    setFilterReport({
                      ...filterReport,
                      state: selectedOption?.label,
                      district: "",
                      zonal: "",
                      panchayath: "",
                    });
                  }}
                  placeholder="Select a state"
                  isSearchable={true}
                />
              </div>
              {selectedStateId && (
                <div className="col-md-2 mt-3 sm-2">
                  <Select
                    required
                    options={districtList?.map((district) => ({
                      value: district?.id,
                      label: district?.name,
                    }))}
                    onChange={(selectedOption) => {
                      setSelectedDistrictId(selectedOption?.value);

                      if (selectedOption?.value) {
                        getAllZonallist();

                        setFilterReport({
                          ...filterReport,
                          district: selectedOption?.label,
                          state: "", // Reset state if needed
                        });
                      }
                    }}
                    placeholder="Select a district"
                    isSearchable={true}
                  />
                </div>
              )}
              {selectedDistrictId && (
                <div className="col-md-2 mt-3 sm-2">
                  <Select
                    required
                    options={zonalList?.map((zonals) => ({
                      value: zonals?.id,
                      label: zonals?.name,
                    }))}
                    //   value={selel?.state}
                    onChange={(selectedOption) => {
                      setselectedZonalId(selectedOption?.value);
                      if (selectedZonalId) {
                        getPanchayathList();
                      }
                      setFilterReport({
                        ...filterReport,
                        zonal: selectedOption?.label,
                        district: "",
                      });
                    }}
                    placeholder="Select a zonal"
                    isSearchable={true}
                  />
                </div>
              )}
              {selectedZonalId && (
                <div className="col-md-2 mt-3 sm-2">
                  <Select
                    required
                    options={panchayathList?.map((panchayath) => ({
                      value: panchayath?.id,
                      label: panchayath?.name,
                    }))}
                    // options={options}
                    onChange={(selectedOption) => {
                      setselectedPanId(selectedOption?.value);

                      setFilterReport({
                        ...filterReport,
                        panchayath: selectedOption?.label,
                        zonal: "",
                      });
                    }}
                    placeholder="Select a panchayath"
                    isSearchable={true}
                  />
                </div>
              )}

              <div className="col-md-2 mt-3 sm-2">
                <Button className="btn btn-custom" onClick={handleReset}>Reset</Button>

              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="card-body p-2 mb-2">
                <div className="table-container table-responsive rounded-2 mb-4">
                  <table className="table border text-nowrap customize-table mb-0 align-middle">
                    <thead className="text-dark fs-4 table-light">
                      <tr>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">SL.NO</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Date & Time</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">User ID</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Name</h6>
                        </th>

                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">
                            Sponsor Name
                          </h6>
                        </th>

                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">
                            Package Amount
                          </h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Type</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">
                          View Details
                          </h6>
                        </th>

                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData?.length ? (
                        <>
                          {filteredData.map((data, index) => (
                            <tr key={index}>
                              <td>{startIndex + index + 1}</td>
                              <td>
                                {data?.createdAt
                                  ? moment(data.createdAt).format("DD/MM/YYYY, HH:mm A")
                                  : "--"}
                              </td>
                              <td>{data?.ownSponserId || "--"}</td>

                              <td>
                                {(data?.name && data.name.toUpperCase()) ||
                                  "--"}
                              </td>
                              <td>
                                {(data?.sponserName &&
                                  data.sponserName.toUpperCase()) ||
                                  "--"}
                              </td>

                              <td>{data?.packageAmount}</td>
                              <td>{data?.franchise || "--"}</td>
                              <td>
                              <i
                                className="fas fa-eye"
                                onClick={() =>
                                  navigate("/user/details", {
                                    state: { data: data?._id },
                                  })
                                }
                              ></i>
                            </td>                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={20} style={{ textAlign: "center" }}>
                            <b>No Report Found</b>{" "}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="me-2 mb-3 d-flex ms-auto">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages?.totalPages}
                  page={params.page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Stack>
            </div>
          </div>
        </div>
      </SlideMotion>
    </>
  );
}

export default Report;
