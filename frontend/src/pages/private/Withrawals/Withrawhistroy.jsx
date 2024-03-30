import React, { useEffect, useState } from "react";
import Loader from "../../../Components/Loader";
import { SlideMotion } from "../../../libs/FramerMotion";
import { ApiCall } from "../../../Services/Api";
import { viewhistoryUrl } from "../../../utils/Constants";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";

function Withrawhistroy() {
  const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(1);

  const [viewHistory, setViewHistory] = useState([]);

  //-------View History-------------------
  const getHistory = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", viewhistoryUrl,{},params);
      console.log(response, "get");
      if (response.status === 200) {
        setViewHistory(response?.data?.allAddFundHistory);
        setTotalPages(response?.data?.pagination?.totalPages);

        setIsLoading(false);
      } else {
        console.error(
          "Error fetching history data. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };

  useEffect(() => {
    getHistory();
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
              Withraw History
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
                        <h6 className="fs-4 fw-semibold mb-0">Franchise Type</h6>
                      </th>
                 
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Requested Amount
</h6>
                      </th>
                 
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Released Amount</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                      Current Balance

                        </h6>
                      </th>
                      
                    

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Status</h6>
                      </th>
                    
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">View Details</h6>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {viewHistory?.length ? (
                    <>
                      {viewHistory.map(
                        (history, index) => (
                          (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{history?.createdAt ? moment(history.createdAt).format('DD/MM/YYYY') : "--"}</td>

                              <td>
                                {(history?.name &&
                                  history.name.toUpperCase()) ||
                                  "--"}
                              </td>
                              <td>
                                {(history?.franchise &&
                                  history.franchise.toUpperCase()) ||
                                  "--"}
                              </td>
                       
           
                              <td>{history?.requestedAmount || "0"}</td>
                              <td>{history?.releasedAmount || "0"}</td>
                              <td>{history?.newWalletAmount || "0"}</td>

                              <td>
  {history?.status === 'Approved' ? (
    <span className="badge bg-success rounded-3 fw-semibold">
      Approved
    </span>
  ) : (
    <span className="badge bg-danger rounded-3 fw-semibold">
      Rejected
    </span>
  )}
</td>


                 
                              <td>

<i className="fas fa-eye"    onClick={() =>   navigate('/user/details', { state: { data: history?._id } })}
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
    </>
  );
}

export default Withrawhistroy;
