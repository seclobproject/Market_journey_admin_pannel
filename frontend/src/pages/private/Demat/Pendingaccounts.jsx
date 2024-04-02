import React, { useEffect, useState } from 'react'
import { SlideMotion } from '../../../libs/FramerMotion'
import Loader from '../../../Components/Loader';
import { pendingdemateaccountUrl } from '../../../utils/Constants';
import { ApiCall } from '../../../Services/Api';
import moment from 'moment';

function Pendingaccounts() {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingAccounts, setpendingAccounts] = useState([]);


    //-----------list state--------
    const getPendingAccounts = async () => {
      try {
        setIsLoading(true);
        const response = await ApiCall("get", pendingdemateaccountUrl);
        console.log(response,'response')
        if (response.status === 200) {
          setpendingAccounts(response?.data?.userData);
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

    useEffect(()=>{
getPendingAccounts()
    },[])
  
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
                      <h6 className="fs-4 fw-semibold mb-0">Aprrove User</h6>
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
                      {pendingAccounts.map(
                        (acounts, index) => (
                          console.log(acounts, "45678"),
                          (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{acounts?.createdAt ? moment(acounts.createdAt).format('DD/MM/YYYY') : "--"}</td>

                              <td>
                                {(acounts?.name &&
                                  acounts.name.toUpperCase()) ||
                                  "--"}
                              </td>
                              <td>
                                {acounts?.demateUserName}
                                  
                                
                              </td>
                              <td>
                                {(acounts?.sponserName &&
                                  acounts.sponserName.toUpperCase()) ||
                                  "--"}
                              </td>
                          
                             
                              <td>{acounts?.email || "--"}</td>
                              <td>{acounts?.phone || "--"}</td>
                              <td>
      {acounts?.status === "pending" && (
        <span className="badge bg-danger rounded-3 fw-semibold">Pending</span>
      )}
      </td>
                           
    

{/* 
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
                              </td> */}
  
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
          <div className="me-2">
            {/* -------------------------pagination--------------------- */}

            {/* -------------------------pagination--------------------- */}
          </div>
        </div>
      </SlideMotion>
    </>
  )
}

export default Pendingaccounts
