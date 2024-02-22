import React, { useContext, useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import ModalComponent from "../../../Components/ModalComponet";
import DeleteConfirmation from "../../../Components/DeleteConfirmation";
import { ContextData } from "../../../Services/Context";
import { Form } from "react-bootstrap";
import { ApiCall } from "../../../Services/Api";
import { statePageUrl, statelistPageUrl,  } from "../../../utils/Constants";
import { Show_Toast } from "../../../utils/Toast";

function State() {
  const [stateModal, setStateModal] = useState({ show: false, id: null });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [addState, setAddState] = useState({});
  const [stateList,setStateList]=useState([])
  console.log(stateList,"array")

  //---------add State---------
  const addStateFun = async () => {
    console.log("here");
    try {
      if (addState._id) {
        const updateResponse = await ApiCall(
          "put",
          `${statePageUrl}/${addState._id}`,
          addState
        );
        if (updateResponse.status === 200) {
          setStateModal(false);
          setValidated(false);
          getStateList()

          Show_Toast("State updated successfully", true);
        } else {
          Show_Toast("State Update Failed", false);
        }
      } else {
        const createResponse = await ApiCall("post", statePageUrl, addState);
        if (createResponse.status === 200) {
          setStateModal(false);
          setValidated(false);
          setAddState('')
          getStateList()

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
      const response = await ApiCall("get", statelistPageUrl);
  
      if (response.status === 200) {
        setStateList(response?.data?.states);
      } else {
        console.error("Error fetching state list. Unexpected status:", response.status);
      }
  
    } catch (error) {
      console.error("Error fetching state list:", error);
  
    }
  };
  
  

  useEffect(()=>{
    getStateList();
  },[])

  return (
    <>
      <SlideMotion>
        <div className="card w-50 position-relative overflow-hidden">
          {" "}
          <h5 className="card-title fw-semibold mb-0 lh-sm px-4 mt-3">
            States
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
                onClick={() => {
                  setStateModal({ show: true, id: null });
                  setValidated(false);
                  setAddState('')
                }}
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
                      <h6 className="fs-4 fw-semibold mb-0"> State Name</h6>
                    </th>

                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Action</h6>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {stateList?.length ? (
                    <>
                      {stateList.map((states, index) => (
                        console.log(states,"state"),
                        <tr>
                          <td>{states}</td>
                      
                      
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
                                    // onClick={() => handleEdit(staff)}
                                  >
                                    <i className="fs-4 ti ti-edit" />
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item d-flex align-items-center gap-3"
                                    href="#"
                                    // onClick={() =>
                                    //   setDeleteModal({
                                    //     show: true,
                                    //     id: staff?._id,
                                    //   })
                                    // }
                                  >
                                    <i className="fs-4 ti ti-trash" />
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                    <td colSpan={20} style={{ textAlign: "center" }}>
                      <b> No State Found </b>{" "}
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
          show={stateModal.show}
          onHide={() => {
            setStateModal({ show: false, id: null });
          }}
          title={<h5>Add State</h5>}
          centered
          width={"500px"}
        >
          <Form
            Validate
            validated={validated}
            onSubmit={(e) => Check_Validation(e, addStateFun, setValidated)}
          >
            <div className="mb-4">
            <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            State
                          </label>              <input
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
                {addState?._id ? 'Update' : 'Save'}
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

export default State;
