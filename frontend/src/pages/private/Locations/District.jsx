import React, { useContext, useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toast";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../../Services/Context";
import { SlideMotion } from "../../../libs/FramerMotion";
import ModalComponent from "../../../Components/ModalComponet";
import DeleteConfirmation from "../../../Components/DeleteConfirmation";
import { Form } from "react-bootstrap";
import Select from "react-select";
import {
  districtPageUrl,
  districtlistPageUrl,
  statelistPageUrl,
} from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";
import Loader from "../../../Components/Loader";

function District() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const { Check_Validation } = useContext(ContextData);
  const [addDistrict, setAddDistrict] = useState({});
  console.log('addDistrict',addDistrict)

  const [districtModal, setDistrictModal] = useState({ show: false, id: null });
  const [stateList, setStateList] = useState([]);
  console.log('stateList',stateList)
  const [districtList, setDistrictList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(null);

  console.log('selectedState',selectedState)

  //-----------list state--------
  const getDistrict = async () => {
    try {
      setIsLoading(true)
      const response = await ApiCall("get", districtlistPageUrl);

      if (response.status === 200) {
        setDistrictList(response?.data?.districts);
        setIsLoading(false)

      } else {
        console.error(
          "Error fetching state list. Unexpected status:",
          response.status
        );
        setIsLoading(false);

      }
    } catch (error) {
      console.error("Error fetching state list:", error);
    }
  };
  //-----------addDistrict---------
  const addDisrtictFun = async () => {

    try {
      const response = await ApiCall("post", districtPageUrl, addDistrict);

      if (response.status === 200) {
        setDistrictModal(false);
        setValidated(false);
        setAddDistrict("");
        getDistrict();
        Show_Toast("District added successfully", true);
      } 
    } catch (error) {
      Show_Toast(error, false);
    }
  };

  //-----------list state--------
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

  useEffect(() => {
    getStateList();
    getDistrict();
  }, []);
  return (
    <>
      <SlideMotion>
        <div className="card position-relative overflow-hidden">
       
          <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
          <h5 className="card-title fw-semibold mb-0 lh-sm px-0 mt-3" style={{color: '#F7AE15'}}>
            District
          </h5>
            <div>
              <button
                className="btn btn-custom ms-3 float-end"
                onClick={() => {
                  setDistrictModal({ show: true, id: null });
                  setValidated(false);
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
                <thead
                  className="text-dark fs-4 table-light"
                  style={{ backgroundColor: "yellow" }}
                >
                  <tr>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">SL.NO</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">State Name</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">District Name</h6>
                    </th>
                    {/* <th>
                        <h6 className="fs-4 fw-semibold mb-0">Actions</h6>
                      </th> */}
                   
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {districtList?.length ? (
                    <>
                      {districtList.map((districts, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {(districts?.stateName &&
                              districts.stateName.toUpperCase()) ||
                              "--"}
                          </td>
                          <td>
                            {(districts?.name &&
                              districts.name.toUpperCase()) ||
                              "--"}
                          </td>
                          <td>
                              {districts?.isEditable === true ? (
                                <a
                                  className="dropdown-item d-flex align-items-center gap-3"
                                  onClick={() => {
                                    setDistrictModal({ show: true, id: null });
                                    setAddDistrict(districts);
                                    // setSelectedState(districts?.stateName)
                                  }}
                                >
                                  <i
                                    className="fs-4 fas fa-pencil-alt"
                                    style={{ color: "red" }}
                                  ></i>
                                </a>
                              ) : (
                                <button
                                  className="dropdown-item d-flex align-items-center gap-3"
                                  // disabled
                                  onClick={() =>
                                    Show_Toast(
                                      "District in already taken so not able to edit"
                                    )
                                  }
                                >
                                  <i
                                    className="fs-4 fas fa-pencil-alt"
                                    style={{ color: "grey" }}
                                  ></i>
                                </button>
                              )}
                            </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={20} style={{ textAlign: "center" }}>
                        <b>No District Found</b>{" "}
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
          show={districtModal.show}
          onHide={() => {
            setDistrictModal({ show: false, id: null });
          }}
          title={
            <h5 style={{ color: '#F7AE15', margin: 0}}>
           Add District
            </h5>
          }
          Add Zonal
          centered
          width={"500px"}
        >
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => Check_Validation(e, addDisrtictFun, setValidated)}
          >
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                State
              </label>

              <Select
                required
                options={stateList?.map((state) => ({
                  value: state?.id,
                  label: state?.stateName,
                }))}
                
                
                value={selectedState?.stateName}
                onChange={(selectedOption) =>
                  setAddDistrict({
                    ...addDistrict,

                    stateName: selectedOption?.label,
                  })
                }
                placeholder="Select a state"
                isSearchable={true}
              />

              <Form.Control.Feedback type="invalid">
                Please select a state.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                District Name
              </label>
              <input
                required
                className="form-control form-control-lg "
                rows="4"
                placeholder="Enter a district name"
                value={addDistrict?.name}
                onChange={(e) =>
                  setAddDistrict({
                    ...addDistrict,
                    districtName: e.target.value,
                  })
                }
              ></input>
              <Form.Control.Feedback type="invalid">
                Please provide a state Name.
              </Form.Control.Feedback>
            </div>
            {/* <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Package Amount
              </label>
              <input
                required
                className="form-control form-control-lg "
                rows="4"
                type="number"
                placeholder="Enter a district name"
                value={addDistrict?.packageAmount}
                onChange={(e) =>
                  setAddDistrict({
                    ...addDistrict,
                    packageAmount: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                Please provide a package Amount.
              </Form.Control.Feedback>
            </div> */}

            <div className="col-12 mt-4">
            <button type="submit" className="btn btn-custom float-end ms-1">
                {addDistrict?.id ? "Update" : "Save"}
              </button>
            </div>
          </Form>
          <button
            className="btn btn-cancel float-end me-1"
            onClick={() => {
              setDistrictModal({ show: false, id: null });
            }}
          >
            cancel
          </button>
        </ModalComponent>
      </SlideMotion>
    </>
  );
}

export default District;
