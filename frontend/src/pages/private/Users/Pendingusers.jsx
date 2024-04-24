import React, { useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toastify";
import { SlideMotion } from "../../../libs/FramerMotion";
import { ApiCall } from "../../../Services/Api";
import {
  approvependingsUrl,
  rejectuserUrl,
  viewpendingmemberUrl,
} from "../../../utils/Constants";
import ModalComponent from "../../../Components/ModalComponet";
import Loader from "../../../Components/Loader";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Image } from "antd";

function Pendingusers() {
  const navigate = useNavigate();
  const [approveModal, setApproveModal] = useState({ show: false, id: null });
  const [rejectModal, setrejectModal] = useState({ show: false, id: null });
  const [pendingMemberList, setPendingMemberList] = useState([]);
  const [pendingUserName, setpendingUserName] = useState({});
  const [pagination, setPagination] = useState({});
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(false);

  //-----------pending member --------
  const getpendingMenbers = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", viewpendingmemberUrl);
      if (response.status === 200) {
        setPendingMemberList(response?.data?.userData);
        setIsLoading(false);
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
  //------------approve user--------------
  const approveUser = async () => {
    try {
      const resposne = await ApiCall(
        "post",
        `${approvependingsUrl}/${approveModal.id}`
      );
      if (resposne?.status === 200) {
        Show_Toast("User Approved successfully", true);
        setApproveModal(false);
        getpendingMenbers();
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
        `${rejectuserUrl}/${rejectModal.id}`
      );
      if (resposne?.status === 200) {
        Show_Toast("User Rejected successfully", true);
        setrejectModal(false);
        getpendingMenbers();
      }
    } catch (error) {
      Show_Toast(error, false);
    }
  };

  useEffect(() => {
    getpendingMenbers();
  }, []);

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
              Pending Members
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
                        <h6 className="fs-4 fw-semibold mb-0">Sponser Name</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Email</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Phone</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Package Amount
                        </h6>
                      </th>

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Image</h6>
                      </th>

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Status</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">View Details</h6>
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
                    {pendingMemberList?.length ? (
                      <>
                        {pendingMemberList.map((members, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {members?.createdAt
                                ? moment(members.createdAt).format("DD/MM/YYYY")
                                : "--"}
                            </td>

                            <td>
                              {(members?.name && members.name.toUpperCase()) ||
                                "--"}
                            </td>
                            <td>
                              {(members?.sponserName &&
                                members.sponserName.toUpperCase()) ||
                                "--"}
                            </td>
                            {/* <td>{zonals?.stateName && zonals.stateName.toUpperCase()||"--"}</td> */}
                            <td>{members?.email || "--"}</td>
                            <td>{members?.phone || "--"}</td>
                            <td>{members?.tempPackageAmount || "0"}</td>

                            <td>
                              {members?.screenshot && (
                                <Image
                                  width={200}
                               
                                  // src={`http://192.168.29.152:6003/uploads/${members?.screenshot}`}
                                  src={`https://admin.marketjourney.in/uploads/${members?.screenshot}`}

                                />
                              )}
                            </td>

                            <td>
                              {members?.userStatus === "readyToApprove" && (
                                <span className="badge bg-danger rounded-3 fw-semibold">
                                  Ready to approve
                                </span>
                              )}
                            </td>
                            <td>
                              <i
                                className="fas fa-eye"
                                onClick={() =>
                                  navigate("/user/details", {
                                    state: { data: members?._id },
                                  })
                                }
                              ></i>
                            </td>

                            <td>
                              {members?.userStatus === "readyToApprove" && (
                                <button
                                  className="btn btn-success"
                                  onClick={() =>
                                    setApproveModal({
                                      show: true,
                                      id: members._id,
                                    })
                                  }
                                >
                                  Approve
                                </button>
                              )}
                            </td>
                            <td>
                              {members?.userStatus === "readyToApprove" && (
                                <button
                                  className="btn btn-cancel"
                                  onClick={() =>
                                    setrejectModal({
                                      show: true,
                                      id: members._id,
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
                          <b>No Pending Users Found</b>{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
                Are you sure you want to approve this pending user {""} ?
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
                Are you sure you want to reject this pending user {""} ?
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
  );
}

export default Pendingusers;
