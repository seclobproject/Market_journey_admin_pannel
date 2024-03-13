import React, { useContext, useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toast";
import { SlideMotion } from "../../../libs/FramerMotion";
import Loader from "../../../Components/Loader";
import ModalComponent from "../../../Components/ModalComponet";
import { ContextData } from "../../../Services/Context";
import { Form } from "react-bootstrap";
import {
  addAwardUrl,
  deleteAwardUrl,
  editAwardUrl,
  viewAwardUrl,
} from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";

function Awards() {
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState({ show: false, id: null });
  const [addDetails, setAddDetails] = useState({});
  const [addImage, setAddImage] = useState({});
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [isLoading, setIsLoading] = useState(false);
  const [filename, setFileName] = useState({});
  const [viewImage, setViewImage] = useState({});
  const [awardDetails, setAwardDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setAddImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setViewImage({
          memberImage: reader.result,
        });
        setFileName({
          File: file.name, // Store the filename in the state
        });
      };
      reader.readAsDataURL(file);
    }
  };

  //-------Handle Cancel Image ----------
  const handleCancelName = () => {
    setViewImage((preViewImages) => ({
      ...preViewImages,
      memberImage: "",
    }));
    setFileName({
      memberImage: "",
    });
  };

  //-----------list  video--------
  const getAwardDetailsList = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", viewAwardUrl);

      if (response.status === 200) {
        setAwardDetails(response?.data?.awardData);
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
  //-------Image upload----------
  const addAwardFun = async (e) => {
    try {
      if (!filename?.name) {
        setErrorMessage("Please select an Image")
      }
      if (addDetails?._id) {
        const formData = new FormData();
        formData.append("memberImage", addImage, addImage?.name);
        formData.append("memberName", addDetails?.memberName);
        formData.append("achivedDetails", addDetails?.achivedDetails);

        const response = await ApiCall(
          "post",
          `${editAwardUrl}/${addDetails?._id}`,
          formData,
          "",
          "multipart/form-data"
        );
        if (response.status === 201 || response.status === 200) {
          setShowModal(false);
          setValidated(false);
          setViewImage("");
          setAddDetails("");
          setFileName("");
          getAwardDetailsList();

          Show_Toast("Details updated successfully", true);
        } else {
          Show_Toast("Details update failed", false);
        }
      } else {
        const formData = new FormData();
        formData.append("memberImage", addImage, addImage?.name);
        formData.append("memberName", addDetails?.memberName);
        formData.append("achivedDetails", addDetails?.achivedDetails);

        const response = await ApiCall(
          "post",
          addAwardUrl,
          formData,
          "",
          "multipart/form-data"
        );
        if (response.status === 201 || response.status === 200) {
          setShowModal(false);
          setValidated(false);
          setViewImage("");
          setAddDetails("");
          setFileName("");
          getAwardDetailsList();
          Show_Toast("Details uploaded successfully", true);
        } else {
          Show_Toast("Details upload failed", false);
        }
      }
    } catch (error) {
      console.error("Error uploading Video:", error);
      Show_Toast("Details upload failed", false);
    }
  };

  //----------delete image----------
  const deleteVideo = async () => {
    try {
      const response = await ApiCall(
        "post",
        `${deleteAwardUrl}/${addDetails._id}`
      );
      if (response?.status === 200) {
        Show_Toast(response?.data?.msg, true);
        setDeleteModal(false);
        getAwardDetailsList();
      } else {
        Show_Toast("Failed to delete video", false);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      Show_Toast("Failed to delete video. Please try again.", false);
    }
  };
  useEffect(() => {
    getAwardDetailsList();
  }, []);
  return (
    <>
      <SlideMotion>
        <div className="card w-100 position-relative overflow-hidden">
          {" "}
          <div className="px-4 py-3 border-bottom d-flex  align-items-center justify-content-between">
            <h5
              className="card-title fw-semibold mb-0  px-0 mt-3"
              style={{ color: "#F7AE15" }}
            >
              Awards & Rewards
            </h5>

            <div>
              <button
                className="btn btn-custom  ms-3 float-end"
                onClick={() => {
                  setShowModal({ show: true, id: null });
                  setValidated(false);
                  setViewImage("");
                  setAddDetails("");
                  setFileName("");
                  setErrorMessage("")
                }}
              >
                Add
              </button>
            </div>
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
                        <h6 className="fs-4 fw-semibold mb-0">Member Name</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">
                          Achived Details
                        </h6>
                      </th>

                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Image Amount</h6>
                      </th>
                      <th>
                        <h6 className="fs-4 fw-semibold mb-0">Actions </h6>
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {awardDetails?.length ? (
                      <>
                        {awardDetails.map((details, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>{details?.memberName || "--"}</td>
                            <td>{details?.achivedDetails || "--"}</td>

                            <td>
                              <img
                                alt="images"
                                src={`                                  http://192.168.29.152:8000/uploads/${details?.memberImage}
                                  `}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                              />
                            </td>

                            <td>
                              <a
                                className="dropdown-item d-flex align-items-center gap-3"
                                onClick={() => {
                                  setDeleteModal({ show: true, id: null });
                                  setAddDetails(details);
                                }}
                              >
                                <i
                                  className="fs-4 fas fa-trash-alt"
                                  style={{ color: "red" }}
                                />
                              </a>{" "}
                              <a
                                className="dropdown-item d-flex align-items-center gap-3"
                                onClick={() => {
                                  setShowModal({ show: true, id: null });
                                  setAddDetails(details);
                                  setAddImage(details);
                                }}
                              >
                                <i
                                  className="fs-4 fas fa-pencil-alt mt-2"
                                  style={{ color: "red" }}
                                ></i>
                              </a>
                            </td>
                            <td></td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={20} style={{ textAlign: "center" }}>
                          <b>No Details Found</b>{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <ModalComponent
          show={showModal.show}
          onHide={() => {
            setShowModal({ show: false, id: null });
          }}
          title={<h5 style={{ color: "#F7AE15", margin: 0 }}>Add Details</h5>}
          centered
          width={"500px"}
        >
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => Check_Validation(e, addAwardFun, setValidated)}
          >
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Member Name
              </label>
              <input
                type="text"
                id="packageAmountInput"
                className="form-control form-control-lg"
                placeholder="Enter user name"
                value={addDetails?.memberName}
                onChange={(e) => {
                  setAddDetails({
                    ...addDetails,
                    memberName: e.target.value,
                  });
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter member name.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Achived Detaills
              </label>
              <textarea
                style={{ height: "100px" }}
                id="packageAmountInput"
                className="form-control form-control-lg"
                placeholder="Enter achieved details"
                value={addDetails?.achivedDetails}
                onChange={(e) => {
                  setAddDetails({
                    ...addDetails,
                    achivedDetails: e.target.value,
                  });
                }}
                required
              />

              <Form.Control.Feedback type="invalid">
                Please enter details.
              </Form.Control.Feedback>
            </div>

            <div className="mb-4">
              <div className="col-6">
                <label htmlFor="fileInput" className="form-label">
                  Upload Thumbanil
                </label>
                <div className="d-flex flex-row align-items-center">
                  <label htmlFor="fileInput" className="upload-btn">
                    {viewImage?.memberImage || addDetails?.memberImage ? (
                      <img
                        src={
                          viewImage?.memberImage ||
                          `http://192.168.29.152:8000/uploads/${addDetails?.memberImage}`
                        }
                        alt="Preview"
                        style={{
                          width: "110px",
                          height: "110px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src="/public/dist/images/upload image.webp" // Replace with your default image path
                        alt="Default"
                        style={{
                          width: "110px",
                          height: "110px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleVideoChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <p style={{ overflow: "hidden" }} className="my-auto ml-3 mt-2">
                &nbsp;
                <span>
                  {filename?.File ? (
                    <>
                      {filename?.File}
                      <span
                        style={{
                          marginLeft: "5px",
                          cursor: "pointer",
                          color: "darkred",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleCancelName()}
                      >
                        &#x2715;{" "}
                      </span>
                    </>
                  ) : (
                    <span>
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}                  
                    </span>                  )}
                </span>
              </p>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-custom float-end ms-1">
                {addDetails?._id ? "Update" : "Save"}
              </button>
            </div>
          </Form>
          <button
            className="btn btn-cancel float-end me-1"
            onClick={() => {
              setShowModal({ show: false, id: null });
            }}
          >
            cancel
          </button>
        </ModalComponent>

        {/* delete modal */}

        <ModalComponent
          show={deleteModal.show}
          onHide={() => {
            setDeleteModal({ show: false, id: null });
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
                  Are you sure you want to reject this image{""} ?
                </h5>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <div className="col gap-3 d-flex justify-content-center">
              <button
                onClick={() => {
                  setDeleteModal({ show: false, id: null });
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
                  deleteVideo();
                }}
              >
                <i
                  className="fs-4 fas fa-trash-alt me-2"
                  style={{ color: "white" }}
                />{" "}
                Yes, Delete it
              </button>
            </div>
          </div>
        </ModalComponent>
      </SlideMotion>
    </>
  );
}

export default Awards;
