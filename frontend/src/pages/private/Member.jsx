import React, { useContext, useState } from "react";
import { SlideMotion } from "../../libs/FramerMotion";
import ModalComponent from "../../Components/ModalComponet";
import { ContextData } from "../../Services/Context";
import { Form } from "react-bootstrap";
import DeleteConfirmation from "../../Components/DeleteConfirmation";

function Member() {
  const [memberModal, setMemberModal] = useState({ show: false, id: null });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  return (
    <>
      <SlideMotion>
        <div className="card w-100 position-relative overflow-hidden">
          {" "}
          <h5 className="card-title fw-semibold mb-0 lh-sm px-4 mt-3">
            Members
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
                onClick={() => setMemberModal({ show: true, id: null })}
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
                      <h6 className="fs-4 fw-semibold mb-0">Phone</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Email</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Username</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Password</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">User Role</h6>
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
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-1">
                            <h6 className="fs-4 fw-semibold mb-0"></h6>
                          </div>
                        </div>
                      </td>

                      <td></td>
                      <td>
                        <p className="mb-0 fw-normal"></p>
                      </td>
                      <td>
                        <span className="mb-0 fw-normal"></span>
                      </td>
                      <td>
                        <span className="mb-0 fw-normal"></span>
                      </td>

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
          show={memberModal.show}
          onHide={() => {
            setMemberModal({ show: false, id: null });
          }}
          title={<h5>Add Members</h5>}
          centered
          width={"500px"}
        >
          <Form
            Validate
            validated={validated}
            onSubmit={(e) => Check_Validation(e, setValidated)}
          >
            <div className="mb-4">
              <input
                required
                className="form-control form-control-lg "
                rows="4"
                placeholder="Location"
                // value={addLocation?.name}
                // onChange={(e) => setAddLocation({ ...addLocation, name: e.target.value })}
              ></input>
              <Form.Control.Feedback type="invalid">
                Please provide a Location Name.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
              <select
                id="emiratesSelect"
                required
                className="form-select form-control-lg"
                placeholder="Emirates"
                // value={addLocation?.emirates_id}

                // onChange={(e) => {
                //   setAddLocation({ ...addLocation, emirates_id: e.target.value });
                // }}
              >
                <option value="" disabled selected>
                  Emirates
                </option>
                {/* {getemirates?.map((emirate, index) => (
      <option key={index} value={emirate._id}>
        {emirate.name}
      </option>
    ))} */}
              </select>
              <Form.Control.Feedback type="invalid">
                Please select an Emirates.
              </Form.Control.Feedback>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-custom float-end">
                {/* {addLocation?._id ? 'Update' : 'Save'}  */}Save
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

export default Member;
