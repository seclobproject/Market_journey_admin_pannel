import React, { useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import ModalComponent from "../../../Components/ModalComponet";
import { Form } from "react-bootstrap";

function Distribute() {
  const [percentageModal, setPercentageModal] = useState({
    show: false,
    id: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [getHistory, setGetHistory] = useState([]);
  console.log(getHistory, "getHistory,,,,,,,,,,,,,,,,,,,,,,,,,,");
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  console.log(totalPages, "pages........");

  // const startIndex = (params.page - 1) * params.pageSize;

  //-----------------get individaul user data-----------
  // const getAutopoolHistory = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await ApiCall("get", viewautopoolhistoryUrl, {}, params);
  //     console.log(response, "response");
  //     if (response?.status === 200) {
  //       setGetHistory(response?.data?.levelIncome);
  //       setTotalPages(response?.data?.pagination);
  //       setIsLoading(false);
  //     } else {
  //       console.error("Failed to fetch user details");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while fetching user details", error);
  //   }
  // };
  // const handlePageChange = (event, newPage) => {
  //   setParams((prevParams) => ({
  //     ...prevParams,
  //     page: newPage,
  //   }));
  // };
  // useEffect(() => {
  //   getAutopoolHistory();
  // }, [params]);

  return (
    <>
      <SlideMotion>
        <div className="container-fluid">
          <div class="row mt-2">
          <div className="col-md-3 mb-2">
  <div className="card" style={{ background: "#00335B" }}>
    <div className="card-body ">
      <h5 className="card-title mb-3 fw-semibold" style={{ color: "white" }}>
        Autopool Wallet
      </h5>
      <img className="mb-3" src="/dist/images/Total.svg" alt="rupee" />
      <h4 className="fw-semibold mb-0" style={{ color: "rgb(247, 174, 21)" }}>
        8000000
      </h4>
    </div>
  </div>
</div>



            <div class="col-md-9 mb-2">
              <div
                class="card"
                style={{ background: "#00335B", height: "100%" }}
              >
                <div className="row align-items-center p-4">
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
                        // setAddAlerts(alert);
                      }}
                      className="btn btn-link"
                      style={{ color: "rgb(247, 174, 21)" }}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                  </div>

                  <div className="col d-flex align-items-center">
                    <div className="me-2">
                      <div
                        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mb-2"
                        style={{ width: "30px", height: "30px" }}
                      >
                        <i className="fas fa-font"></i>
                      </div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="%"
                        style={{ background: "#ffff" }}
                      />
                    </div>
                    <div className="me-2">
                      <div
                        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mb-2"
                        style={{ width: "30px", height: "30px" }}
                      >
                        <i class="fa-solid fa-b"></i>{" "}
                      </div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="%"
                        style={{ background: "#ffff" }}
                      />
                    </div>
                    <div className="me-2">
                      <div
                        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mb-2"
                        style={{ width: "30px", height: "30px" }}
                      >
                        <i class="fa-solid fa-c"></i>{" "}
                      </div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="%"
                        style={{ background: "#ffff" }}
                      />
                    </div>
                    <div className="me-2">
                      <div
                        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mb-2"
                        style={{ width: "30px", height: "30px" }}
                      >
                        <i class="fa-solid fa-d"></i>{" "}
                      </div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="%"
                        style={{ background: "#ffff" }}
                      />
                    </div>
                    <div className="me-2">
                      <div
                        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mb-2"
                        style={{ width: "30px", height: "30px" }}
                      >
                        <i class="fa-solid fa-e"></i>{" "}
                      </div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="%"
                        style={{ background: "#ffff" }}
                      />
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                  <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-warning">
                        Distribute
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-2 mb-2">
              <div
                class="card "
                style={{ background: "#00335B", height: "100%" }}
              >
                <div className="row align-items-center  p-4">
                  <div className="col-8">
                    <h5
                      className="card-title mb-9 fw-semibold"
                      style={{ color: "white" }}
                    >
                      Autopool Wallet
                    </h5>
                    <div className="d-flex align-items-center mb-3">
                      <h4
                        className="fw-semibold mb-3"
                        style={{ color: "rgb(247, 174, 21)" }}
                      >
                        8000000
                      </h4>
                    </div>
                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-warning">
                        Distribute
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-2 mb-2">
              <div
                class="card "
                style={{ background: "#00335B", height: "100%",overflow: "hidden"  }}
              >
                <div className="row align-items-center  p-4">
                  <div className="col-8">
                    <h5
                      className="card-title mb-9 fw-semibold"
                      style={{ color: "white" }}
                    >
                      Autopool Wallet
                    </h5>
                    <div className="d-flex align-items-center mb-3">
                      <h4
                        className="fw-semibold mb-3"
                        style={{ color: "rgb(247, 174, 21)" }}
                      >
                        8000000
                      </h4>
                    </div>
                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-warning">
                        Distribute
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-2 mb-2">
              <div
                class="card "
                style={{ background: "#00335B", height: "100%",overflow: "hidden"  }}
              >
                <div className="row align-items-center  p-4">
                  <div className="col-8">
                    <h5
                      className="card-title mb-9 fw-semibold"
                      style={{ color: "white" }}
                    >
                      Autopool Wallet
                    </h5>
                    <div className="d-flex align-items-center mb-3">
                      <h4
                        className="fw-semibold mb-3"
                        style={{ color: "rgb(247, 174, 21)" }}
                      >
                        8000000
                      </h4>
                    </div>
                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-warning">
                        Distribute
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          

            
          </div>
        </div>
      </SlideMotion>

      <ModalComponent
        show={percentageModal.show}
        onHide={() => {
          setPercentageModal({ show: false, id: null });
        }}
        title={<h5 style={{ color: "#F7AE15", margin: 0 }}>Add Percentage</h5>}
        centered
        width={"500px"}
      >
        <Form
        // noValidate
        // validated={validated}
        // onSubmit={(e) => Check_Validation(e, addAlertsFun, setValidated)}
        >
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Team Leader - (A)
            </label>
            <input
              type="number"
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter percentage"
              // value={addAlerts?.description}
              // onChange={(e) => {
              //   setAddAlerts({
              //     ...addAlerts,
              //     description: e.target.value,
              //   });
              // }}
              // required
            />

            <Form.Control.Feedback type="invalid">
              Please enter alert content.
            </Form.Control.Feedback>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Business Development Manager - (B)
            </label>
            <input
              type="number"
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter percentage"
              // value={addAlerts?.description}
              // onChange={(e) => {
              //   setAddAlerts({
              //     ...addAlerts,
              //     description: e.target.value,
              //   });
              // }}
              // required
            />

            <Form.Control.Feedback type="invalid">
              Please enter alert content.
            </Form.Control.Feedback>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Business Development Manager - (C)
            </label>
            <input
              type="number"
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter percentage"
              // value={addAlerts?.description}
              // onChange={(e) => {
              //   setAddAlerts({
              //     ...addAlerts,
              //     description: e.target.value,
              //   });
              // }}
              // required
            />

            <Form.Control.Feedback type="invalid">
              Please enter alert content.
            </Form.Control.Feedback>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
            Regional Manager - (C)
            </label>
            <input
              type="number"
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter percentage"
              // value={addAlerts?.description}
              // onChange={(e) => {
              //   setAddAlerts({
              //     ...addAlerts,
              //     description: e.target.value,
              //   });
              // }}
              // required
            />

            <Form.Control.Feedback type="invalid">
              Please enter alert content.
            </Form.Control.Feedback>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
            Territory Manager - (D)
            </label>
            <input
              type="number"
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter percentage"
              // value={addAlerts?.description}
              // onChange={(e) => {
              //   setAddAlerts({
              //     ...addAlerts,
              //     description: e.target.value,
              //   });
              // }}
              // required
            />

            <Form.Control.Feedback type="invalid">
              Please enter alert content.
            </Form.Control.Feedback>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
            Associate Direction - (E)
            </label>
            <input
              type="number"
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter percentage"
              // value={addAlerts?.description}
              // onChange={(e) => {
              //   setAddAlerts({
              //     ...addAlerts,
              //     description: e.target.value,
              //   });
              // }}
              // required
            />

            <Form.Control.Feedback type="invalid">
              Please enter alert content.
            </Form.Control.Feedback>
          </div>
         
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-custom float-end ms-1">
              {/* {addAlerts?._id ? "Update" : "Save"} */}
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
    </>
  );
}

export default Distribute;
