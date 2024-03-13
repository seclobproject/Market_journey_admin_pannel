import React, { useContext, useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toastify";
import { SlideMotion } from "../../../libs/FramerMotion";
import ModalComponent from "../../../Components/ModalComponet";
import DeleteConfirmation from "../../../Components/DeleteConfirmation";
import { ContextData } from "../../../Services/Context";
import { Form } from "react-bootstrap";
import { ApiCall } from "../../../Services/Api";
import {
  editStatepageUrl,
  statePageUrl,
  statelistPageUrl,
} from "../../../utils/Constants";
import Loader from "../../../Components/Loader";
import { startSession } from "mongoose";
import { Show_Toast } from "../../../utils/Toast";

function State() {
  const [stateModal, setStateModal] = useState({ show: false, id: null });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [addState, setAddState] = useState({});
  console.log(addState, "addState...........");
  const [stateList, setStateList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(stateList, "stateList...........");

  //---------add State---------
  const addStateFun = async () => {
    try {
      if (addState.id) {
        const updateResponse = await ApiCall(
          "POST",
          `${editStatepageUrl}/${addState.id}`,
          addState
        );
        console.log(updateResponse, "updated state");
        if (updateResponse.status === 200) {
          setStateModal(false);
          setValidated(false);
          getStateList();
          Show_Toast("State updated successfully", true);
        } else {
          Show_Toast("State Update Failed", false);
        }
      } else {
        const createResponse = await ApiCall("POST", statePageUrl, addState);
        if (createResponse.status === 200) {
          setStateModal(false);
          setValidated(false);
          setAddState("");
          getStateList();

          Show_Toast("State added successfully", true);
        } else {
          Show_Toast(error, false);
        }
      }
    } catch (error) {
      Show_Toast(error, false);
    }
  };

  //-----------list state--------
  const getStateList = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", statelistPageUrl);

      if (response.status === 200) {
        setStateList(response?.data?.states);
        setIsLoading(false);
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

  useEffect(() => {
    getStateList();
  }, []);

  return (
    <>
      <SlideMotion>
        <div className="card position-relative overflow-hidden">
          <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
            <h5
              className="card-title fw-semibold mb-0 lh-sm px-0 mt-3"
              style={{ color: "#F7AE15" }}
            >
              States
            </h5>

            <div>
              <button
                className="btn btn-custom ms-3 float-end"
                onClick={() => {
                  setStateModal({ show: true, id: null });
                  setValidated(false);
                  setAddState("");
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
                  <thead className="text-dark fs-4 table-light">
                    <tr>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">SL.NO</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">State Name</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Actions</h6>
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {stateList?.length ? (
                      <>
                        {stateList.map((states, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {states?.stateName &&
                                states.stateName.toUpperCase()}
                            </td>
                            <td>
                              {states?.isEditable === true ? (
                                <a
                                  className="dropdown-item d-flex align-items-center gap-3"
                                  onClick={() => {
                                    setStateModal({ show: true, id: null });
                                    setAddState(states);
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
                                      "State in already taken so not able to edit"
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
                          <b>No State Found</b>{" "}
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
          show={stateModal.show}
          onHide={() => {
            setStateModal({ show: false, id: null });
          }}
          title={<h5 style={{ color: "#F7AE15", margin: 0 }}>Add State</h5>}
          centered
          width={"500px"}
        >
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => Check_Validation(e, addStateFun, setValidated)}
          >
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                State
              </label>{" "}
              <input
                required
                className="form-control form-control-lg "
                rows="4"
                placeholder="Enter a state name"
                value={addState?.stateName}
                onChange={(e) =>
                  setAddState({ ...addState, stateName: e.target.value })
                }
              ></input>
              <Form.Control.Feedback type="invalid">
                Please provide a state Name.
              </Form.Control.Feedback>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-custom float-end ms-1">
                {addState?.id ? "Update" : "Save"}
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
      </SlideMotion>
    </>
  );
}

export default State;
