import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../../Services/Context";
import { SlideMotion } from "../../../libs/FramerMotion";
import ModalComponent from "../../../Components/ModalComponet";
import DeleteConfirmation from "../../../Components/DeleteConfirmation";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { districtPageUrl } from "../../../utils/Constants";

function District() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const { Check_Validation } = useContext(ContextData);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [addDistrict, setAddDistrict] = useState({});
  const [districtModal, setDistrictModal] = useState({ show: false, id: null });


  //addDistrict
  const addDisrtictFun = async () => {
    console.log("here");
    try {
      if (addDistrict._id) {
        const updateResponse = await ApiCall(
          "put",
          `${districtPageUrl}/${addDistrict._id}`,
          addDistrict
        );
        if (updateResponse.status === 200) {
          setDistrictModal(false);
          setValidated(false);
          setAddDistrict('')
          Show_Toast("District updated successfully", true);
        } else {
          Show_Toast("District update failed", false);
        }
      } else {
        const createResponse = await ApiCall("post", districtPageUrl, addDistrict);
        if (createResponse.status === 200) {
          districtModal(false);
          setValidated(false);
          setAddDistrict('')

          Show_Toast("District added successfully", true);
        } else {
          Show_Toast("District creation failed", false);
        }
      }
    } catch (error) {
      Show_Toast(error, false);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <SlideMotion>
        <div className="card w-50 position-relative overflow-hidden">
          {" "}
          <h5 className="card-title fw-semibold mb-0 lh-sm px-4 mt-3">
            District
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
                <thead className="text-dark fs-4 table-light">
                  <tr>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Name</h6>
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
                      <td></td>

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
            onSubmit={(e) => Check_Validation(e,addDisrtictFun, setValidated)}
          >
            <div className="mb-4">
            <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            State
                          </label>
              <Select
                required
                placeholder="Select a state"
                // value={stateOptions.find((option) => option.value === addDistrict.stateName)}
                // options={stateOptions}
                // onChange={handleStateChange}
              />
              <Form.Control.Feedback type="invalid">
                Please select a state.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
            <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            District Amount
                          </label>
              <input
                required
                className="form-control form-control-lg "
                rows="4"
                placeholder="Enter a district name"
                value={addDistrict?.DistName}
                onChange={(e) =>
                  setAddDistrict({ ...addDistrict, DistName: e.target.value })
                }
              ></input>
              <Form.Control.Feedback type="invalid">
                Please provide a state Name.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
            <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Package Amount
                          </label>
              <input
                required
                className="form-control form-control-lg "
                rows="4"
                placeholder="Enter a district name"
                value={addDistrict?.packageAmount}
                onChange={(e) =>
                  setAddDistrict({ ...addDistrict, packageAmount: e.target.value })
                }
              ></input>
              <Form.Control.Feedback type="invalid">
                Please provide a package Amount.
              </Form.Control.Feedback>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-custom float-end ms-1">
                {addDistrict?._id ? 'Update' : 'Save'} 
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

export default District;
