import React, { useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import Loader from "../../../Components/Loader";
import {
  addorrejectAccountUrl,
  pendingdemateaccountUrl,
} from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";
import moment from "moment";
import ModalComponent from "../../../Components/ModalComponet";
import { Show_Toast } from "../../../utils/Toastify";
import { Pagination, Stack } from "@mui/material";

function Pendingaccounts() {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingAccounts, setpendingAccounts] = useState([]);
  const [approveModal, setApproveModal] = useState({ show: false, id: null });
  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 20,
  });
  const startIndex = (params.page - 1) * params.pageSize;

  //-----------list pending accounts--------
  const getPendingAccounts = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall(
        "get",
        pendingdemateaccountUrl,
        {},
        params
      );
      if (response.status === 200) {
        setpendingAccounts(response?.data?.pendingDemats);
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
  //------------approve or reject accounts--------------
  const approveOrReject = async () => {
    try {
      const action = approveModal?.action;

      const resposne = await ApiCall(
        "post",
        `${addorrejectAccountUrl}/${approveModal.id}`,
        { action }
      );
      if (resposne?.status === 200) {
        Show_Toast(resposne?.data?.msg, true);
        setApproveModal(false);
        getPendingAccounts();
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

  useEffect(() => {
    getPendingAccounts();
  }, [params]);

  return (
    <>
      <SlideMotion>
        <div className="card w-100 position-relative overflow-hidden">
          {" "}
          <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
            <h5
              className="card-title fw-semibold mb-0 lh-sm px-0 mt-4"
              style={{ color: "#F7AE15" }}
            >
              Pending Demat Account
            </h5>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="card-body p-2 mb-2">
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
                        <h6 className="fs-4 fw-semibold mb-0">Name</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">User Name</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Sponser Name</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Email</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Phone</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Status</h6>
                      </th>

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Approve user</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Reject user</h6>
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {pendingAccounts?.length ? (
                      <>
                        {pendingAccounts.map((acounts, index) => (
                          <tr key={index}>
                            <td>{startIndex + index + 1}</td>
                            <td>
                              {acounts?.createdAt
                                ? moment(acounts.createdAt).format("DD/MM/YYYY")
                                : "--"}
                            </td>

                            <td>
                              {(acounts?.name && acounts.name.toUpperCase()) ||
                                "--"}
                            </td>
                            <td>{acounts?.demateUserName}</td>
                            <td>
                              {(acounts?.sponserName &&
                                acounts.sponserName.toUpperCase()) ||
                                "--"}
                            </td>

                            <td>{acounts?.email || "--"}</td>
                            <td>{acounts?.phone || "--"}</td>
                            <td>
                              {acounts?.status === "pending" && (
                                <span className="badge bg-danger rounded-3 fw-semibold">
                                  Pending
                                </span>
                              )}
                            </td>

                            <td>
                              {acounts?.status === "pending" && (
                                <button
                                  className="btn btn-success"
                                  onClick={() =>
                                    setApproveModal({
                                      show: true,
                                      id: acounts._id,
                                      action: "approve",
                                    })
                                  }
                                >
                                  Approve
                                </button>
                              )}
                            </td>
                            <td>
                              {acounts?.status === "pending" && (
                                <button
                                  className="btn btn-cancel"
                                  onClick={() =>
                                    setApproveModal({
                                      show: true,
                                      id: acounts._id,
                                      action: "reject",
                                    })
                                  }
                                >
                                  Reject
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={20} style={{ textAlign: "center" }}>
                          <b>No Accounts Found</b>{" "}
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

      {/* approve modal  or reject modal*/}
      <ModalComponent
        show={approveModal.show}
        onHide={() => {
          setApproveModal({ show: false, id: null });
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
                Are you sure you want to{" "}
                {approveModal?.action === "approve" ? "approve" : "reject"} this
                account?{" "}
              </h5>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="col gap-3 d-flex justify-content-center">
            <button
              onClick={() => {
                setApproveModal({ show: false, id: null });
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
                approveOrReject();
              }}
            >
              Yes, {approveModal?.action === "approve" ? "Approve" : "Reject"}{" "}
              it
            </button>
          </div>
        </div>
      </ModalComponent>
    </>
  );
}

export default Pendingaccounts;
