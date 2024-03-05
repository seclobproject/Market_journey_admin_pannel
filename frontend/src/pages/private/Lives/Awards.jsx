import React, { useContext, useState } from 'react'
import { SlideMotion } from '../../../libs/FramerMotion';
import Loader from '../../../Components/Loader';
import ModalComponent from '../../../Components/ModalComponet';
import { ContextData } from '../../../Services/Context';
import { Form } from 'react-bootstrap';

function Awards() {
    const [isLoading, setIsLoading] = useState(false);
    const { Check_Validation } = useContext(ContextData);
    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState({ show: false, id: null });
    const [addDetails, setAddDetails] = useState({});

  return (
    <>
       <SlideMotion>
        
        <div className="card w-100 position-relative overflow-hidden">
          {" "}
        

          <div className="px-4 py-3 border-bottom d-flex  align-items-center justify-content-between">
          <h5 className="card-title fw-semibold mb-0  px-0 mt-3" style={{color: '#F7AE15'}}>
            Awards & Rewards
          </h5>

            <div>
              <button
                className="btn btn-custom  ms-3 float-end"
                onClick={() => {
                  setShowModal({ show: true, id: null });
                  setValidated(false);
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
        <ModalComponent
          show={showModal.show}
          onHide={() => {
            setShowModal({ show: false, id: null });
          }}
          title={
            <h5 style={{ color: '#F7AE15', margin: 0}}>
            Add Details
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
          {/* {!addPackages?._id && (
  <div className="mb-4">
    <label htmlFor="franchiseType" className="form-label">
      Franchise Type
    </label>
    <select
      required
      id="franchiseType"
      className="form-select form-control-lg"
      value={addPackages?.franchiseName}
      onChange={(e) =>
        setAddPackages({
          ...addPackages,
          franchiseName: e.target.value,
        })
      }
    >
      <option value="" disabled selected>
        Select franchise type
      </option>
      <option value="District Franchise">District Franchise</option>
      <option value="Zonal Franchise">Zonal Franchise</option>
      <option value="Mobile Franchise">Mobile Franchise</option>
    </select>
    <Form.Control.Feedback type="invalid">
      Please select a franchise type.
    </Form.Control.Feedback>

    {addPackages?.franchiseName === "Mobile Franchise" && (
      <div className="mt-4">
        <label htmlFor="mobileFranchiseType" className="form-label">
          Mobile Franchise Type
        </label>
        <select
          required
          id="mobileFranchiseType"
          className="form-select form-control-lg"
          value={addPackages?.packageName}
          onChange={(e) =>
            setAddPackages({
              ...addPackages,
              packageName: e.target.value,
            })
          }
        >
          <option value="" disabled selected>
            Select mobile franchise type
          </option>
          <option value="Mobile">Mobile</option>
          <option value="Premium calls">Premium calls</option>
          <option value="Diamond course">Diamond course</option>
          <option value="Platinum course">Platinum course</option>
          <option value="Algo course">Algo course</option>

        </select>
        <Form.Control.Feedback type="invalid">
          Please select a mobile franchise type.
        </Form.Control.Feedback>
      </div>
    )}
  </div>
)} */}

            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Member Name
              </label>
              <input
                type="text"
                id="packageAmountInput"
                className="form-control form-control-lg"
                placeholder="Enter user name"
                value={addDetails?.name}
                onChange={(e) => {
                  setAddDetails({
                    ...addDetails,
                    name: e.target.value,
                  });
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a package amount.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Achived Detaills
              </label>
              <textarea
              style={{height:'100px'}}
  id="packageAmountInput"
  className="form-control form-control-lg"
  placeholder="Enter achieved details"
  value={addDetails?.details}
  onChange={(e) => {
    setAddDetails({
      ...addDetails,
      details: e.target.value,
    });
  }}
  required
/>

              <Form.Control.Feedback type="invalid">
                Please enter a package amount.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
  <label htmlFor="exampleInputEmail1" className="form-label">
    Upload Image
  </label>
  <div className="d-flex align-items-center">
    <label htmlFor="imageUpload" className="btn btn-custom">
      <input
        type="file"
        accept="image/*"
        id="imageUpload"
        className="d-none"
      />
<i className="fa fa-cloud-upload-alt text-white"></i> Upload
    </label>
  </div>

  <Form.Control.Feedback type="invalid">
    Please enter a package amount.
  </Form.Control.Feedback>
</div>

            

            <div className="col-12 mt-4">
  <button type="submit" className="btn btn-custom float-end ms-1">
                {addDetails?._id ? "Update" : "Save"}
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
      </SlideMotion>

    </>
  )
}

export default Awards