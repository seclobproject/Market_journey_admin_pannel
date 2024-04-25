import React, { useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import Loader from "../../../Components/Loader";
import { ApiCall } from "../../../Services/Api";
import { addBonnusUrl, viewBonnusURL } from "../../../utils/Constants";
import moment from "moment";
import { Pagination, Stack } from "@mui/material";
import ModalComponent from "../../../Components/ModalComponet";

function Bonnushistory() {
  const [isLoading, setIsLoading] = useState(false);
  const [bonnusHistory, setbonnusHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });

  const startIndex = (params.page - 1) * params.pageSize;

  const getUserHistory = async () => {
    try {
      setIsLoading(true);

      const response = await ApiCall("get", viewBonnusURL, {}, params);
      if (response.status === 200) {
        setbonnusHistory(response?.data?.paidBonusHistory);
        setTotalPages(response?.data?.pagination?.totalPages);
        setIsLoading(false);
      } else {
        console.error(
          "Error fetching request data. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching user request:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };

  useEffect(() => {
    getUserHistory();
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
                        <h6 className="fs-4 fw-semibold mb-0">Date & Time</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">User ID</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Transaction Id
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Name</h6>
                      </th>

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Phone</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Bonnus Amount</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Description</h6>
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {bonnusHistory?.length ? (
                      <>
                        {bonnusHistory.map(
                          (histoty, index) => (
                            (
                              <tr key={index}>
                                <td>{startIndex + index + 1}</td>
                                <td>
                                  {histoty?.createdAt
                                    ? moment(histoty.createdAt).format(
                                      "DD/MM/YYYY , HH:mm A"
                                      )
                                    : "--"}
                                </td>
                                <td>{histoty?.userID || "--"}</td>

                                <td>{histoty?.transactionId || "--"}</td>

                                <td>
                                  {(histoty?.name &&
                                    histoty.name.toUpperCase()) ||
                                    "--"}
                                </td>

                                <td>{histoty?.phone || "--"}</td>

                                <td style={{ color: "red" }}>
                                  ₹{histoty?.bonusAmount || "--"}
                                </td>
                                <td>{histoty?.description || "--"}</td>
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
          {/* -------------------------pagination--------------------- */}
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

export default Bonnushistory;
