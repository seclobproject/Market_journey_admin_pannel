import React, { useContext, useEffect, useState } from "react";
import { Show_Toast } from "../../utils/Toastify";
import { SlideMotion } from "../../libs/FramerMotion";
import ModalComponent from "../../Components/ModalComponet";
import { Form } from "react-bootstrap";
import { ContextData } from "../../Services/Context";
import DeleteConfirmation from "../../Components/DeleteConfirmation";
import {
  packagesAddUrl,
  packagesEditUrl,
  packagesListUrl,
} from "../../utils/Constants";
import { ApiCall } from "../../Services/Api";
import Loader from "../../Components/Loader";

function Package() {
  const [packageModal, setPackageModal] = useState({ show: false, id: null });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [packagesList, setpackagesList] = useState([]);
  const [addPackages, setAddPackages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //------List packages-------
  const getPackagesList = async () => {
    setIsLoading(true);

    try {
      const response = await ApiCall("get", packagesListUrl);
      if (response.status === 200) {
        setIsLoading(false);

        setpackagesList(response?.data?.packageData);
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
  //---------add or edit packages---------
  const addOrEdit = async () => {
    try {
      if (addPackages._id) {
        const updateResponse = await ApiCall(
          "post",
          `${packagesEditUrl}/${addPackages._id}`,
          addPackages
        );
        if (updateResponse.status === 200) {
          setPackageModal(false);
          setValidated(false);

          getPackagesList();
          Show_Toast("Package updated successfully", true);
        } else {
          Show_Toast("Package Update Failed", false);
        }
      } else {
        const createResponse = await ApiCall(
          "post",
          packagesAddUrl,
          addPackages
        );
        if (createResponse.status === 200) {
          setPackageModal(false);
          setValidated(false);
          setAddPackages("");
          getPackagesList();

          Show_Toast("Packages added successfully", true);
        } else {
          // Show_Toast(error, false);
        }
      }
    } catch (error) {
      Show_Toast(error, false);
    }
  };

  useEffect(() => {
    getPackagesList();
  }, []);

  return (
    <>
      <SlideMotion>
        <div className="card w-100 position-relative overflow-hidden">
          {" "}
          <div className="px-4 py-3 border-bottom d-flex  align-items-center justify-content-between">
            <h5
              className="card-title fw-semibold mb-0  px-0 mt-3"
              style={{ color: "#0F1535" }}
            >
              Packages
            </h5>

            <div>
              <button
                className="btn btn-custom  ms-3 float-end"
                onClick={() => {
                  setPackageModal({ show: true, id: null });
                  setValidated(false);
                  setAddPackages("");
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
                  <thead className="fs-4 table-light" style={{color:"#fff"}}>
                    <tr>
                      <th  >
                        <h6 className="fs-4 fw-semibold mb-0">SL.NO</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                         Type
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Package Name</h6>
                      </th>

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Package Amount
                        </h6>
                      </th>
                      <th>Actions</th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {packagesList?.length ? (
                      <>
                        {packagesList.map((packages, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {packages?.franchiseName &&
                                packages.franchiseName.toUpperCase()}
                            </td>
                            <td>
                              {(packages?.packageName &&
                                packages.packageName.toUpperCase()) ||
                                "--"}
                            </td>
                            <td>₹ {packages?.packageAmount}</td>
                            <td>
                              {" "}
                              <a
                                className="dropdown-item d-flex align-items-center gap-3"
                                onClick={() => {
                                  setPackageModal({ show: true, id: null });
                                  setAddPackages(packages);
                                }}
                              >
                                <i
                                  className="fs-4 fas fa-pencil-alt"
                                  style={{ color: "red", cursor: "pointer" }}
                                ></i>
                              </a>
                            </td>
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
          show={packageModal.show}
          onHide={() => {
            setPackageModal({ show: false, id: null });
          }}
          title={<h5 style={{ color: "#F7AE15", margin: 0 }}>Add Packages</h5>}
          centered
          width={"500px"}
        >
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => Check_Validation(e, addOrEdit, setValidated)}
          >
            {!addPackages?._id && (
              <div className="mb-4">
                <label htmlFor="franchiseType" className="form-label">
                  Package Type
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
                      packageName: "",
                    })
                  }
                >
                  <option value="" disabled selected>
                    Select package type
                  </option>
                  <option value="Franchise">Franchise </option>
                  <option value="Courses">Courses</option>
                  <option value="Signals">Signals</option>
                </select>
                <Form.Control.Feedback type="invalid">
                  Please select a package type
                </Form.Control.Feedback>
                {addPackages?.franchiseName === "Franchise" && (
                  <div className="mt-4">
                    <label htmlFor="mobileFranchiseType" className="form-label">
                      Franchise
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
                        Select franchise type
                      </option>
                      <option value="District Franchise">
                        District Franchise
                      </option>

                      <option value="Zonal Franchise">Zonal Franchise</option>
                      <option value="Mobile Franchise">Mobile Franchise</option>
                    </select>
                    <Form.Control.Feedback type="invalid">
                      Please select a mobile franchise type.
                    </Form.Control.Feedback>
                  </div>
                )}
                {addPackages?.franchiseName === "Courses" && (
                  <div className="mt-4">
                    <label htmlFor="mobileFranchiseType" className="form-label">
                      Courses
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
                        Select course type
                      </option>
                      <option value="Loet 0.1">Loet 0.1</option>
                      <option value="Loet Pro">Loet Pro</option>
                      <option value="Loet Promax">Loet Pro Max</option>
                      {/* <option value="Algo course">Algo course</option> */}
                    </select>
                    <Form.Control.Feedback type="invalid">
                      Please select a mobile franchise type.
                    </Form.Control.Feedback>
                  </div>
                )}
                {addPackages?.franchiseName === "Signals" && (
                  <div className="mt-4">
                    <label htmlFor="mobileFranchiseType" className="form-label">
                      Signals
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
                        Select a signal
                      </option>
                      <option value="Algo">Algo Trade</option>
                      <option value="Trading Cafe">Trading Cafe</option>
                      <option value="Nifty">Nifty</option>
                      <option value="Nifty & Bank Nifty">
                        Nifty & Bank Nifty
                      </option>
                      <option value="Bank Nifty">Bank Nifty</option>
                      <option value="Bank Nifty & CrudeOil">
                        Bank Nifty & Crude Oil
                      </option>
                      <option value="Nifty & CrudeOil">
                        Nifty & Crude Oil
                      </option>
                      <option value="CrudeOil">Crude Oil</option>
                      <option value="All">All</option>
                    </select>
                    <Form.Control.Feedback type="invalid">
                      Please select a mobile franchise type.
                    </Form.Control.Feedback>
                  </div>
                )}
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Package Amount
              </label>
              <input
                type="number"
                id="packageAmountInput"
                className="form-control form-control-lg"
                placeholder="Enter package amount"
                value={addPackages?.packageAmount}
                onChange={(e) => {
                  setAddPackages({
                    ...addPackages,
                    packageAmount: e.target.value,
                  });
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a package amount.
              </Form.Control.Feedback>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-custom float-end ms-1">
                {addPackages?._id ? "Update" : "Save"}
              </button>
            </div>
          </Form>
          <button
            className="btn btn-cancel float-end me-1"
            onClick={() => {
              setPackageModal({ show: false, id: null });
            }}
          >
            Cancel
          </button>
        </ModalComponent>
      </SlideMotion>
    </>
  );
}

export default Package;
