import React, { useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import Loader from "../../../Components/Loader";
import { useEffect } from "react";
import { renewalhistoryUrl } from "../../../utils/Constants";
import { Pagination, Stack } from "@mui/material";
import { ApiCall } from "../../../Services/Api";
import moment from "moment";

function Renewalhistory() {
  const [isLoading, setIsLoading] = useState(false);
  const [historyRenewalList, sethistoryRenewalList] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 20,
  });
  const [totalPages, setTotalPages] = useState(1);
  const startIndex = (params.page - 1) * params.pageSize;

  //------------get history------------
  const getRenewalHistory = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", renewalhistoryUrl, {}, params);
      if (response.status === 200) {
        sethistoryRenewalList(response?.data?.allSubscriptionHistory);
        setTotalPages(response?.data?.pagination?.totalPages);

        setIsLoading(false);
      } else {
        console.error(
          "Error fetching  renewals history list. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching history list:", error);
    }
  };
  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };

  useEffect(() => {
    getRenewalHistory();
  }, [params]);
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
              Subscription History
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
                        <h6 className="fs-4 fw-semibold mb-0">Action</h6>
                      </th>

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Package Amount
                        </h6>
                      </th>

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Pending Packages
                        </h6>
                      </th>

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Status </h6>
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {historyRenewalList?.length ? (
                      <>
                        {historyRenewalList.map((history, index) => (
                          <tr key={index}>
                            <td>{startIndex + index + 1}</td>
                            <td>
                              {history?.createdAt
                                ? moment(history.createdAt).format(
                                    "DD/MM/YYYY, HH:mm A"
                                  )
                                : "--"}
                            </td>

                            <td>
                              {(history?.name && history.name.toUpperCase()) ||
                                "--"}
                            </td>
                            <td>
                              <span className="badge bg-danger rounded-3 fw-semibold">
                                {(history?.action &&
                                  history.action.toUpperCase()) ||
                                  "--"}
                              </span>
                            </td>

                            <td>{history?.amount || "--"}</td>
                            <td>{history?.pendingPackage || "--"}</td>
                            <td>
                              {history?.status === "Rejected" ? (
                                <span className="badge bg-danger rounded-3 fw-semibold">
                                Rejected
                                </span>
                              ) : history?.status === "Approved" ? (
                                <span className="badge bg-success rounded-3 fw-semibold">
                                  Approved
                                </span>
                              ) : null}
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
    </>
  );
}

export default Renewalhistory;
