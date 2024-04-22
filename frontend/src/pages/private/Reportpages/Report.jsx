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

function Report() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [selectedZonalId, setselectedZonalId] = useState(null);
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
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  console.log(filterReport, "filterReport");

  console.log(selectedStateId, "selectedStateId");
  console.log(selectedDistrictId, " dist id");

  console.log(stateList, "stateList");
  console.log(zonalList, "zonalList");
  console.log(panchayathList, "zonalList");

  console.log(districtList, "districtList");

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
    console.log("working");
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
      const response = await ApiCall("get", reportuserUrl, filterReport
    
      );
      console.log(response);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
    }
  };
  
useEffect(()=>{
getFilterData();
},[filterReport,params]);

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
                style={{ color: "#F7AE15" }}
              >
                Reports
              </h5>
            </div>
            <div className="row ms-2 me-2">
              <div className="col-md-2 mt-3 sm-2">
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
                      getAllDistrictList();
                    }
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
                      if (selectedDistrictId) {
                        getAllZonallist();
                      }
                      setFilterReport({
                        ...filterReport,
                        district: selectedOption?.label,
                        state: "",
                      });
                    }}
                    // options={options}
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
                      setselectedZonalId(selectedOption?.value);
                      if (selectedZonalId) {
                        getPanchayathList();
                      }
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
                <Button className="btn btn-custom">Reset</Button>
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
                          <h6 className="fs-4 fw-semibold mb-0">Date</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Name</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Type</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">
                            Franchise Name
                          </h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Report Name</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">
                            Amount Credited{" "}
                          </h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">
                            Percentage Credited
                          </h6>
                        </th>

                        <th />
                      </tr>
                    </thead>
                    {/* <tbody>
                      {getHistory?.length ? (
                        <>
                          {getHistory.map(
                            (history, index) => (
                              (
                                <tr key={index}>
                                  <td>{startIndex + index + 1}</td>
                                  <td>
                                    {history?.createdAt
                                      ? moment(history.createdAt).format(
                                          "DD/MM/YYYY"
                                        )
                                      : "--"}
                                  </td>

                                  <td>
                                    {(history?.name &&
                                      history.name.toUpperCase()) ||
                                      "--"}
                                  </td>
                                  <td>{history?.franchise||"--"}</td>
                                  <td>{history?.franchiseName||"--"}</td>

                                  
                                  <td>{history?.reportName||"--"}</td>
                                  <td>{history?.amountCredited || "00"}</td>
                                  <td>{history?.percentageCredited || "0%"}</td>

                              
                             
                                </tr>
                              )
                            )
                          )}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={20} style={{ textAlign: "center" }}>
                            <b>No History Found</b>{" "}
                          </td>
                        </tr>
                      )}
                    </tbody> */}
                  </table>
                </div>
              </div>
            )}
            <div className="me-2 mb-3 d-flex ms-auto">
              <Stack spacing={2}>
                <Pagination
                  //   count={totalPages}
                  //   page={params.page}
                  //   onChange={handlePageChange}
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
