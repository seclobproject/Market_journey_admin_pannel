import React, { useContext, useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import { ContextData } from "../../../Services/Context";
import ModalComponent from "../../../Components/ModalComponet";
import { Form } from "react-bootstrap";
import {
  deletepanchayathUrl,
  districtlistinZonalUrl,
  editPanchayathUrl,
  paginatedPanchayathUrl,
  panchayathPageUrl,
  panchayathlistPageUrl,
  statelistPageUrl,
  zonallistindropdownUrl,
} from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";
import Select from "react-select";
import Loader from "../../../Components/Loader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Show_Toast } from "../../../utils/Toastify";
function Panchayath() {
  const [PanchayathModal, setPanchayathModal] = useState({
    show: false,
    id: null,
  });
  const [panchayathEditModal, setPanchayathEditModal] = useState({
    show: false,
    id: null,
  });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [addPanchayath, setAddPanchayath] = useState({});
  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [districtList, setdistrictList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [zonalList, setZonalList] = useState([]);
  const [districtId, setDistrictId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [panchyathList, setPanchayathList] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });

  const [totalPages, setTotalPages] = useState(1);
  const startIndex = (params.page - 1) * params.pageSize;

  //-----------list state in drop down--------
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
  //-----------list state in drop down--------
  const getDistrictList = async () => {
    try {
      const response = await ApiCall(
        "get",
        `${districtlistinZonalUrl}/${selectedId}`
      );
      if (response.status === 200) {
        setdistrictList(response?.data?.districts);
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
  //-----------list Zonal in drop down--------
  const getZonallist = async () => {
    try {
      const response = await ApiCall(
        "get",
        `${zonallistindropdownUrl}/${districtId}`
      );
      if (response.status === 200) {
        setZonalList(response?.data?.zonals);
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
  //-----------list Zonals --------
  const getPanchayathList = async () => {
    try {
      setIsLoading(true);

      const response = await ApiCall("get", paginatedPanchayathUrl, {}, params);
      if (response.status === 200) {
        setPanchayathList(response?.data?.panchayaths);
        setTotalPages(response?.data?.totalPages);

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
  //---------Add--panchayath---------
  // const addPanchayathFun = async () => {

  //   try {
  //     const response = await ApiCall("post", panchayathPageUrl, addPanchayath);
  //     if (response.status === 200) {
  //       setPanchayathModal(false);
  //       setValidated(false);
  //       setAddPanchayath("");
  //       getPanchayathList();
  //       // ();
  //       Show_Toast("Panchayath added successfully", true);
  //     }
  //   } catch (error) {
  //     Show_Toast(error, false);
  //   }
  // };

  const addPanchayathFun = async () => {
    try {
      if (addPanchayath?.id) {
        const updateResponse = await ApiCall(
          "POST",
          `${editPanchayathUrl}/${addPanchayath.id}`,
          addPanchayath
        );
        if (updateResponse.status === 200) {
          setPanchayathEditModal(false);
          setValidated(false);
          getPanchayathList();
          Show_Toast("panchayath updated successfully", true);
        } else {
          Show_Toast("panchayath Update Failed", false);
        }
      } else {
        const createResponse = await ApiCall(
          "POST",
          panchayathPageUrl,
          addPanchayath
        );
        if (createResponse.status === 200) {
          setPanchayathModal(false);
          setValidated(false);
          setAddPanchayath("");
          getPanchayathList();

          Show_Toast("panchayath added successfully", true);
        } else {
          console.log(error, "error");
          Show_Toast(error, false);
        }
      }
    } catch (error) {
      Show_Toast(error, false);
    }
  };
  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };

  //----------delete Disrict----------
  const deletepanchayath = async () => {
    try {
      const response = await ApiCall(
        "post",
        `${deletepanchayathUrl}/${addPanchayath.id}`
      );
      if (response?.status === 200) {
        Show_Toast(response?.data?.msg, true);
        setDeleteModal(false);
        getPanchayathList();
      } else {
        Show_Toast("Failed to delete ", false);
      }
    } catch (error) {
      console.error("Error deleting :", error);
      Show_Toast("Failed to delete. Please try again.", false);
    }
  };
  useEffect(() => {
    getPanchayathList();
    if (districtId) {
      getZonallist();
    }
  }, [districtId, params]);
  useEffect(() => {
    if (selectedId) {
      getDistrictList();
    }
  }, [selectedId]);
  return (
    <>
      <SlideMotion>
        <div className="card w-100 position-relative overflow-hidden">
          <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
            <h5
              className="card-title fw-semibold mb-0 lh-sm px-0 mt-3"
              style={{ color: "#F7AE15" }}
            >
              Panchayath
            </h5>

            <div>
              <button
                className="btn btn-custom ms-3 float-end"
                onClick={() => {
                  setPanchayathModal({ show: true, id: null });
                  getStateList();

                  setValidated(false);
                  setAddPanchayath("");
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
                  <thead className="text-light fs-4 table-light">
                    <tr>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">SL.NO</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">State Name</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">District Name</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Zonal Name</h6>
                      </th>

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Panchayath Name
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Actions</h6>
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {panchyathList?.length ? (
                      <>
                        {panchyathList.map((panchayaths, index) => (
                          <tr key={index}>
                            <td>{startIndex + index + 1}</td>
                            <td>
                              {(panchayaths?.stateName &&
                                panchayaths.stateName.toUpperCase()) ||
                                "--"}
                            </td>
                            <td>
                              {(panchayaths?.districtName &&
                                panchayaths.districtName.toUpperCase()) ||
                                "--"}
                            </td>
                            <td>
                              {(panchayaths?.zonalName &&
                                panchayaths.zonalName.toUpperCase()) ||
                                "--"}
                            </td>

                            <td>
                              {(panchayaths?.panchayathName &&
                                panchayaths.panchayathName.toUpperCase()) ||
                                "--"}
                            </td>

                            <td>
                              {panchayaths?.isEditable === true ? (
                                <a
                                  className="dropdown-item d-flex align-items-center gap-3"
                                  onClick={() => {
                                    setPanchayathEditModal({
                                      show: true,
                                      id: null,
                                    });
                                    setAddPanchayath(panchayaths);
                                  }}
                                >
                                  <i
                                    className="fs-4 fas fa-pencil-alt"
                                    style={{ color: "red",cursor:'pointer' }}
                                  ></i>
                                </a>
                              ) : (
                                <button
                                  className="dropdown-item d-flex align-items-center gap-3"
                                  onClick={() =>
                                    Show_Toast(
                                      "Panchayath is already taken so not able to edit"
                                    )
                                  }
                                >
                                  <i
                                    className="fs-4 fas fa-pencil-alt"
                                    style={{ color: "grey",cursor:'pointer' }}
                                  ></i>
                                </button>
                              )}
                              {panchayaths?.isEditable === true ? (
                                <a
                                  className="dropdown-item d-flex align-items-center gap-3 mt-2"
                                  onClick={() => {
                                    setDeleteModal({ show: true, id: null });
                                    setAddPanchayath(panchayaths);
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
                                  // disabled
                                  onClick={() =>
                                    Show_Toast(
                                      "Panchayath is already taken so not able to delete"
                                    )
                                  }
                                >
                                  <i
                                    className="fs-4 fas fa-trash-alt"
                                    style={{ color: "grey",cursor:'pointer' }}
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
                          <b>No Panchayath Found</b>{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* -------------------------pagination--------------------- */}
          <div className="me-2 mb-3 d-flex ms-auto">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={params.page}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
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
        {/* add modal */}
        <ModalComponent
          show={PanchayathModal.show}
          onHide={() => {
            setPanchayathModal({ show: false, id: null });
          }}
          title={
            <h5 style={{ color: "#F7AE15", margin: 0 }}>Add Panchayath</h5>
          }
          centered
          width={"500px"}
        >
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) =>
              Check_Validation(e, addPanchayathFun, setValidated)
            }
          >
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                State
              </label>

              <Select
                required
                options={stateList?.map((state) => ({
                  value: state?.id,
                  label: state?.stateName,
                }))}
                value={selectedState?.stateName}
                onChange={(selectedOption) => {
                  setSelectedId(selectedOption?.value);
                  setAddPanchayath({
                    ...addPanchayath,
                    stateName: selectedOption?.label,
                  });
                }}
                placeholder="Select a state"
                isSearchable={true}
              />

              <Form.Control.Feedback type="invalid">
                Please select a state.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                District
              </label>
              <Select
                required
                options={districtList?.map((districts) => ({
                  value: districts?.id,
                  label: districts?.name,
                }))}
                value={selectedState?.stateName}
                onChange={(selectedOption) => {
                  setDistrictId(selectedOption?.value);

                  setAddPanchayath({
                    ...addPanchayath,
                    districtName: selectedOption?.label,
                  });
                }}
                placeholder="Select a district"
                isSearchable={true}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a package Amount.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Zonal
              </label>
              <Select
                required
                options={zonalList?.map((zonal) => ({
                  value: zonal?.id,
                  label: zonal?.name,
                }))}
                value={selectedState?.zonalName}
                onChange={(selectedOption) => {
                  setAddPanchayath({
                    ...addPanchayath,
                    zonalName: selectedOption?.label,
                  });
                }}
                placeholder="Select a zonal"
                isSearchable={true}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a zonal
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Panchayath
              </label>
              <input
                required
                className="form-control form-control-lg "
                rows="4"
                type="text"
                placeholder="Enter panchayath name"
                value={addPanchayath?.panchayathName}
                onChange={(e) =>
                  setAddPanchayath({
                    ...addPanchayath,
                    panchayathName: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                Please provide a panchayath name.
              </Form.Control.Feedback>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-custom float-end ms-1">
                {addPanchayath?._id ? "Update" : "Save"}
              </button>
            </div>
          </Form>
          <button
            className="btn btn-cancel float-end me-1"
            onClick={() => {
              setPanchayathModal({ show: false, id: null });
            }}
          >
            Cancel
          </button>
        </ModalComponent>
        {/* edit modal */}
        <ModalComponent
          show={panchayathEditModal.show}
          onHide={() => {
            setPanchayathEditModal({ show: false, id: null });
          }}
          title={
            <h5 style={{ color: "#F7AE15", margin: 0 }}>Edit Panchayath</h5>
          }
          centered
          width={"500px"}
        >
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) =>
              Check_Validation(e, addPanchayathFun, setValidated)
            }
          >
           
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Panchayath
              </label>
              <input
                required
                className="form-control form-control-lg "
                rows="4"
                type="text"
                placeholder="Enter panchayath name"
                value={addPanchayath?.panchayathName}
                onChange={(e) =>
                  setAddPanchayath({
                    ...addPanchayath,
                    panchayathName: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                Please provide a panchayath name.
              </Form.Control.Feedback>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-custom float-end ms-1">
                {addPanchayath?._id ? "Update" : "Save"}
              </button>
            </div>
          </Form>
          <button
            className="btn btn-cancel float-end me-1"
            onClick={() => {
              setPanchayathEditModal({ show: false, id: null });
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
                  deletepanchayath();
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

export default Panchayath;
