import React, { useEffect, useState } from "react";
import { SlideMotion } from "../../libs/FramerMotion";
import { RiseOutlined } from "@ant-design/icons";
import { ApiCall } from "../../Services/Api";
import { dashboardUrl } from "../../utils/Constants";
import Loader from "../../Components/Loader";

function Home() {
  const [dashboardData, setDashboard] = useState([]);
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

  useEffect(() => {
    getdashBoardData();
  }, []);
  return (
    <>
      <div className="mt-5" style={{ alignItems: "center" }}>
        {isLoading ? (
          <Loader />
        ) : (
          <SlideMotion>
            <div className="container-fluid">
              <div class="row">
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card" style={{ background: "#0F1535" }}>
                    <div className="row align-items-center p-4">
                      <div className="">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Total Wallet
                          <RiseOutlined style={{ fontSize: "30px",marginLeft: "10px", marginRight: "10px", color: "#89BE1D" }} />

                        </h5>
                       
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-0"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            <span style={{ color: "green" }}>₹ </span>
                            {dashboardData?.totalWalletAmount && dashboardData.totalWalletAmount.toFixed(2)}
                          </h4>
                     
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card" style={{ background: "#0F1535" }}>
                    <div className="row align-items-center p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Total Withdraw
                          <RiseOutlined style={{ fontSize: "30px", marginLeft: "10px",marginRight: "10px", color: "#89BE1D" }} />

                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-0"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            <span style={{ color: "green" }}>₹ </span>
                            {dashboardData?.totalWithdrawAmount &&
                              dashboardData?.totalWithdrawAmount.toFixed(2)}
                          </h4>
                       
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card" style={{ background: "#0F1535" }}>
                    <div className="row align-items-center p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Total Credited
                          <RiseOutlined style={{ fontSize: "30px",marginLeft: "10px", marginRight: "10px", color: "#89BE1D" }} />

                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-0"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            <span style={{ color: "green" }}>₹ </span>
                            {dashboardData?.totalPaidForCompany &&
                              dashboardData?.totalPaidForCompany.toFixed(2)}
                          </h4>
                      
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card" style={{ background: "#0F1535" }}>
                    <div className="row align-items-center p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Total Profit{" "}
                          <RiseOutlined style={{ fontSize: "30px",marginLeft: "10px", marginRight: "10px", color: "#89BE1D" }} />

                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-0"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            {dashboardData?.totalProfit &&
                              dashboardData?.totalProfit.toFixed(2)}
                          </h4>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card" style={{ background: "#0F1535" }}>
                    <div className="row align-items-center p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Total Packages
                          <RiseOutlined style={{ fontSize: "30px",marginLeft: "10px", marginRight: "10px", color: "#89BE1D" }} />

                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-0"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            {dashboardData?.totalPackages}
                          </h4>
                     
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card" style={{ background: "#0F1535" }}>
                    <div className="row align-items-center p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Total Users
                          <RiseOutlined style={{ fontSize: "30px", marginLeft: "10px",marginRight: "10px", color: "#89BE1D" }} />

                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-0"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            {dashboardData?.totalUsersCount}
                          </h4>
                      
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card" style={{ background: "#0F1535" }}>
                    <div className="row align-items-center p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Total Waiting Users
                          <RiseOutlined style={{ fontSize: "30px",marginLeft: "10px", marginRight: "10px", color: "#89BE1D" }} />

                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-0"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            {dashboardData?.readyToApproveCount}
                          </h4>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card" style={{ background: "#0F1535" }}>
                    <div className="row align-items-center p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Total approved users
                          <RiseOutlined style={{ fontSize: "30px",marginLeft: "10px", marginRight: "10px", color: "#89BE1D" }} />

                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-0"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            {dashboardData?.approvedUsersCount}
                          </h4>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card" style={{ background: "#0F1535" }}>
                    <div className="row align-items-center p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Total pending users
                          <RiseOutlined style={{ fontSize: "30px", marginLeft: "10px",marginRight: "10px", color: "#89BE1D" }} />

                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-0"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            {dashboardData?.pendingUsersCount}
                          </h4>
                       
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card" style={{ background: "#0F1535" }}>
                    <div className="row align-items-center p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Latest Pool Share
                          <RiseOutlined style={{ fontSize: "30px", marginRight: "10px",marginLeft: "10px", color: "#89BE1D" }} />

                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-0"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            {dashboardData?.latestPoolShare &&
                              dashboardData?.latestPoolShare.toFixed(2)}
                          </h4>
                        
                  
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card" style={{ background: "#0F1535" }}>
                    <div className="row align-items-center p-4">
                      <div className="col-8">
                        <h5
                          className="card-title mb-9 fw-semibold"
                          style={{ color: "white" }}
                        >
                          Total Pool Share
                          <RiseOutlined style={{ fontSize: "30px", marginRight: "10px",marginLeft: "10px", color: "#89BE1D" }} />

                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4
                            className="fw-semibold mb-0"
                            style={{ color: "rgb(247, 174, 21)" }}
                          >
                            {dashboardData?.totalPoolShare &&
                              dashboardData?.totalPoolShare.toFixed(2)}
                          </h4>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

       
            </div>
          </SlideMotion>
        )}
      </div>
    </>
  );
}

export default Home;
