import React, { useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import Loader from "../../../Components/Loader";
import { ApiCall } from "../../../Services/Api";
import { acceptrequestUrl, viewwithrawalrequesteUrl } from "../../../utils/Constants";
import moment from "moment";
import ModalComponent from "../../../Components/ModalComponet";
import { Pagination, Stack } from "@mui/material";
import { Show_Toast } from "../../../utils/Toastify";
import { useNavigate } from "react-router-dom";

function Pendingwithraw() {
  const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [viewRequest, setViewRequest] = useState([]);
  const [approveModal, setApproveModal] = useState({ show: false, id: null });
  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });

//----------------View Request--------------
  const getRequest = async () => {

    try {
      setIsLoading(true);
      const response = await ApiCall(
        "get",
        viewwithrawalrequesteUrl,
        {},
        params
      );
      console.log(response, "response...");
      if (response?.status === 200) {
        setViewRequest(response?.data?.userData);
        setTotalPages(response?.data?.pagination?.totalPages);

        setIsLoading(false);
      } else {
        console.error(
          "Error fetching request data. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching user request:", error);
    }
  };
  //------------approve request--------------
  const approveRequest = async () => {
    try {
      const action=approveModal?.action

      const resposne = await ApiCall(
        "post",
        `${acceptrequestUrl}/${approveModal.id}`,{action}
      );
      console.log(resposne,"res ress res")
      if (resposne?.status === 200) {
        Show_Toast(resposne?.data?.msg, true);
        setApproveModal(false);
        getRequest();
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
    getRequest();
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
              Pending Withrawals
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
                        <h6 className="fs-4 fw-semibold mb-0">Email</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Phone</h6>
                      </th>
                    
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                        Wallet Withdraw Amount 
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">TDS Amount</h6>
                      </th>
                    
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Withdraw Status</h6>
                      </th>
                     
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Aprrove Request</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Reject Request</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">View Details</h6>
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                  {viewRequest?.length ? (
                    <>
                      {viewRequest.map(
                        (request, index) => (
                          (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{request?.updatedAt ? moment(request.updatedAt).format('DD/MM/YYYY') : "--"}</td>

                              <td>
                                {(request?.name &&
                                  request.name.toUpperCase()) ||
                                  "--"}
                              </td>
                              {/* <td>
                                {(members?.sponserName &&
                                  members.sponserName.toUpperCase()) ||
                                  "--"}
                              </td> */}
                              <td>{request?.email || "--"}</td>
                              <td>{request?.phone || "--"}</td>
                              <td>{request?.walletWithdrawAmount || "0"}</td>
                              <td>{request?.tdsAmount || "0"}</td>
                              <td>
      {request?.walletWithdrawStatus === "pending" && (
        <span className="badge bg-danger rounded-3 fw-semibold">Pending</span>
      )}
    </td>
    
    <td>
                                  <button
                                    className="btn btn-success"
                                    onClick={() =>
                                      setApproveModal({
                                        show: true,
                                        id: request._id,
                                        action: 'approve'
                                      })
                                    }
                                  >
                                    Approve
                                  </button>
                              </td>
                              <td>
                                  <button
                                    className="btn btn-cancel"
                                    onClick={() =>
                                      setApproveModal({
                                        show: true,
                                        id: request._id,
                                        action: 'reject'

                                      })
                                    }
                                  >
                                    Reject
                                  </button>
                              </td>                
                              <td>

<i className="fas fa-eye"    onClick={() =>   navigate('/user/details', { state: { data: request?._id } })}
></i>   

</td>
                              
                         
        

                           
                            </tr>
                          )
                        )
                      )}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={20} style={{ textAlign: "center" }}>
                        <b>No History Found</b>{" "}
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
              Are you sure you want to {approveModal?.action === 'approve' ? 'approve' : 'reject'} this request?              </h5>
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
                approveRequest()              
              }}
            >
              Yes, {approveModal?.action === 'approve' ? 'Approve' : 'Reject'} it
            </button>
          </div>
        </div>
      </ModalComponent>
    </>
  );
}

export default Pendingwithraw;
