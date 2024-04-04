import React, { useEffect, useState } from 'react'
import { SlideMotion } from '../../../libs/FramerMotion';
import Loader from '../../../Components/Loader';
import { ApiCall } from '../../../Services/Api';
import { viewautopoolhistoryUrl } from '../../../utils/Constants';
import moment from 'moment';
import { Pagination, Stack } from '@mui/material';

function Withdraw() {
  const [isLoading, setIsLoading] = useState(false);
  const [getHistory, setGetHistory] = useState([]);
  console.log(getHistory, "getHistory,,,,,,,,,,,,,,,,,,,,,,,,,,");
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  console.log(totalPages, "pages......sdsd.wewewewew.");

  const startIndex = (params.page - 1) * params.pageSize;


  const getAutopoolHistory = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", viewautopoolhistoryUrl, {}, params);
      console.log(response, "response");
      if (response?.status === 200) {
        setGetHistory(response?.data?.levelIncome);
        setTotalPages(response?.data?.pagination?.totalPages);
        console.log(response?.data?.pagination?.totalPages);
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
    getAutopoolHistory();
  }, [params]);
  return (
    <>
      <SlideMotion>
        <div className="container-fluid">
          
          <div className="card w-100 position-relative overflow-hidden">
            {" "}
            <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
              <h5
                className="card-title fw-semibold mb-0 lh-sm px-0 mt-4"
                style={{ color: "#F7AE15" }}
              >
                Autopool Credit History
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
                          <h6 className="fs-4 fw-semibold mb-0">Type</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Franchise Name</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Report Name</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">
                            Amount Credited{" "}
                          </h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">
                            Percentage Credited
                          </h6>
                        </th>

                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {getHistory?.length ? (
                        <>
                          {getHistory.map(
                            (history, index) => (
                              console.log(history, "45678"),
                              (
                                <tr key={index}>
                                  <td>{startIndex + index + 1}</td>
                                  <td>
                                    {history?.createdAt
                                      ? moment(history.createdAt).format(
                                          "DD/MM/YYYY"
                                        )
                                      : "--"}
                                  </td>

                                  <td>
                                    {(history?.name &&
                                      history.name.toUpperCase()) ||
                                      "--"}
                                  </td>
                                  <td>{history?.franchise||"--"}</td>
                                  <td>{history?.franchiseName||"--"}</td>

                                  
                                  <td>{history?.reportName||"--"}</td>
                                  <td>{history?.amountCredited || "00"}</td>
                                  <td>{history?.percentageCredited || "0%"}</td>

                              
                             
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
        </div>
      </SlideMotion>
    </>
  )
}

export default Withdraw