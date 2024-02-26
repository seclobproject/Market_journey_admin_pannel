import React, { useContext, useEffect, useState } from "react";
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
import { Show_Toast } from "../../utils/Toast";
import Loader from "../../Components/Loader";

function Package() {
  const [packageModal, setPackageModal] = useState({ show: false, id: null });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [packagesList, setpackagesList] = useState([]);
  const [addPackages, setAddPackages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log(addPackages, "add");

  //------List packages-------
  const getPackagesList = async () => {
    try {
      setIsLoading(true)
      const response = await ApiCall("get", packagesListUrl);
      console.log(response, "response.....");
      if (response.status === 200) {
        setpackagesList(response?.data?.packageData);
        setIsLoading(false)

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
  //---------add or edit packages---------
  const addOrEdit = async () => {
    console.log("here");
    try {
      if (addPackages._id) {
        const updateResponse = await ApiCall(
          "post",
          `${packagesEditUrl}/${addPackages._id}`,
          addPackages
        );
        console.log(updateResponse, "response");
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
          Show_Toast(error, false);
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
          <h5 className="card-title fw-semibold mb-0 lh-sm px-4 mt-3">
            Packages
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
                <thead className="text-dark fs-4 table-light">
                  <tr>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">SL.NO</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Franchise Name</h6>
                    </th>

                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Package Amount</h6>
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
                            {(packages?.franchiseName &&
                              packages.franchiseName.toUpperCase()) ||
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
          title={<h5>Add Packages</h5>}
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
                    Select Franchise Type
                  </option>
                  <option value="District Franchise">District Franchise</option>
                  <option value="Zonal Franchise">Zonal Franchise</option>
                  <option value="Mobile Franchise">Mobile Franchise</option>
                </select>
                <Form.Control.Feedback type="invalid">
                  Please select a franchise type.
                </Form.Control.Feedback>
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
                placeholder="Package Amount"
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
            cancel
          </button>
        </ModalComponent>
      </SlideMotion>
    </>
  );
}

export default Package;
