import React, { useContext, useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toastify";
import Loader from "../../../Components/Loader";
import { ContextData } from "../../../Services/Context";
import { SlideMotion } from "../../../libs/FramerMotion";
import ModalComponent from "../../../Components/ModalComponet";
import { Form } from "react-bootstrap";
import { set } from "mongoose";
import {
  deleteuploadImageUrl,
  uploadimageUrl,
  viewuploadsUrl,
} from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";

function Uploads() {
  const [imageModal, setImageModal] = useState({ show: false, id: null });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [isLoading, setIsLoading] = useState(false);
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [addImage, setAddImage] = useState({});
  const [description, setDescription] = useState("");
  const [viewImage, setViewImage] = useState({});
  const [ImageList, setImageList] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [filename, setFileName] = useState({});

  //-----------list state--------
  const getImageList = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", viewuploadsUrl);

      if (response.status === 200) {
        setImageList(response?.data?.homeImageData);
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

  //-------Handle Image Selection----------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAddImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setViewImage({
          image: reader.result,
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
      image: "",
    }));
    setFileName({
      File: "",
    });
    setAddImage({
      homeImage: "",
    });
  };
  //-------Image upload----------
  const addImageFun = async (e) => {
    if (!filename?.name) {
      setErrorMessage("Please select an Image")
    }
    try {
      const formdata = new FormData();
      formdata.append("homeImage", addImage, addImage?.name);
      formdata.append("description", description);
      const response = await ApiCall(
        "post",
        uploadimageUrl,
        formdata,
        "",
        "multipart/form-data"
      );
      if (response.status === 201 || response.status === 200) {
        setImageModal(false);
        setValidated(false);
        setAddImage("");
        setViewImage("");
        setFileName("");
        getImageList();
        setDescription("");
        Show_Toast("Image uploaded successfully", true);
      } else {
        Show_Toast("Image upload failed", false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Show_Toast("Image upload failed", false);
    }
  };
  //----------delete image----------
  const deleteImage = async () => {
    try {
      const response = await ApiCall(
        "post",
        `${deleteuploadImageUrl}/${addImage._id}`
      );
      if (response?.status === 200) {
        Show_Toast(response?.data?.msg, true);
        setDeleteModal(false);
        getImageList();
      } else {
        Show_Toast("Failed to delete image", false);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      Show_Toast("Failed to delete image. Please try again.", false);
    }
  };

  useEffect(() => {
    getImageList();
  }, []);

  return (
    <>
      <SlideMotion>
        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="card w-100 position-relative overflow-hidden">
              <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
                <h5
                  className="card-title fw-semibold mb-0 px-0 mt-3"
                  style={{ color: "#F7AE15" }}
                >
                  Image Upload
                </h5>
                <div>
                  <button
                    className="btn btn-custom ms-3 float-end"
                    onClick={() => {
                      setImageModal({ show: true, id: null });
                      setValidated(false);
                      setFileName("");
                      setViewImage("");
                      setAddImage("");
                      setDescription("");
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
                            <h6 className="fs-4 fw-semibold mb-0">Image</h6>
                          </th>
                          <th>
                            <h6 className="fs-4 fw-semibold mb-0">
                              Description
                            </h6>
                          </th>
                          <th>
                            <h6 className="fs-4 fw-semibold mb-0">Actions</h6>
                          </th>

                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {ImageList?.length ? (
                          <>
                            {ImageList.map((image, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <img
                                    alt="images"
                                    src={`                                  http://192.168.29.152:6003/uploads/${image?.homeImage}
                                  `}
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "cover",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>{image?.description}</td>
                                <td>
                                  {" "}
                                  <a
                                    className="dropdown-item d-flex align-items-center gap-3"
                                    onClick={() => {
                                      setDeleteModal({ show: true, id: null });
                                      setAddImage(image);
                                    }}
                                  >
                                    <i
                                      className="fs-4 fas fa-trash-alt"
                                      style={{ color: "red" }}
                                    />
                                  </a>
                                </td>{" "}
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td colSpan={20} style={{ textAlign: "center" }}>
                              <b>No Images Found</b>{" "}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SlideMotion>
      <ModalComponent
        show={imageModal.show}
        onHide={() => {
          setImageModal({ show: false, id: null });
        }}
        title={<h5 style={{ color: "#F7AE15", margin: 0 }}>Add Image</h5>}
        centered
        width={"500px"}
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => Check_Validation(e, addImageFun, setValidated)}
        >
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Description{" "}
            </label>
            <textarea
              className="form-control form-control-lg"
              rows="4"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <Form.Control.Feedback type="invalid">
              Please provide a link
            </Form.Control.Feedback>
          </div>

          <div className="mb-4">
            <div className="col-6">
              <label htmlFor="fileInput" className="form-label">
                Upload Image
              </label>
              <div className="d-flex flex-row align-items-center">
                <label htmlFor="fileInput" className="upload-btn">
                  {viewImage?.image ? (
                    <img
                      src={viewImage?.image}
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
                  onChange={handleImageChange}
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
                  </span>                )}
              </span>
            </p>
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-custom float-end ms-1">
              {addImage?._id ? "Update" : "Save"}
            </button>
          </div>
        </Form>
        <button
          className="btn btn-cancel float-end me-1"
          onClick={() => {
            setImageModal({ show: false, id: null });
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
                deleteImage();
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

export default Uploads;
