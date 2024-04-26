import React, { useEffect, useState } from 'react'
import { SlideMotion } from '../../../libs/FramerMotion'
import Loader from '../../../Components/Loader'
import { ApiCall } from '../../../Services/Api';
import { approvedRenewalUrl, pendingrenewalUrl, rejectedRenewalUrl } from '../../../utils/Constants';
import ModalComponent from '../../../Components/ModalComponet';
import moment from 'moment';
import { Image } from "antd";
import { Show_Toast } from '../../../utils/Toastify';
import { Pagination, Stack } from '@mui/material';

function Pendingrenewal() {
    const [isLoading, setIsLoading] = useState(false);
    const [approveModal, setApproveModal] = useState({ show: false, id: null });
    const [rejectModal, setrejectModal] = useState({ show: false, id: null });
    const [pendingRenewalList, setPendingRenewalList] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        pageSize: 20,
      });
      const [totalPages, setTotalPages] = useState(1);
      const startIndex = (params.page - 1) * params.pageSize;

      console.log(totalPages,"setTotalPages")

//------------pendingRenewalList------------
    const getpendingRenewals = async () => {
        setIsLoading(true);
        try {
          const response = await ApiCall("get", pendingrenewalUrl,{},params);
          console.log(response,"res");
          if (response.status === 200) {
            setPendingRenewalList(response?.data?.pendingRenews
            );
            setTotalPages(response?.data?.pagination?.totalPages);

            setIsLoading(false);
          } else {
            console.error(
              "Error fetching pending renewals list. Unexpected status:",
              response.status
            );
          }
        } catch (error) {
          console.error("Error fetching state list:", error);
        }
      };

       //------------approve user--------------
  const approveUser = async () => {
    try {
      const resposne = await ApiCall(
        "post",
        `${approvedRenewalUrl}/${approveModal.id}`
      );
      console.log(resposne,"res")
      if (resposne?.status === 200) {
        Show_Toast("pending renewal approved successfully", true);
        setApproveModal(false);
        getpendingRenewals();
      }
    } catch (error) {
      Show_Toast(error, false);
    }
  };

  //-------------Reject user----------------
  const rejectUser = async () => {
    try {
      const resposne = await ApiCall(
        "post",
        `${rejectedRenewalUrl}/${rejectModal.id}`
      );
      if (resposne?.status === 200) {
        Show_Toast("Renewal Rejected successfully", true);
        setrejectModal(false);
        getpendingRenewals();
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

    useEffect(()=>{
getpendingRenewals();
    },[params]);
    return (
    <>
       <SlideMotion>
        <div className="card w-100 position-relative overflow-hidden">
          {" "}
          <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
            <h5
              className="card-title fw-semibold mb-0 lh-sm px-0 mt-4"
              style={{ color: "#0F1535" }}
            >
              Pending Renewals
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
                        <h6 className="fs-4 fw-semibold mb-0">Date & Time</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Name</h6>
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
                        <h6 className="fs-4 fw-semibold mb-0">Action</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Package Amount
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">pendingPackage</h6>
                      </th>

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Image</h6>
                      </th>

              
                   
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Approve User</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Reject user</h6>
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRenewalList?.length ? (
                      <>
                        {pendingRenewalList.map((renewals, index) => (
                          <tr key={index}>
                            <td>{startIndex + index + 1}</td>
                            <td>
                              {renewals?.updatedAt
                                ? moment(renewals.updatedAt).format("DD/MM/YYYY, HH:mm A")
                                : "--"}
                            </td>

                            <td>
                              {(renewals?.name && renewals.name.toUpperCase()) ||
                                "--"}
                            </td>
                            <td>
                              {(renewals?.sponserName
 &&
                                renewals.sponserName
                                .toUpperCase()) ||
                                "--"}
                            </td>

                            <td>{renewals?.email || "--"}</td>
                            <td>{renewals?.phone || "--"}</td>
                            <td>
                            <span className="badge bg-danger rounded-3 fw-semibold">

                              {(renewals?.action
 &&
                                renewals.action
                                .toUpperCase()) ||
                                "--"}
                               </span>
                            </td>
                            <td>₹ {renewals?.tempPackageAmount || "0"}</td>
                                                        <td>{renewals?.pendingPackage || "0"}</td>


                            <td>
                              {renewals?.screenshot && (
                                <Image
                                  width={200}
                               
                                  src={`https://admin.marketjourney.in/uploads/${renewals?.screenshot}`}

                                />
                              )}
                            </td>

                            {/* <td>
                              {renewals?.userStatus === "readyToApprove" && (
                                <span className="badge bg-danger rounded-3 fw-semibold">
                                  Ready to approve
                                </span>
                              )}
                            </td> */}
                            {/* <td>
                              <i
                                className="fas fa-eye"
                                onClick={() =>
                                  navigate("/user/details", {
                                    state: { data: members?._id },
                                  })
                                }
                              ></i>
                            </td> */}

                            <td>
                              {/* {members?.userStatus === "readyToApprove" && ( */}
                                <button
                                  className="btn btn-success"
                                  onClick={() =>
                                    setApproveModal({
                                      show: true,
                                      id: renewals._id,
                                      action:renewals?.action
                                    })
                                  }
                                >
                                  Approve
                                </button>
                              {/* )} */}
                            </td>
                            <td>
                              {/* {members?.userStatus === "readyToApprove" && ( */}
                                <button
                                  className="btn btn-cancel"
                                  onClick={() =>
                                    setrejectModal({
                                      show: true,
                                      id: renewals._id,
                                      action:renewals?.action

                                    })
                                  }
                                >
                                  Reject
                                </button>
                              {/* )} */}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={20} style={{ textAlign: "center" }}>
                          <b>No Pending renewal Found</b>{" "}
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
         {/* approve modal */}
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
              Are you sure you want to approve this  {approveModal?.action ? approveModal.action.charAt(0).toUpperCase() + approveModal.action.slice(1) : ''} ?
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
                approveUser();
              }}
            >
              Yes, Approve it
            </button>
          </div>
        </div>
      </ModalComponent>
      {/* Reject modal */}

      <ModalComponent
        show={rejectModal.show}
        onHide={() => {
          setrejectModal({ show: false, id: null });
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
              Are you sure you want to reject this  {rejectModal?.action ? rejectModal.action.charAt(0).toUpperCase() + rejectModal.action.slice(1) : ''} ?
              </h5>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="col gap-3 d-flex justify-content-center">
            <button
              onClick={() => {
                setrejectModal({ show: false, id: null });
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
                rejectUser();
              }}
            >
              Yes, Reject it
            </button>
          </div>
        </div>
      </ModalComponent>
    </>
  )
}

export default Pendingrenewal