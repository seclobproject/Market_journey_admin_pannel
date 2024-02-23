import React, { useContext, useEffect, useState } from "react";
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
import { Show_Toast } from "../../../utils/Toast";

function District() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const { Check_Validation } = useContext(ContextData);
  const [addDistrict, setAddDistrict] = useState({});
  console.log(addDistrict, "addDistrict");

  const [districtModal, setDistrictModal] = useState({ show: false, id: null });
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  console.log(districtList, "districtList");

  console.log(stateList, "list");

  const [selectedState, setSelectedState] = useState(null);

  console.log(selectedState, "selectedState");

  //-----------list state--------
  const getDistrict = async () => {
    try {
      const response = await ApiCall("get", districtlistPageUrl);

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
  //-----------addDistrict---------
  const addDisrtictFun = async () => {
    console.log("here");

    try {
      const response = await ApiCall("post", districtPageUrl, addDistrict);

      if (response.status === 200) {
        setDistrictModal(false);
        setValidated(false);
        setAddDistrict("");
        getDistrict();
        Show_Toast("District operation successful", true);
      } else {
        Show_Toast("District operation failed", false);
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
          <h5 className="card-title fw-semibold mb-0 lh-sm px-4 mt-3">
            District
          </h5>
          <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <form className="position-relative">
                <input
                  type="text"
                  className="form-control search-chat py-2 ps-5"
                  id="text-srh"
                  placeholder="Search"
                  // onChange={(e) => setParams({ ...params, query: e.target.value })}
                  // value={params?.query}
                />
                <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
              </form>
            </div>

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
                      <h6 className="fs-4 fw-semibold mb-0">District Name</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">State Name</h6>
                    </th>
                    {/* <th>
                      <h6 className="fs-4 fw-semibold mb-0">Package</h6>
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
                            {(districts?.name &&
                              districts.name.toUpperCase()) ||
                              "--"}
                          </td>
                          <td>
                            {(districts?.stateName &&
                              districts.stateName.toUpperCase()) ||
                              "--"}
                          </td>
                          {/* <td>
                            {(districts?.packageAmount &&
                              districts.packageAmount) ||
                              "--"}
                          </td> */}
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
          title={<h5>Add District</h5>}
          centered
          width={"500px"}
        >
          <Form
            Validate
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
                  value: state?._id,
                  label: state?.name,
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
                value={addDistrict?.districtName}
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
                {addDistrict?._id ? "Update" : "Save"}
              </button>
            </div>
          </Form>
        </ModalComponent>
      </SlideMotion>
    </>
  );
}

export default District;
