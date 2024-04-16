import React, { useState } from 'react'
import { SlideMotion } from '../../../libs/FramerMotion';
import Loader from '../../../Components/Loader';

function Bonnushistory() {
    const [isLoading, setIsLoading] = useState(false);
    const [bonnusHistory, setbonnusHistory] = useState([]);

    

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
              Bonus History
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
                      <h6 className="fs-4 fw-semibold mb-0">Package Amount</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Date</h6>
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
                      <h6 className="fs-4 fw-semibold mb-0">Aprrove User</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Reject user</h6>
                    </th>
                    <th />
                  </tr>
                </thead>
                {/* <tbody>
                  {pendingMemberList?.length ? (
                    <>
                      {pendingMemberList.map(
                        (members, index) => (
                          console.log(members, "45678"),
                          (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {(members?.name &&
                                  members.name.toUpperCase()) ||
                                  "--"}
                              </td>
                              <td>
                                {(members?.sponserName &&
                                  members.sponserName.toUpperCase()) ||
                                  "--"}
                              </td>
                              <td>{members?.email || "--"}</td>
                              <td>{members?.phone || "--"}</td>
                              <td>{members?.tempPackageAmount || "0"}</td>
                              <td>{members?.createdAt ? moment(members.createdAt).format('DD/MM/YYYY') : "--"}</td>
                              <td>
                                <img
                                  alt="images"
                                  src={`                                  http://192.168.29.152:8000/uploads/${members?.screenshot}
                                  `}
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                  }}
                                />

                              
                              </td>
                              
                              <td>
                                {members?.userStatus === "readyToApprove" && (
                                  <span className="badge bg-danger rounded-3 fw-semibold">
                                    Ready to approve
                                  </span>
                                )}
                              </td>
                              <td>

<i className="fas fa-eye"    onClick={() =>   navigate('/user/details', { state: { data: members?._id } })}
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
                </tbody> */}
              </table>
            </div>
          </div>
            )}
          <div className="me-2">
            {/* -------------------------pagination--------------------- */}

            {/* -------------------------pagination--------------------- */}
          </div>
        </div>
      </SlideMotion>
    </>
  )
}

export default Bonnushistory