import React, { useContext, useEffect, useState } from "react";
import { Show_Toast } from "../../../utils/Toastify";
import Loader from "../../../Components/Loader";
import ModalComponent from "../../../Components/ModalComponet";
import { ContextData } from "../../../Services/Context";
import { SlideMotion } from "../../../libs/FramerMotion";
import { Form } from "react-bootstrap";
import { ApiCall } from "../../../Services/Api";
import {
  addnewsUrl,
  deletenewsUrl,
  editnewsUrl,
  viewnewsUrl,
} from "../../../utils/Constants";
import { get } from "mongoose";

function Livenew() {
  const [newsModal, setNewsModal] = useState({ show: false, id: null });
  const [addNews, setAddNews] = useState({});
  const [newsList, setNewsList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  const getNews = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", viewnewsUrl);
      if (response.status === 200) {
        setNewsList(response?.data?.newsData);
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

  //-------alret add and edit ----------
  const addnewsFun = async (e) => {
    try {
      if (addNews?._id) {
        const response = await ApiCall(
          "post",
          `${editnewsUrl}/${addNews?._id}`,
          addNews
        );
        if (response.status === 201 || response.status === 200) {
          setNewsModal(false);
          setValidated(false);
          getNews();
          Show_Toast("News updated successfully", true);
        } else {
          Show_Toast("News update failed", false);
        }
      } else {
        const response = await ApiCall("post", addnewsUrl, addNews);
        if (response.status === 201 || response.status === 200) {
          setNewsModal(false);
          setValidated(false);
          getNews();
          Show_Toast("News addded successfully", true);
        } else {
          Show_Toast("News added failed", false);
        }
      }
    } catch (error) {
      console.error("Error uploading News:", error);
      Show_Toast("News upload failed", false);
    }
  };
  //----------delete image----------
  const deleteNews = async () => {
    try {
      const response = await ApiCall("post", `${deletenewsUrl}/${addNews._id}`);
      if (response?.status === 200 || response?.status === 201) {
        Show_Toast(response?.data?.msg, true);
        setDeleteModal(false);
        getNews();
      } else {
        Show_Toast("Failed to delete video", false);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      Show_Toast("Failed to delete video. Please try again.", false);
    }
  };

  useEffect(() => {
    getNews();
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
              Live News
            </h5>

            <div>
              <button
                className="btn btn-custom  ms-3 float-end"
                onClick={() => {
                  setNewsModal({ show: true, id: null });
                  setValidated(false);
                  setAddNews("");
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
                        <h6 className="fs-4 fw-semibold mb-0">News</h6>
                      </th>

                      <th>Actions</th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {newsList?.length ? (
                      <>
                        {newsList.map((news, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>{news?.news || "--"}</td>
                            <td>
                              {" "}
                              <a
                                className="dropdown-item d-flex align-items-center gap-3"
                                onClick={() => {
                                  setDeleteModal({
                                    show: true,
                                    id: null,
                                  });
                                  setAddNews(news);
                                }}
                              >
                                <i
                                  className="fs-4 fas fa-trash-alt"
                                  style={{ color: "red" }}
                                />
                              </a>
                              <a
                                className="dropdown-item d-flex align-items-center gap-3 mt-3"
                                onClick={() => {
                                  setNewsModal({ show: true, id: null });
                                  setAddNews(news);
                                }}
                              >
                                <i
                                  className="fs-4 fas fa-pencil-alt"
                                  style={{ color: "red" }}
                                ></i>{" "}
                              </a>
                            </td>
                            <td></td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={20} style={{ textAlign: "center" }}>
                          <b>No News Found</b>{" "}
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
      <ModalComponent
        show={newsModal.show}
        onHide={() => {
          setNewsModal({ show: false, id: null });
        }}
        title={<h5 style={{ color: "#F7AE15", margin: 0 }}>Add Live news</h5>}
        centered
        width={"500px"}
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => Check_Validation(e, addnewsFun, setValidated)}
        >
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              News{" "}
            </label>
            <textarea
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter news content"
              style={{ height: "150px" }}
              value={addNews?.news}
              onChange={(e) => {
                setAddNews({
                  ...addNews,
                  news: e.target.value,
                });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter news content.
            </Form.Control.Feedback>
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-custom float-end ms-1">
              {addNews?._id ? "Update" : "Save"}
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
                Are you sure you want to delete this news{""} ?
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
                deleteNews();
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

export default Livenew;
