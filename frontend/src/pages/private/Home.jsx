import React, { useEffect, useState } from "react";
import { SlideMotion } from "../../libs/FramerMotion";
import { RiseOutlined } from '@ant-design/icons';
import { ApiCall } from "../../Services/Api";
import { dashboardUrl } from "../../utils/Constants";

function Home() {
  const [dashboardData,setDashboard]=useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getdashBoardData = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", dashboardUrl);
      if (response.status === 200) {
        setDashboard(response?.data);

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

useEffect(()=>{
getdashBoardData();
},[]);
  return (
    <>
    <SlideMotion>
    <div className="container-fluid">
      

  <div class="row">
  <div className="col-md-6 col-lg-3 mb-4">
      <div className="card" style={{ background: "#0F1535" }}>
        <div className="row align-items-center p-4">
          <div className="">
            <h5 className="card-title mb-9 fw-semibold" style={{ color: "white" }}>
              Total Wallet 
            </h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-semibold mb-0" style={{ color: "rgb(247, 174, 21)" }}>
              <span style={{ color: 'green' }}>₹ </span>{dashboardData?.totalWalletAmount}
              </h4>
              <RiseOutlined style={{ color: "#89BE1D", fontSize: "25px",alignItems:"flex-end",width:'50%',height:"100pxS" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card" style={{ background: "#0F1535" }}>
        <div className="row align-items-center p-4">
          <div className="col-8">
            <h5 className="card-title mb-9 fw-semibold" style={{ color: "white" }}>
              Total Withdraw 
            </h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-semibold mb-0" style={{ color: "rgb(247, 174, 21)" }}>
              <span style={{ color: 'green' }}>₹ </span>{dashboardData?.totalWithdrawAmount}
              </h4>
              <RiseOutlined style={{ color: "#89BE1D", fontSize: "25px",alignItems:"flex-end",width:'50%',height:"100pxS" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  <div className="col-md-6 col-lg-3 mb-4">
      <div className="card" style={{ background: "#0F1535" }}>
        <div className="row align-items-center p-4">
          <div className="col-8">
            <h5 className="card-title mb-9 fw-semibold" style={{ color: "white" }}>
              Total Credited 
            </h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-semibold mb-0" style={{ color: "rgb(247, 174, 21)" }}>
              <span style={{ color: 'green' }}>₹ </span>{dashboardData?.totalPaidForCompany}
              </h4>
              <RiseOutlined style={{ color: "#89BE1D", fontSize: "25px",alignItems:"flex-end",width:'50%',height:"100pxS" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card" style={{ background: "#0F1535" }}>
        <div className="row align-items-center p-4">
          <div className="col-8">
            <h5 className="card-title mb-9 fw-semibold" style={{ color: "white" }}>
              Total Users
            </h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-semibold mb-0" style={{ color: "rgb(247, 174, 21)" }}>
              {dashboardData?.totalUsersCount}
              </h4>
              <RiseOutlined style={{ color: "#89BE1D", fontSize: "25px",alignItems:"flex-end",width:'50%',height:"100pxS" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
   
  </div>
  <div class="row">
  <div className="col-md-6 col-lg-3 mb-4">
      <div className="card" style={{ background: "#0F1535" }}>
        <div className="row align-items-center p-4">
          <div className="col-8">
            <h5 className="card-title mb-9 fw-semibold" style={{ color: "white" }}>
              Total Waiting Users
            </h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-semibold mb-0" style={{ color: "rgb(247, 174, 21)" }}>
              {dashboardData?.readyToApproveCount}
              </h4>
              <RiseOutlined style={{ color: "#89BE1D", fontSize: "25px",alignItems:"flex-end",width:'50%',height:"100pxS" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card" style={{ background: "#0F1535" }}>
        <div className="row align-items-center p-4">
          <div className="col-8">
            <h5 className="card-title mb-9 fw-semibold" style={{ color: "white" }}>
              Total Packages
            </h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-semibold mb-0" style={{ color: "rgb(247, 174, 21)" }}>
              {dashboardData?.totalPackages}
              </h4>
              <RiseOutlined style={{ color: "#89BE1D", fontSize: "25px",alignItems:"flex-end",width:'50%',height:"100pxS" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  <div className="col-md-6 col-lg-3 mb-4">
      <div className="card" style={{ background: "#0F1535" }}>
        <div className="row align-items-center p-4">
          <div className="col-8">
            <h5 className="card-title mb-9 fw-semibold" style={{ color: "white" }}>
              Total approved users
            </h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-semibold mb-0" style={{ color: "rgb(247, 174, 21)" }}>
               {dashboardData?.approvedUsersCount
}
              </h4>
              <RiseOutlined style={{ color: "#89BE1D", fontSize: "25px",alignItems:"flex-end",width:'50%',height:"100pxS" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card" style={{ background: "#0F1535" }}>
        <div className="row align-items-center p-4">
          <div className="col-8">
            <h5 className="card-title mb-9 fw-semibold" style={{ color: "white" }}>
              Total pending users
            </h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-semibold mb-0" style={{ color: "rgb(247, 174, 21)" }}>
              {dashboardData?.pendingUsersCount}
              </h4>
              <RiseOutlined style={{ color: "#89BE1D", fontSize: "25px",alignItems:"flex-end",width:'50%',height:"100pxS" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
   
  </div>
  <div class="row">
  <div className="col-md-6 col-lg-3 mb-4">
      <div className="card" style={{ background: "#0F1535" }}>
        <div className="row align-items-center p-4">
          <div className="col-8">
            <h5 className="card-title mb-9 fw-semibold" style={{ color: "white" }}>
              Latest Pool Share
            </h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-semibold mb-0" style={{ color: "rgb(247, 174, 21)" }}>
              {dashboardData?.latestPoolShare}
              </h4>
              <RiseOutlined style={{ color: "#89BE1D", fontSize: "25px",alignItems:"flex-end",width:'50%',height:"100pxS" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card" style={{ background: "#0F1535" }}>
        <div className="row align-items-center p-4">
          <div className="col-8">
            <h5 className="card-title mb-9 fw-semibold" style={{ color: "white" }}>
               Total Pool Share
            </h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-semibold mb-0" style={{ color: "rgb(247, 174, 21)" }}>
              {dashboardData?.totalPoolShare}
              </h4>
              <RiseOutlined style={{ color: "#89BE1D", fontSize: "25px",alignItems:"flex-end",width:'50%',height:"100pxS" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  
   
  </div>



    


  
 




        {/* <div className="row">
    

          <div className="col-lg-12 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body p-4">
                <h5 className="card-title fw-semibold mb-4">
                  Recent withrawals
                </h5>
                <div className="table-responsive">
                  <table className="table text-nowrap mb-0 align-middle">
                    <thead className="text-dark fs-4">
                      <tr>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Id</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Assigned</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Name</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Priority</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Budget</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Accept Withraw</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Reject Withraw</h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">1</h6>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-1">Sunil Joshi</h6>
                          <span className="fw-normal">Web Designer</span>
                        </td>
                        <td className="border-bottom-0">
                          <p className="mb-0 fw-normal">Elite Admin</p>
                        </td>
                        <td className="border-bottom-0">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-primary rounded-3 fw-semibold">
                              Low
                            </span>
                          </div>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0 fs-4">$3.9</h6>
                        </td>
                        <td className="border-bottom-0">
                        <button
                                    className="btn btn-custom"
                                    // onClick={() =>
                                    //   setrejectModal({
                                    //     show: true,
                                    //     id: members._id,
                                    //   })
                                    // }
                                  >
                                    Accept
                                  </button>                        </td>
                        <td className="border-bottom-0">
                        <button
                                    className="btn btn-cancel"
                                    // onClick={() =>
                                    //   setrejectModal({
                                    //     show: true,
                                    //     id: members._id,
                                    //   })
                                    // }
                                  >
                                    Reject
                                  </button>                        </td>
                      </tr>
                   
                     
                   
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> */}
   
      </div>
    </SlideMotion>
     
    </>
  );
}

export default Home;
