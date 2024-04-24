import React, { useContext, useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toastify";
import { SlideMotion } from "../../../libs/FramerMotion";
import ModalComponent from "../../../Components/ModalComponet";
import DeleteConfirmation from "../../../Components/DeleteConfirmation";
import { ContextData } from "../../../Services/Context";
import { Form } from "react-bootstrap";
import { ApiCall } from "../../../Services/Api";
import {
  deletestateUrl,
  editStatepageUrl,
  statePageUrl,
  statelistPageUrl,
} from "../../../utils/Constants";
import Loader from "../../../Components/Loader";

function State() {
  
  const [stateModal, setStateModal] = useState({ show: false, id: null });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [addState, setAddState] = useState({});
  const [stateList, setStateList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //---------add State---------
  const addStateFun = async () => {
    try {
      if (addState.id) {
        const updateResponse = await ApiCall(
          "POST",
          `${editStatepageUrl}/${addState.id}`,
          addState
        );
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
          console.log(error, "error");
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

  //----------delete state----------
  const deleteState = async () => {
    try {
      const response = await ApiCall(
        "post",
        `${deletestateUrl}/${addState.id}`
      );
      if (response?.status === 200) {
        Show_Toast(response?.data?.msg, true);
        setDeleteModal(false);
        getStateList();
      } else {
        Show_Toast("Failed to delete", false);
      }
    } catch (error) {
      console.error("Error deleting:", error);
      Show_Toast("Failed to delete. Please try again.", false);
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
              style={{ color: "#0F1535" }}            >
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
                                  className="dropdown-item d-flex align-items-center gap-3 mt-2"
                                  onClick={() => {
                                    setStateModal({ show: true, id: null });
                                    setAddState(states);
                                  }}
                                >
                                  <i
                                    className="fs-4 fas fa-pencil-alt"
                                    style={{ color: "red",cursor:'pointer' }}
                                  ></i>
                                </a>
                              ) : (
                                <button
                                  className="dropdown-item d-flex align-items-center gap-3 mt-2"
                                  onClick={() =>
                                    Show_Toast(
                                      "State is already taken so not able to edit"
                                    )
                                  }
                                >
                                  <i
                                    className="fs-4 fas fa-pencil-alt"
                                    style={{ color: "grey" ,cursor:'pointer'}}
                                  ></i>
                                </button>
                              )}
                              {states?.isEditable === true ? (
                                <a
                                  className="dropdown-item d-flex align-items-center gap-3 mt-2"
                                  onClick={() => {
                                    setDeleteModal({ show: true, id: null });
                                    setAddState(states);
                                  }}
                                >
                                  <i
                                    className="fs-4 fas fa-trash-alt"
                                    style={{ color: "red",cursor:'pointer' }}
                                  ></i>
                                </a>
                              ) : (
                                <button
                                  className="dropdown-item d-flex align-items-center gap-3 mt-2"
                                  onClick={() =>
                                    Show_Toast(
                                      "State is already taken so not able to delete"
                                    )
                                  }
                                >
                                  <i
                                    className="fs-4 fas fa-trash-alt"
                                    style={{ color: "grey" ,cursor:'pointer'}}
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
        </div>
        {/* add modal */}
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
            Cancel
          </button>
        </ModalComponent>

        {/* delete modal */}

        <ModalComponent
          show={deleteModal.show}
          onHide={() => {
            setDeleteModal({ show: false, id: null });
          }}
          centered
          width={"500px"}
        >
          <div className="modal-body">
            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <i
                  style={{ fontSize: "50px", color: "#fe9423" }}
                  className="fa fa-exclamation-triangle "
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center ">
                <h5 className="">
                  Are you sure you want to reject this State{""} ?
                </h5>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <div className="col gap-3 d-flex justify-content-center">
              <button
                onClick={() => {
                  setDeleteModal({ show: false, id: null });
                }}
                type="button"
                className="btn btn-cancel"
                data-bs-dismiss="modal"
              >
                No, keep it
              </button>
              <button
                type="button"
                className="btn btn-custom text-white"
                onClick={() => {
                  deleteState();
                }}
              >
                <i
                  className="fs-4 fas fa-trash-alt me-2"
                  style={{ color: "white" }}
                />{" "}
                Yes, Delete it
              </button>
            </div>
          </div>
        </ModalComponent>
      </SlideMotion>
    </>
  );
}

export default State;
