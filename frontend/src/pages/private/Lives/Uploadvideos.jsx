import React, { useContext, useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toastify";
import { ContextData } from "../../../Services/Context";
import { SlideMotion } from "../../../libs/FramerMotion";
import ModalComponent from "../../../Components/ModalComponet";
import { Form } from "react-bootstrap";
import { ApiCall } from "../../../Services/Api";
import {
  editvideouploadUrl,
  uploadvideoUrl,
  videodeleteUrl,
  viewvideouploadUrl,
} from "../../../utils/Constants";
import Loader from "../../../Components/Loader";
import { Image } from "antd";

function Uploadvideos() {
  const [videoModal, setVideoModal] = useState({ show: false, id: null });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [addVideo, setAddVideo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filename, setFileName] = useState({});
  const [viewImage, setViewImage] = useState({});
  const [details, setDetails] = useState({});
  const [videoList, setVideoList] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  //-----------list  video--------
  const getVideoList = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", viewvideouploadUrl);
      if (response.status === 200) {
        setVideoList(response?.data?.homeVideoData);
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
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setAddVideo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setViewImage({
          thumbanil: reader.result,
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
      thumbanil: "",
    }));
    setFileName({
      thumbanil: "",
    });
    setAddImage({
      thumbanil: "",
    });
  };

  //-------Image upload----------
  const addVideoFun = async (e) => {
    try {
      if (!filename?.name) {
        setErrorMessage("Please select an Video Thumbnail");
      }
      if (addVideo?._id) {
        const formData = new FormData();
        formData.append("videoThambnail", addVideo, addVideo?.name);
        formData.append("videoLink", details?.videoLink);
        formData.append("videoTitle", details?.videoTitle);

        const response = await ApiCall(
          "post",
          `${editvideouploadUrl}/${addVideo?._id}`,
          formData,
          "",
          "multipart/form-data"
        );
        if (response.status === 201 || response.status === 200) {
          setVideoModal(false);
          setValidated(false);
          setAddVideo("");
          setViewImage("");
          setDetails("");
          setFileName("");
          setValidated(false);
          getVideoList();       
          Show_Toast("Video updated successfully", true);
        } else {
          Show_Toast("Video update failed", false);
        }
      } else {
        const formData = new FormData();
        formData.append("videoThambnail", addVideo, addVideo?.name);
        formData.append("videoLink", details?.videoLink);
        formData.append("videoTitle", details?.videoTitle);

        const response = await ApiCall(
          "post",
          uploadvideoUrl,
          formData,
          "",
          "multipart/form-data"
        );

        if (response.status === 201 || response.status === 200) {
          setVideoModal(false);
          setValidated(false);
          setAddVideo("");
          setViewImage("");
          setDetails("");
          setFileName("");
          setValidated(false);
          getVideoList();

          // getImageList();
          // setDescription("")
          Show_Toast("Video uploaded successfully", true);
        } else {
          Show_Toast("Video upload failed", false);
        }
      }
    } catch (error) {
      console.error("Error uploading Video:", error);
      Show_Toast("Video upload failed", false);
    }
  };

  //----------delete image----------
  const deleteVideo = async () => {
    try {
      const response = await ApiCall(
        "post",
        `${videodeleteUrl}/${addVideo._id}`
      );
      if (response?.status === 200) {
        Show_Toast(response?.data?.msg, true);
        setDeleteModal(false);
        getVideoList();
      } else {
        Show_Toast("Failed to delete video", false);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      Show_Toast("Failed to delete video. Please try again.", false);
    }
  };

  useEffect(() => {
    getVideoList();
  }, []);
  return (
    <>
      <SlideMotion>
        <div className="col-md-12 mb-4">
          <div className="card w-100 position-relative overflow-hidden">
            <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
              <h5
                className="card-title fw-semibold mb-0 px-0 mt-3"
                style={{ color: "#0F1535" }}
              >
                Upload Video
              </h5>
              <div>
                <button
                  className="btn btn-custom ms-3 float-end"
                  onClick={() => {
                    setVideoModal({ show: true, id: null });
                    setValidated(false);
                    setFileName("");
                    setViewImage("");
                    setDetails("");
                    setAddVideo("");
                    setErrorMessage("");
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            {isLoading ? (
              /* Loader component or other loading indicator */
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
                          <h6 className="fs-4 fw-semibold mb-0">Thumbnail</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Title</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Video link</h6>
                        </th>
                        <th>
                          <h6 className="fs-4 fw-semibold mb-0">Actions</h6>
                        </th>

                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {videoList?.length ? (
                        <>
                          {videoList.map((video, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td
                                style={{
                                  width: "200px",
                                  height: "100px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                              >
                                <Image
                                  width={200}
                                  // src={`http://192.168.29.152:6003/uploads/${video?.videoThambnail}`}
                                  src={`https://admin.marketjourney.in/uploads/${video?.videoThambnail}`}

                                />
                              </td>
                              <td
                                style={{
                                  width: "300px",
                                  height: "150px",
                                  overflow: "hidden",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {video?.videoTitle || "--"}
                              </td>
                              <td>
                                {video?.videoLink ? (
                                  <a
                                    href={video.videoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {video.videoLink}
                                  </a>
                                ) : (
                                  "--"
                                )}
                              </td>
                              <td>
                                {" "}
                                <a
                                  className="dropdown-item d-flex align-items-center gap-3 mt-2"
                                  onClick={() => {
                                    setVideoModal({ show: true, id: null });
                                    setAddVideo(video);
                                    setDetails(video);
                                  }}
                                >
                                  <i
                                    className="fs-4 fas fa-pencil-alt"
                                    style={{ color: "red", cursor: "pointer" }}
                                  ></i>
                                </a>
                                <a
                                  className="dropdown-item d-flex align-items-center gap-3 mt-2"
                                  onClick={() => {
                                    setDeleteModal({
                                      show: true,
                                      id: null,
                                    });
                                    setAddVideo(video);
                                  }}
                                >
                                  <i
                                    className="fs-4 fas fa-trash-alt"
                                    style={{ color: "red", cursor: "pointer" }}
                                  />
                                </a>
                              </td>{" "}
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={20} style={{ textAlign: "center" }}>
                            <b>No Videos Found</b>{" "}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="me-2">{/* Pagination or other content */}</div>
          </div>
        </div>
      </SlideMotion>
      <ModalComponent
        show={videoModal.show}
        onHide={() => {
          setVideoModal({ show: false, id: null });
        }}
        title={<h5 style={{ color: "#F7AE15", margin: 0 }}>Add Video</h5>}
        centered
        width={"500px"}
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => Check_Validation(e, addVideoFun, setValidated)}
        >
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              required
              className="form-control form-control-lg "
              rows="4"
              placeholder="Enter a title"
              value={details?.videoTitle}
              onChange={(e) =>
                setDetails({
                  ...details,
                  videoTitle: e.target.value,
                })
              }
            ></input>
            <Form.Control.Feedback type="invalid">
              Please provide a title.
            </Form.Control.Feedback>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Video Link
            </label>
            <textarea
              required
              className="form-control form-control-lg"
              rows="4"
              placeholder="Enter a video link"
              value={details?.videoLink}
              onChange={(e) =>
                setDetails({
                  ...details,
                  videoLink: e.target.value,
                })
              }
            ></textarea>
            <Form.Control.Feedback type="invalid">
              Please provide a link
            </Form.Control.Feedback>
          </div>

          <div className="mb-4">
            <div className="col-6">
              <label htmlFor="fileInput" className="form-label">
                Upload Thumbnail
              </label>
              <div className="d-flex flex-row align-items-center">
                <label htmlFor="fileInput" className="upload-btn">
                  {viewImage?.thumbanil || details?.videoThambnail ? (
                    <img
                      src={
                        viewImage?.thumbanil ||
                        `http://192.168.29.152:8000/uploads/${details?.videoThambnail}`
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
                      src="/dist/images/upload image.webp" 
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
                    {filename?.File || "Please select Image"}
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
                    {errorMessage && (
                      <div style={{ color: "red" }}>{errorMessage}</div>
                    )}
                  </span>
                )}
              </span>
            </p>
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-custom float-end ms-1">
              {addVideo?._id ? "Update" : "Save"}
            </button>
          </div>
        </Form>
        <button
          className="btn btn-cancel float-end me-1"
          onClick={() => {
            setVideoModal({ show: false, id: null });
          }}
        >
          Cancel
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
                Are you sure you want to delete this image{""} ?
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
    </>
  );
}

export default Uploadvideos;
