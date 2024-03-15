import React, { useEffect, useState } from 'react'
import { SlideMotion } from '../../../libs/FramerMotion'
import Loader from '../../../Components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { viewuserdownlineUrl } from '../../../utils/Constants';
import { ApiCall } from '../../../Services/Api';

function Viewtree() {
    const location = useLocation();
    const navigate =useNavigate();
    const { data } = location.state || {};
    const id = data;
    const [getUserDetails,setGetuserDetails]=useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userID,setUserID]=useState();
    const [userLevelID,setUserLevelID]=useState();


    //view downline
    const getUserdownline = async () => {
        setIsLoading(true);
        try {
            const response = await ApiCall("get", `${viewuserdownlineUrl}?id=${userLevelID||userID}`);
            console.log(response,"respones")
            if (response?.status === 200) {
                setGetuserDetails(response?.data?.child1);
            setIsLoading(false);
          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("An error occurred while fetching user details", error);
        }
      };
   
  



      useEffect(() => {
        if (id) {
            setUserID(id);
        }
        if (userID||userLevelID) {
            getUserdownline();
        }
    }, [id, userID,userLevelID]);
    
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
               Down Lines
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
                      <h6 className="fs-4 fw-semibold mb-0">Address</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Email</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Phone</h6>
                    </th>
                    <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Franchise Type
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Franchise Name
                        </h6>
                      </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Package Amount</h6>
                    </th>
                   
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Status</h6>
                    </th>
                 
                    <th>
                        <h6 className="fs-4 fw-semibold mb-0">View Tree</h6>
                      </th>
                  </tr>
                </thead>
                <tbody>
                  {getUserDetails?.length ? (
                    <>
                      {getUserDetails.map(
                        (downlines, index) => (
                          console.log(downlines, "45678"),
                          (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {(downlines?.name &&
                                  downlines.name.toUpperCase()) ||
                                  "--"}
                              </td>
                              <td>
                                {(downlines?.sponserName &&
                                  downlines.sponserName.toUpperCase()) ||
                                  "--"}
                              </td>
                              <td>{downlines?.address || "--"}</td>

                              <td>{downlines?.email || "--"}</td>
                              <td>{downlines?.phone || "--"}</td>
                              <td>{downlines?.franchise || "--"}</td>
                            <td>{downlines?.franchiseName || "--"}</td>
                              <td>{downlines?.packageAmount || "0"}</td>
                              <td>
                              {downlines?.userStatus === "readyToApprove" ? (
                                <span className="badge bg-danger rounded-3 fw-semibold">
                                  Ready to Approve
                                </span>
                              ) : downlines?.userStatus === "pending" ? (
                                <span className="badge bg-primary rounded-3 fw-semibold">
                                  Pending
                                </span>
                              ) : (
                                <span className="badge bg-success rounded-3 fw-semibold">
                                  Approved
                                </span>
                              )}
                            </td>
                            <td>
                              <button className="btn btn-custom "
                              onClick={() => {
                                setUserLevelID(downlines?._id);
                                setUserID('')

                            }}
                            
                              >
                                <i className="fas fa-sitemap"></i> View Tree
                              </button>
                            </td>
                          
       

                              
  
                            </tr>
                          )
                        )
                      )}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={20} style={{ textAlign: "center" }}>
                        <b>No Downline Found</b>{" "}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
            )}
        <div className="ms-2" style={{ marginTop: "-5px" }}>
    <button
        className=""
        onClick={() => {
            navigate(-1);
        }}
        style={{
            backgroundColor: "#00335B",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
        }}
    >
        {/* Icon */}
        <i className="fas fa-arrow-left" style={{ marginRight: "5px" }} />
        Back
    </button>
</div>

        </div>
      </SlideMotion>
    </>
  )
}

export default Viewtree