import React, { useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import Loader from "../../../Components/Loader";
import { Pagination, Stack } from "@mui/material";
import { Button } from "react-bootstrap";
import { ApiCall } from "../../../Services/Api";
import { viewpoolUserUrl } from "../../../utils/Constants";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Automembers() {
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState("poolA");
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
    pool: isClicked,
  });
  const [memebers, setMemebers] = useState({});
  console.log(memebers, "memebers");
  const [totalPages, setTotalPages] = useState(1);
  console.log(totalPages, "pages......sdsd.wewewewew.");
const navigate=useNavigate()
  const startIndex = (params.page - 1) * params.pageSize;

  const handleClick = (clickedPool) => {
    setIsClicked(clickedPool);
    setParams((prevState) => ({
      ...prevState,
      pool: clickedPool,
    }));
  };

  const viewPoolUser = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", viewpoolUserUrl, {}, params);
      console.log(response, "response");
      if (response?.status === 200) {
        setMemebers(response?.data?.poolUsers);
        setTotalPages(response?.data?.pagination?.totalPages);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("An error occurred while fetching user details", error);
    }
  };
  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };
  useEffect(() => {
    viewPoolUser();
  }, [params]);

  return (
    <>
      <SlideMotion>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 col-md-2  mt-2">
              <button
                type="button"
                className={`btn custom-btn ${isClicked ? "clicked" : ""}`}
                onClick={() => handleClick("poolA")}
                style={
                  isClicked === "poolA"
                    ? {
                        backgroundColor: "#00335B",
                        color: "#ffffff",
                        width: "150px",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        color: "#00335B",
                        width: "150px",
                      }
                }
              >
                A
              </button>{" "}
            </div>
            <div className="col-6 col-md-2 mt-2">
              <button
                type="button"
                className={`btn custom-btn ${isClicked ? "clicked" : ""}`}
                onClick={() => handleClick("poolB")}
                style={
                  isClicked === "poolB"
                    ? {
                        backgroundColor: "#00335B",
                        color: "#ffffff",
                        width: "150px",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        color: "#00335B",
                        width: "150px",
                      }
                }
              >
                B
              </button>
            </div>
            <div className="col-6 col-md-2  mt-2">
              <button
                type="button"
                className={`btn custom-btn ${isClicked ? "clicked" : ""}`}
                onClick={() => handleClick("poolC")}
                style={
                  isClicked === "poolC"
                    ? {
                        backgroundColor: "#00335B",
                        color: "#ffffff",
                        width: "150px",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        color: "#00335B",
                        width: "150px",
                      }
                }
              >
                C
              </button>{" "}
            </div>
            <div className="col-6 col-md-2  mt-2">
              <button
                type="button"
                className={`btn custom-btn ${isClicked ? "clicked" : ""}`}
                onClick={() => handleClick("poolD")}
                style={
                  isClicked === "poolD"
                    ? {
                        backgroundColor: "#00335B",
                        color: "#ffffff",
                        width: "150px",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        color: "#00335B",
                        width: "150px",
                      }
                }
              >
                D
              </button>{" "}
            </div>
            <div className="col-6 col-md-2  mt-2">
              <button
                type="button"
                className={`btn custom-btn ${isClicked ? "clicked" : ""}`}
                onClick={() => handleClick("poolE")}
                style={
                  isClicked === "poolE"
                    ? {
                        backgroundColor: "#00335B",
                        color: "#ffffff",
                        width: "150px",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        color: "#00335B",
                        width: "150px",
                      }
                }
              >
                E
              </button>{" "}
            </div>
          </div>

          <div className="card w-100 position-relative overflow-hidden mt-5">
            {" "}
            <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
              <h5
                className="card-title fw-semibold mb-0 lh-sm px-0 mt-4"
                style={{ color: "#F7AE15" }}
              >
{isClicked.slice(0, 4).toUpperCase()} {isClicked.slice(4)} Members
              </h5>
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
                          <h6 className="fs-4 fw-semibold mb-0">User ID</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Name</h6>
                        </th>
  
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Sponsor Name</h6>
                        </th>
                     
                      
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">
                            Package Amount
                          </h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">
                             Type
                          </h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">
                            Franchise Name
                          </h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Status</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">View Details</h6>
                        </th>
                       
  
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {memebers?.length ? (
                        <>
                          {memebers.map((users, index) => (
                            console.log(users),
                            <tr key={index}>
                              <td>{startIndex + index + 1}</td>
                              <td>
                                {users?.createdAt
                                  ? moment(users.createdAt).format("DD/MM/YYYY")
                                  : "--"}
                              </td>
                              <td>{users?.ownSponserId || "--"}</td>
  
                              <td>
                                {(users?.name && users.name.toUpperCase()) ||
                                  "--"}
                              </td>
                              <td>
                                {(users?.sponserName &&
                                  users.sponserName.toUpperCase()) ||
                                  "--"}
                              </td>
  
                              {/* <td>{users?.phone || "--"}</td> */} 
                             
                              <td>{users?.packageAmount}</td>
                              <td>{users?.franchise || "--"}</td>
                              <td>{users?.franchiseName || "--"}</td>
                              <td>
                                {users?.userStatus === "readyToApprove" ? (
                                  <span className="badge bg-danger rounded-3 fw-semibold">
                                    Ready to Approve
                                  </span>
                                ) : users?.userStatus === "pending" ? (
                                  <span className="badge bg-warning rounded-3 fw-semibold">
                                    Pending
                                  </span>
                                ) : (
                                  <span className="badge bg-success rounded-3 fw-semibold">
                                    Approved
                                  </span>
                                )}
                              </td>
                              <td>
                                <i
                                  className="fas fa-eye"
                                  onClick={() =>
                                    navigate("/user/details", {
                                      state: { data: users?._id },
                                    })
                                  }
                                ></i>
                              </td>
                              <td>
                                {" "}
                              
                              </td>
                            
                             
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={20} style={{ textAlign: "center" }}>
                            <b>No Members Found</b>{" "}
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
        </div>
      </SlideMotion>
    </>
  );
}

export default Automembers;
