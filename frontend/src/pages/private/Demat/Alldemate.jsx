import React, { useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import Loader from "../../../Components/Loader";
import { Pagination, Stack } from "@mui/material";
import { viewapproveddemateUrl } from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";
import moment from "moment";

function Alldemate() {
  const [isLoading, setIsLoading] = useState(false);
  const [viewallDemat, setViewAllDemat] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const startIndex = (params.page - 1) * params.pageSize;

  //-----------list pending accounts--------
  const getAlldemat = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", viewapproveddemateUrl, {}, params);
      if (response.status === 200) {
        setViewAllDemat(response?.data?.approveDemats);
        setTotalPages(response?.data?.pagination?.totalPages);
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

  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };

  useEffect(() => {
    getAlldemat();
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
              All Demat Account
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
                        <h6 className="fs-4 fw-semibold mb-0">Address</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Status</h6>
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {viewallDemat?.length ? (
                      <>
                        {viewallDemat.map((acounts, index) => (
                          <tr key={index}>
                            <td>{startIndex + index + 1}</td>
                            <td>
                              {acounts?.createdAt
                                ? moment(acounts.createdAt).format("DD/MM/YYYY, HH:mm A")
                                : "--"}
                            </td>

                            <td>
                              {(acounts?.name && acounts.name.toUpperCase()) ||
                                "--"}
                            </td>
                            <td>{acounts?.demateUserName}</td>
                            <td>
                              {(acounts?.sponserName &&
                                acounts.sponserName.toUpperCase()) ||
                                "--"}
                            </td>
                            <td>{acounts?.email || "--"}</td>
                            <td>{acounts?.phone || "--"}</td>
                            <td>{acounts?.address || "--"}</td>

                            <td>
                              {acounts?.status === "approved" && (
                                <span className="badge bg-success rounded-3 fw-semibold">
                                  Approved
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={20} style={{ textAlign: "center" }}>
                          <b>No Accounts Found</b>{" "}
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

export default Alldemate;
