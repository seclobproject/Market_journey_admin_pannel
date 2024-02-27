import React, { useContext, useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import { ContextData } from "../../../Services/Context";
import ModalComponent from "../../../Components/ModalComponet";
import { Form } from "react-bootstrap";
import {
  districtlistinZonalUrl,
  panchayathPageUrl,
  panchayathlistPageUrl,
  statelistPageUrl,
  zonallistindropdownUrl,
} from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";
import Select from "react-select";
import { Show_Toast } from "../../../utils/Toast";
import Loader from "../../../Components/Loader";

function Panchayath() {
  const [PanchayathModal, setPanchayathModal] = useState({
    show: false,
    id: null,
  });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [addPanchayath, setAddPanchayath] = useState({});
  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [districtList, setdistrictList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [zonalList, setZonalList] = useState([]);
  const [districtId, setDistrictId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [panchyathList, setPanchayathList] = useState([]);

 

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
  //-----------list state in drop down--------
  const getDistrictList = async () => {
    try {
      const response = await ApiCall(
        "get",
        `${districtlistinZonalUrl}/${selectedId}`
      );
      if (response.status === 200) {
        setdistrictList(response?.data?.districts);
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
        `${zonallistindropdownUrl}/${districtId}`
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
  //-----------list Zonals --------
  const getPanchayathList = async () => {
    try {
      setIsLoading(true);

      const response = await ApiCall("get", panchayathlistPageUrl);
      if (response.status === 200) {
        setPanchayathList(response?.data?.panchayaths);
        setIsLoading(false);
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
  const addPanchayathFun = async () => {

    try {
      const response = await ApiCall("post", panchayathPageUrl, addPanchayath);
      if (response.status === 200) {
        setPanchayathModal(false);
        setValidated(false);
        setAddPanchayath("");
        getPanchayathList();
        // ();
        Show_Toast("Panchayath added successfully", true);
      } else {
        Show_Toast("Panchayath added failed", false);
      }
    } catch (error) {
      Show_Toast(error, false);
    }
  };

  useEffect(() => {
    getPanchayathList();
    getStateList();
    if (districtId) {
      getZonallist();
    }
  }, [districtId]);
  useEffect(() => {
    if (selectedId) {
      getDistrictList();
    }
  }, [selectedId]);
  return (
    <>
      <SlideMotion>
        <div className="card w-100 position-relative overflow-hidden">
         
          <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
          <h5
            className="card-title fw-semibold mb-0 lh-sm px-0 mt-3"
            style={{ color: "#F7AE15" }}
          >
            Panchayath
          </h5>

            <div>
              <button
                className="btn btn-custom ms-3 float-end"
                onClick={() => {
                  setPanchayathModal({ show: true, id: null });
                  setValidated(false);
                  setAddPanchayath("");
                }}
              >
                Add
              </button>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="card-body p-2">
              <div className="table-container table-responsive rounded-2 mb-4">
                <table className="table border text-nowrap customize-table mb-0 align-middle">
                  <thead className="text-light fs-4 table-light">
                    <tr>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">SL.NO</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Panchayath Name
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Zonal Name</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">District Name</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">State Name</h6>
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {panchyathList?.length ? (
                      <>
                        {panchyathList.map(
                          (panchayaths, index) => (
                            (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {(panchayaths?.name &&
                                    panchayaths.name.toUpperCase()) ||
                                    "--"}
                                </td>
                                <td>
                                  {(panchayaths?.zonalName &&
                                    panchayaths.zonalName.toUpperCase()) ||
                                    "--"}
                                </td>

                                <td>
                                  {(panchayaths?.districtName &&
                                    panchayaths.districtName.toUpperCase()) ||
                                    "--"}
                                </td>
                                <td>
                                  {(panchayaths?.stateName &&
                                    panchayaths.stateName.toUpperCase()) ||
                                    "--"}
                                </td>
                              </tr>
                            )
                          )
                        )}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={20} style={{ textAlign: "center" }}>
                          <b>No Panchayath Found</b>{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
          show={PanchayathModal.show}
          onHide={() => {
            setPanchayathModal({ show: false, id: null });
          }}
          title={
            <h5 style={{ color: "#F7AE15", margin: 0 }}>Add Panchayaat</h5>
          }
          centered
          width={"500px"}
        >
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) =>
              Check_Validation(e, addPanchayathFun, setValidated)
            }
          >
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                State
              </label>

              <Select
                required
                options={stateList?.map((state) => ({
                  value: state?.id,
                  label: state?.name,
                }))}
                value={selectedState?.stateName}
                onChange={(selectedOption) => {
                  setSelectedId(selectedOption?.value);
                  setAddPanchayath({
                    ...addPanchayath,
                    stateName: selectedOption?.label,
                  });
                }}
                placeholder="Select a state"
                isSearchable={true}
              />

              <Form.Control.Feedback type="invalid">
                Please select a state.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                District
              </label>
              <Select
                required
                options={districtList?.map((districts) => ({
                  value: districts?.id,
                  label: districts?.name,
                }))}
                value={selectedState?.stateName}
                onChange={(selectedOption) => {
                  setDistrictId(selectedOption?.value);

                  setAddPanchayath({
                    ...addPanchayath,
                    districtName: selectedOption?.label,
                  });
                }}
                placeholder="Select a state"
                isSearchable={true}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a package Amount.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Zonal
              </label>
              <Select
                required
                options={zonalList?.map((zonal) => ({
                  value: zonal?.id,
                  label: zonal?.name,
                }))}
                value={selectedState?.zonalName}
                onChange={(selectedOption) => {

                  setAddPanchayath({
                    ...addPanchayath,
                    zonalName: selectedOption?.label,
                  });
                }}
                placeholder="Select a state"
                isSearchable={true}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a zonal
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Panchayath
              </label>
              <input
                required
                className="form-control form-control-lg "
                rows="4"
                type="text"
                placeholder="Enter panchayath name"
                value={addPanchayath?.panchayathName}
                onChange={(e) =>
                  setAddPanchayath({
                    ...addPanchayath,
                    panchayathName: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                Please provide a panchayath name.
              </Form.Control.Feedback>
            </div>
           

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-custom float-end ms-1">
                Save
              </button>
            </div>
          </Form>
          <button
            className="btn btn-cancel float-end me-1"
            onClick={() => {
              setPanchayathModal({ show: false, id: null });
            }}
          >
            cancel
          </button>
        </ModalComponent>
      </SlideMotion>
    </>
  );
}

export default Panchayath;
