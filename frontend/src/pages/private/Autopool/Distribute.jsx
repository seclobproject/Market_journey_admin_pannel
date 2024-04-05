import React, { useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import ModalComponent from "../../../Components/ModalComponet";
import { Form } from "react-bootstrap";
import {
  adminProfileUrl,
  distributeWalletUrl,
  editpoolPercentageUrl,
} from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";
import { useContext } from "react";
import { ContextData } from "../../../Services/Context";
import { Show_Toast } from "../../../utils/Toastify";
import Loader from "../../../Components/Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Distribute() {
  const navigate = useNavigate();
  const [percentageModal, setPercentageModal] = useState({
    show: false,
    id: null,
  });
  const [confirmationModal, setConfirmationModal] = useState({
    show: false,
    id: null,
  });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [details, setDetails] = useState({});
  const [count, setCount] = useState({});

  console.log(details, "details.....");

  const [distributionHistory, setDistributionHistory] = useState({});
  console.log(distributionHistory, "distributionHistory.....dsdsdsdsd");

  console.log(details);
  const [poolPercentage, setPoolPercentage] = useState({});
  const [totalPercentage, setTotalPercentage] = useState();
  console.log(totalPercentage, "totalPercentage.....dsdsdsdsd");

  console.log(details, "details");
 

  const getAdminprofile = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", adminProfileUrl);
      console.log(response, "response.....");
      if (response?.status === 200 || 201) {
        setDetails(response?.data?.admin);
        setCount(response?.data);
        setDistributionHistory(
          response?.data?.admin?.autoPoolDistributionHistory
        );
        setIsLoading(false);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("An error occurred while fetching user details", error);
    }
  };

  //-----update pool percentage
  const updatePercentage = async () => {
    try {
      setLoading(true);
      const totalValue =
        (parseInt(poolPercentage?.autoPoolPercentageA) || 0) +
        (parseInt(poolPercentage?.autoPoolPercentageB) || 0) +
        (parseInt(poolPercentage?.autoPoolPercentageC) || 0) +
        (parseInt(poolPercentage?.autoPoolPercentageD) || 0) +
        (parseInt(poolPercentage?.autoPoolPercentageE) || 0);

      console.log(totalValue, "value..........");

      if (totalValue !== 100) {
        Show_Toast("The total percentage should be exactly 100");
        setLoading(false);
      } else {
        const response = await ApiCall(
          "post",
          editpoolPercentageUrl,
          poolPercentage
        );
        console.log(response, "response....");
        if (response?.status === 200) {
          Show_Toast("Pool percentage is updated successfully", true);
          setLoading(false);
          setValidated(false);
          setPercentageModal(false);

          getAdminprofile();
        }
      }
    } catch (error) {
      console.error("Error updating pool percentage:", error);
    }
  };

  const calculateTotalValues = (e) => {
    setPoolPercentage({ ...poolPercentage, [e.target.name]: e.target.value });
    console.log("working percentage");
    const totalValues =
      (parseInt(poolPercentage?.autoPoolPercentageA) || 0) +
      (parseInt(poolPercentage?.autoPoolPercentageB) || 0) +
      (parseInt(poolPercentage?.autoPoolPercentageC) || 0) +
      (parseInt(poolPercentage?.autoPoolPercentageD) || 0) +
      (parseInt(poolPercentage?.autoPoolPercentageE) || 0);
    console.log(totalValues, "valuesssss......");
    setTotalPercentage(totalValues);
  };

  const distributeWalet = async () => {
    try {
      const resposne = await ApiCall("post", distributeWalletUrl);
      console.log(resposne, "resposne");
      if (resposne.status === 200) {
        Show_Toast("Autopool wallet distributed successfully", true);
        setConfirmationModal(false);
        getAdminprofile();
      } else {
        Show_Toast("Failed to distribute", false);
      }
    } catch (error) {
      {
        console.error("failed:", error);
        Show_Toast(error, false);
      }
    }
  };
  useEffect(() => {
    getAdminprofile();
  }, []);
  return (
    <>
      <SlideMotion>
        <div className="container-fluid">
          <div class="row mt-2">
            <div className="col-md-3 mb-2">
              <div
                className="card"
                style={{ background: "#00335B", height: "325px" }}
              >
                <div className="card-body ">
                  <h5
                    className="card-title mb-3 fw-semibold"
                    style={{ color: "white" }}
                  >
                    Autopool Wallet
                  </h5>
                  <img
                    className="mb-3"
                    src="/dist/images/Total.svg"
                    alt="rupee"
                  />
                  <h4
                    className="fw-semibold mb-0 mt-2"
                    style={{ color: "rgb(247, 174, 21)" }}
                  >
                    {details?.autoPoolWallet}
                  </h4>
                  <div className="col-12 mt-5">
                    <div className="row">
                      <div className="col-6 ">
                        <button
                          type="submit"
                          className="btn btn-warning"
                          onClick={() => {
                            setConfirmationModal({
                              show: true,
                              id: null,
                              amount: details?.autoPoolWallet,
                            });
                          }}
                        >
                          Distribute
                        </button>
                      </div>
                      <div className="col-6 ">
                        <button
                          type="submit"
                          className="btn btn-warning"
                          onClick={() =>
                            navigate("/autopool/members", {
                              // state: { data: users?._id },
                            })
                          }
                        >
                          View Members
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-9 ">
  <div className="card" style={{ background: "#00335B" }}>
    <div className="row align-items-center p-4 text-center"> {/* Added text-center class */}
      <div className="d-flex align-items-center">
        <h5
          className="card-title mb-0 fw-semibold"
          style={{ color: "white" }}
        >
          Pool Percentage
        </h5>
        <button
          onClick={() => {
            setPercentageModal({ show: true, id: null });
            setValidated(false);
            setPoolPercentage({
              ...poolPercentage,
              autoPoolPercentageA: details?.autoPoolPercentageA,
              autoPoolPercentageB: details?.autoPoolPercentageB,
              autoPoolPercentageC: details?.autoPoolPercentageC,
              autoPoolPercentageD: details?.autoPoolPercentageD,
              autoPoolPercentageE: details?.autoPoolPercentageE,
            });
            calculateTotalValues();
          }}
          className="btn btn-link"
          style={{ color: "rgb(247, 174, 21)" }}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>

      <div className="col d-flex align-items-center">
      <div className="row mb-3">
                      <div className="col-2 mb-2" style={{ width: "150px" }}>
                        <div className="me-2">
                          <div
                            className="mb-3"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <h6
                              className="mb-3"
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Pool
                            </h6>
                            <div
                              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                              style={{ width: "30px", height: "30px" }}
                            >
                              <span className="text-uppercase">A</span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <h6
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Percentage
                            </h6>
                            <span
                              className="form-control"
                              style={{ background: "#ffff" }}
                            >
                              {details?.autoPoolPercentageA + "%"}
                            </span>
                          </div>
                          <div>
                            <h6
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Members
                            </h6>
                            <span
                              className="form-control"
                              style={{ background: "#ffff" }}
                            >
                              {count?.countInPoolA}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-2  mb-2" style={{ width: "150px" }}>
                        <div className="me-2">
                          <div
                            className="mb-3"
                            style={{
                              alignItems: "center",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <h6
                              className="mb-3"
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Pool
                            </h6>
                            <div
                              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                              style={{ width: "30px", height: "30px" }}
                            >
                              <span className="text-uppercase">B</span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <h6
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Percentage
                            </h6>
                            <span
                              className="form-control"
                              style={{ background: "#ffff" }}
                            >
                              {details?.autoPoolPercentageB + "%"}
                            </span>
                          </div>
                          <div>
                            <h6
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Members
                            </h6>
                            <span
                              className="form-control"
                              style={{ background: "#ffff" }}
                            >
                              {count?.countInPoolB}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-2  mb-2" style={{ width: "150px" }}>
                        <div className="me-2">
                          <div
                            className="mb-3"
                            style={{
                              alignItems: "center",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <h6
                              className="mb-3"
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Pool
                            </h6>
                            <div
                              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                              style={{ width: "30px", height: "30px" }}
                            >
                              <span className="text-uppercase">C</span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <h6
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Percentage
                            </h6>
                            <span
                              className="form-control"
                              style={{ background: "#ffff" }}
                            >
                              {details?.autoPoolPercentageC + "%"}
                            </span>
                          </div>
                          <div>
                            <h6
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Members
                            </h6>
                            <span
                              className="form-control"
                              style={{ background: "#ffff" }}
                            >
                              {count?.countInPoolC}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-2  mb-2" style={{ width: "150px" }}>
                        <div className="me-2">
                          <div
                            className="mb-3"
                            style={{
                              alignItems: "center",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <h6
                              className="mb-3"
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Pool
                            </h6>
                            <div
                              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                              style={{ width: "30px", height: "30px" }}
                            >
                              <span className="text-uppercase">D</span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <h6
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Percentage
                            </h6>
                            <span
                              className="form-control"
                              style={{ background: "#ffff" }}
                            >
                              {details?.autoPoolPercentageD + "%"}
                            </span>
                          </div>
                          <div>
                            <h6
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Members
                            </h6>
                            <span
                              className="form-control"
                              style={{ background: "#ffff" }}
                            >
                              {count?.countInPoolD}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-3  mb-2" style={{ width: "150px" }}>
                        <div className="me-2">
                          <div
                            className="mb-3"
                            style={{
                              alignItems: "center",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <h6
                              className="mb-3"
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Pool
                            </h6>
                            <div
                              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                              style={{ width: "30px", height: "30px" }}
                            >
                              <span className="text-uppercase">E</span>
                            </div>
                          </div>
                          <div
                            className="mb-3"
                            style={{
                              alignItems: "center",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <h6
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Percentage
                            </h6>
                            <span
                              className="form-control"
                              style={{ background: "#ffff" }}
                            >
                              {details?.autoPoolPercentageE + "%"}
                            </span>
                          </div>
                          <div>
                            <h6
                              style={{ color: "#ffae1f", marginBottom: "5px" }}
                            >
                              Members
                            </h6>
                            <span
                              className="form-control"
                              style={{ background: "#ffff" }}
                            >
                              {count?.countInPoolE}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
      </div>
    </div>
  </div>
</div>

         
          </div>
        </div>
        <div className="card position-relative overflow-hidden">
          <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
            <h5
              className="card-title fw-semibold mb-0 lh-sm px-0 mt-3"
              style={{ color: "#F7AE15" }}
            >
              Distribute History
            </h5>

            <div></div>
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
                        <h6 className="fs-4 fw-semibold mb-0">
                          Distributed Amount
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Amount in pool A{" "}
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Memebers in pool A
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Amount in pool B
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Memebers in pool B
                        </h6>
                      </th>{" "}
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Amount in pool C
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Memebers in pool C
                        </h6>
                      </th>{" "}
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Amount in pool D
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Memebers in pool D
                        </h6>
                      </th>{" "}
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Amount in pool E
                        </h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Memebers in pool E
                        </h6>
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {distributionHistory?.length ? (
                      <>
                        {distributionHistory.map(
                          (history, index) => (
                            console.log(history, "history"),
                            (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {history?.createdAt
                                    ? moment(history.createdAt).format(
                                        "DD/MM/YYYY"
                                      )
                                    : "--"}
                                </td>
                                <td>{history?.distributedAmount}</td>
                                <td>{history?.amountpoolA}</td>
                                <td>{history?.countInPoolA}</td>
                                <td>{history?.amountpoolB}</td>
                                <td>{history?.countInPoolB}</td>
                                <td>{history?.amountpoolC}</td>
                                <td>{history?.countInPoolC}</td>
                                <td>{history?.amountpoolD}</td>
                                <td>{history?.countInPoolD}</td>
                                <td>{history?.amountpoolE}</td>
                                <td>{history?.countInPoolE}</td>
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
        </div>
      </SlideMotion>
      {/* update  percentage */}
      <ModalComponent
        show={percentageModal.show}
        onHide={() => {
          setPercentageModal({ show: false, id: null });
        }}
        title={<h5 style={{ color: "#F7AE15", margin: 0 }}>Add Percentage</h5>}
        centered
        width={"500px"}
      >
        {totalPercentage}
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => Check_Validation(e, updatePercentage, setValidated)}
        >
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Team Leader - (A)
            </label>
            <input
              type="number"
              required
              name="autoPoolPercentageA"
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter percentage"
              value={poolPercentage?.autoPoolPercentageA}
              onChange={calculateTotalValues}
            />

            <Form.Control.Feedback type="invalid">
              Please enter pool A percentage.
            </Form.Control.Feedback>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Business Development Manager - (B)
            </label>
            <input
              required
              type="number"
              name="autoPoolPercentageB"
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter percentage"
              value={poolPercentage?.autoPoolPercentageB}
              onChange={calculateTotalValues}
            />

            <Form.Control.Feedback type="invalid">
              Please enter pool B percentage.
            </Form.Control.Feedback>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Regional Manager - (C)
            </label>
            <input
              required
              type="number"
              name="autoPoolPercentageC"
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter percentage"
              value={poolPercentage?.autoPoolPercentageC}
              onChange={calculateTotalValues}
            />

            <Form.Control.Feedback type="invalid">
              Please enter pool C percentage.
            </Form.Control.Feedback>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Territory Manager - (D)
            </label>
            <input
              required
              type="number"
              name="autoPoolPercentageD"
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter percentage"
              value={poolPercentage?.autoPoolPercentageD}
              onChange={calculateTotalValues}
            />

            <Form.Control.Feedback type="invalid">
              Please enter pool D percentage.
            </Form.Control.Feedback>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Associate Direction - (E)
            </label>
            <input
              required
              type="number"
              id="packageAmountInput"
              name="autoPoolPercentageE"
              className="form-control form-control-lg"
              placeholder="Enter percentage"
              value={poolPercentage?.autoPoolPercentageE}
              onChange={calculateTotalValues}
            />

            <Form.Control.Feedback type="invalid">
              Please enter pool E percentage.
            </Form.Control.Feedback>
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-custom float-end ms-1">
              {loading ? "Updating..." : "Update"}{" "}
            </button>
          </div>
        </Form>
        <button
          className="btn btn-cancel float-end me-1"
          onClick={() => {
            setPercentageModal({ show: false, id: null });
          }}
        >
          Cancel
        </button>
      </ModalComponent>

      <ModalComponent
        show={confirmationModal.show}
        onHide={() => {
          setConfirmationModal({ show: false, id: null });
        }}
        centered
        width={"500px"}
      >
        <div className="modal-body">
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <i
                style={{ fontSize: "50px", color: "#fe9423" }}
                className="fa fa-exclamation-triangle "
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center ">
              <h5 className="">
                Are you sure you want to distribute{" "}
                <span style={{ color: "#fe9423" }}>
                  {confirmationModal?.amount}
                </span>
              </h5>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="col gap-3 d-flex justify-content-center">
            <button
              onClick={() => {
                setConfirmationModal({ show: false, id: null });
              }}
              type="button"
              className="btn btn-cancel"
              data-bs-dismiss="modal"
            >
              No, keep it
            </button>
            <button
              type="button"
              className="btn btn-custom text-white"
              onClick={() => {
                distributeWalet();
              }}
            >
              {/* Yes, {approveModal?.action === "approve" ? "Approve" : "Reject"}{" "} */}
              Yes, Distribute it
            </button>
          </div>
        </div>
      </ModalComponent>
    </>
  );
}

export default Distribute;
