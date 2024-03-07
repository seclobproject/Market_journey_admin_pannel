import React, { useContext, useState } from 'react'
import { SlideMotion } from '../../../libs/FramerMotion'
import Loader from '../../../Components/Loader';
import { ContextData } from '../../../Services/Context';
import ModalComponent from '../../../Components/ModalComponet';
import { Form } from 'react-bootstrap';

function Alert() {
    const [alertModal,setAlertModal] = useState({ show: false, id: null });
    const [isLoading, setIsLoading] = useState(false);
    const { Check_Validation } = useContext(ContextData);
    const [validated, setValidated] = useState(false);
    const [addAlerts,setAddAlerts]=useState({})
  return (
    <>
    <SlideMotion>
    <div className="card w-100 position-relative overflow-hidden">
          {" "}
        

          <div className="px-4 py-3 border-bottom d-flex  align-items-center justify-content-between">
          <h5 className="card-title fw-semibold mb-0  px-0 mt-3" style={{color: '#F7AE15'}}>
           Alerts
          </h5>

            <div>
              <button
                className="btn btn-custom  ms-3 float-end"
                onClick={() => {
                  setAlertModal({ show: true, id: null });
                //   setValidated(false);
                //   setAddPackages("");
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
                      <h6 className="fs-4 fw-semibold mb-0">Franchise Name</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Package Name</h6>
                    </th>

                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Package Amount</h6>
                    </th>
                    <th>Actions</th>

                    <th />
                  </tr>
                </thead>
                {/* <tbody>
                  {packagesList?.length ? (
                    <>
                      {packagesList.map((packages, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {(packages?.franchiseName &&
                              packages.franchiseName.toUpperCase()) ||
                              "--"}
                          </td>
                          <td>
                            {(packages?.packageName &&
                              packages.packageName.toUpperCase()) ||
                              "--"}
                          </td>
                          <td>{packages?.packageAmount || "0"}</td>
                          <td>
                            {" "}
                            <a
                              className="dropdown-item d-flex align-items-center gap-3"
                              onClick={() => {
                                setPackageModal({ show: true, id: null });
                                setAddPackages(packages);
                              }}
                            >
                              <i className="fs-4 ti ti-edit" />
                              Edit
                            </a>
                          </td>
                          <td></td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={20} style={{ textAlign: "center" }}>
                        <b>No Packages Found</b>{" "}
                      </td>
                    </tr>
                  )}
                </tbody> */}
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
    </SlideMotion>
    <ModalComponent
          show={alertModal.show}
          onHide={() => {
            setAlertModal({ show: false, id: null });
          }}
          title={
            <h5 style={{ color: '#F7AE15', margin: 0}}>
            Add Alerts
            </h5>
          }          
          
          centered
          width={"500px"}
        >
          <Form
            noValidate
            validated={validated}
            // onSubmit={(e) => Check_Validation(e, addOrEdit, setValidated)}
          >
  
  <div className="mb-4">
  <label htmlFor="exampleInputEmail1" className="form-label">
    Alert Content
  </label>
  <textarea
    id="packageAmountInput"
    className="form-control form-control-lg"
    placeholder="Enter alert content"
    style={{height:'100px'}}
    value={addAlerts?.alerts}
    onChange={(e) => {
      setAddDetails({
        ...addDetails,
        alerts: e.target.value,
      });
    }}
    required
  />
  <Form.Control.Feedback type="invalid">
    Please enter alert content.
  </Form.Control.Feedback>
</div>

            


            

            <div className="col-12 mt-4">
  <button type="submit" className="btn btn-custom float-end ms-1">
                {addAlerts?._id ? "Update" : "Save"}
              </button>
            </div>
          </Form>
          <button
            className="btn btn-cancel float-end me-1"
            onClick={() => {
              setShowModal({ show: false, id: null });
            }}
          >
            cancel
          </button>
        </ModalComponent>
    </>
  )
}

export default Alert