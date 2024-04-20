import React, { useContext, useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toastify";
import { SlideMotion } from "../../../libs/FramerMotion";
import Loader from "../../../Components/Loader";
import { ContextData } from "../../../Services/Context";
import ModalComponent from "../../../Components/ModalComponet";
import { Form, Stack } from "react-bootstrap";
import { ApiCall } from "../../../Services/Api";
import {
  addalertUrl,
  deleteAwardUrl,
  deletealertUrl,
  editalertUrl,
  viewalertsUrl,
} from "../../../utils/Constants";
import { Pagination } from "@mui/material";
import moment from "moment";

function Alert() {
  const [alertModal, setAlertModal] = useState({ show: false, id: null });
  const [isLoading, setIsLoading] = useState(false);
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [addAlerts, setAddAlerts] = useState({
    title: "notifications",
  });
  const [alertList, setAlertList] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const startIndex = (params.page - 1) * params.pageSize;

  //-----------list alerts--------
  const getAlerts = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", viewalertsUrl, {}, params);
      if (response.status === 200) {
        setAlertList(response?.data?.signals);
        setTotalPages(response?.data?.pagination?.totalPages);
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

  //-------alret add and edit ----------
  const addAlertsFun = async (e) => {
    try {
      if (addAlerts?._id) {
        const response = await ApiCall(
          "post",
          `${editalertUrl}/${addAlerts?._id}`,
          addAlerts
        );
        if (response.status === 201 || response.status === 200) {
          setAlertModal(false);
          setValidated(false);
          getAlerts();
          Show_Toast("Alert updated successfully", true);
        } else {
          Show_Toast("Alert update failed", false);
        }
      } else {
        const response = await ApiCall("post", addalertUrl, addAlerts);
        if (response.status === 201 || response.status === 200) {
          setAlertModal(false);
          setValidated(false);
          getAlerts();

          Show_Toast("Alert addded successfully", true);
        } else {
          Show_Toast("alert added failed", false);
        }
      }
    } catch (error) {
      console.error("News uploading Video:", error);
      Show_Toast("News upload failed", false);
    }
  };
  //----------delete image----------
  const deleteAlert = async () => {
    try {
      const response = await ApiCall(
        "post",
        `${deletealertUrl}/${addAlerts._id}`
      );
      if (response?.status === 200) {
        Show_Toast(response?.data?.msg, true);
        setDeleteModal(false);
        getAlerts();
      } else {
        Show_Toast("Failed to delete video", false);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      Show_Toast("Failed to delete video. Please try again.", false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };
  useEffect(() => {
    getAlerts();
  }, [params]);
  return (
    <>
      <SlideMotion>
        <div className="card w-100 position-relative overflow-hidden">
          {" "}
          <div className="px-4 py-3 border-bottom d-flex  align-items-center justify-content-between">
            <h5
              className="card-title fw-semibold mb-0  px-0 mt-3"
              style={{ color: "#F7AE15" }}
            >
              Alerts
            </h5>

            <div>
              <button
                className="btn btn-custom  ms-3 float-end"
                onClick={() => {
                  setAlertModal({ show: true, id: null });
                  setValidated(false);
                  setAddAlerts({
                    title: "notification",
                  });
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
                        <h6 className="fs-4 fw-semibold mb-0">Date</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Signals</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Alerts</h6>
                      </th>

                      <th>Actions</th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {alertList?.length ? (
                      <>
                        {alertList.map((alert, index) => (
                          <tr key={index}>
                            <td>{startIndex + index + 1}</td>
                            <td>
                              {alert?.createdAt
                                ? moment(alert.createdAt).format("DD/MM/YYYY")
                                : "--"}
                            </td>
                            <td>{alert?.title || "--"}</td>

                            <td>{alert?.description || "--"}</td>
                            <td>
                              {" "}
                              <a
                                className="dropdown-item d-flex align-items-center gap-3"
                                onClick={() => {
                                  setDeleteModal({
                                    show: true,
                                    id: null,
                                  });
                                  setAddAlerts(alert);
                                }}
                              >
                                <i
                                  className="fs-4 fas fa-trash-alt"
                                  style={{
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                />
                              </a>
                              <a
                                className="dropdown-item d-flex align-items-center gap-3 mt-2"
                                onClick={() => {
                                  setAlertModal({
                                    show: true,
                                    id: alert?._id,
                                  });
                                  setAddAlerts(alert);
                                }}
                              >
                                <i
                                  className="fs-4 fas fa-pencil-alt"
                                  style={{
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                ></i>{" "}
                              </a>
                            </td>
                            <td></td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={20} style={{ textAlign: "center" }}>
                          <b>No Alerts Found</b>{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
        </div>
      </SlideMotion>
      <ModalComponent
        show={alertModal.show}
        onHide={() => {
          setAlertModal({ show: false, id: null });
        }}
        title={<h5 style={{ color: "#F7AE15", margin: 0 }}>Add Alerts</h5>}
        centered
        width={"500px"}
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => Check_Validation(e, addAlertsFun, setValidated)}
        >
          {!alertModal?.id && (
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Signals
              </label>
              <select
                value={addAlerts?.title}
                onChange={(e) => {
                  setAddAlerts({
                    ...addAlerts,
                    title: e.target.value,
                  });
                }}
                className="form-control"
              >
                <option value="bankNifty">BankNifty</option>
                <option value="nifty">Nifty</option>
                <option value="crudeOil">crudeOil</option>
                {/* Add more filter options as needed */}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Alert Content
            </label>
            <textarea
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter alert content"
              style={{ height: "100px" }}
              value={addAlerts?.description}
              onChange={(e) => {
                setAddAlerts({
                  ...addAlerts,
                  description: e.target.value,
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
              {addAlerts?._id ? "Update" : "Send"}
            </button>
          </div>
        </Form>
        <button
          className="btn btn-cancel float-end me-1"
          onClick={() => {
            setAlertModal({ show: false, id: null });
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
                Are you sure you want to delete this alert{""} ?
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
                deleteAlert();
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
    </>
  );
}

export default Alert;
