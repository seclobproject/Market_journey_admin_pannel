import React, { useContext, useState } from 'react'
import Loader from '../../../Components/Loader';
import { ContextData } from '../../../Services/Context';
import { SlideMotion } from '../../../libs/FramerMotion';
import ModalComponent from '../../../Components/ModalComponet';
import { Form } from 'react-bootstrap';

function Uploads() {
    const [imageModal, setImageModal] = useState({ show: false, id: null });
    const [videoModal, setVideoModal] = useState({ show: false, id: null });
    const [isLoading, setIsLoading] = useState(false);
    const { Check_Validation } = useContext(ContextData);
    const [validated, setValidated] = useState(false);
const [addImage,setAddImage]=useState({})
const [filename, setFileName] = useState({});
console.log();
const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAddImage({
          image: reader.result,
        });
        setFileName({
          File: file.name, // Store the filename in the state
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCancelName = () => {
    setAddImage((preAddImages) => ({
      ...preAddImages,
      image: "",
    }));
    setFileName({
      File: "",
    });
  };

  return (
    <>
    <SlideMotion>

    <div className='row'>
        <div className='col-6'>
        <div className="card w-100 position-relative overflow-hidden">
          {" "}
        

          <div className="px-4 py-3 border-bottom d-flex  align-items-center justify-content-between">
          <h5 className="card-title fw-semibold mb-0  px-0 mt-3" style={{color: '#F7AE15'}}>
         Image Upload
          </h5>

            <div>
              <button
                className="btn btn-custom  ms-3 float-end"
                onClick={() => {
                  setImageModal({ show: true, id: null });
                  setValidated(false);
                //   setAddPackages("");
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
                      <h6 className="fs-4 fw-semibold mb-0">Image</h6>
                    </th>
                    

                 
                    <th>Actions</th>

                    <th />
                  </tr>
                </thead>
                {/* <tbody>
                  {packagesList?.length ? (
                    <>
                      {packagesList.map((packages, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {(packages?.franchiseName &&
                              packages.franchiseName.toUpperCase()) ||
                              "--"}
                          </td>
                          <td>
                            {(packages?.packageName &&
                              packages.packageName.toUpperCase()) ||
                              "--"}
                          </td>
                          <td>{packages?.packageAmount || "0"}</td>
                          <td>
                            {" "}
                            <a
                              className="dropdown-item d-flex align-items-center gap-3"
                              onClick={() => {
                                setPackageModal({ show: true, id: null });
                                setAddPackages(packages);
                              }}
                            >
                              <i className="fs-4 ti ti-edit" />
                              Edit
                            </a>
                          </td>
                          <td></td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={20} style={{ textAlign: "center" }}>
                        <b>No Packages Found</b>{" "}
                      </td>
                    </tr>
                  )}
                </tbody> */}
              </table>
            </div>
          </div>
               )}
          <div className="me-2">
            {/* -------------------------pagination--------------------- */}
            {/* <Pagination
              pagination={pagination}
              params={params}
              setParams={setParams}
            /> */}
            {/* -------------------------pagination--------------------- */}
          </div>
        </div>
        </div>
        <div className='col-6'>
        <div className="card w-100 position-relative overflow-hidden">
          {" "}
        

          <div className="px-4 py-3 border-bottom d-flex  align-items-center justify-content-between">
          <h5 className="card-title fw-semibold mb-0  px-0 mt-3" style={{color: '#F7AE15'}}>
       Upload Video
          </h5>

            <div>
              <button
                className="btn btn-custom  ms-3 float-end"
                onClick={() => {
                  setVideoModal({ show: true, id: null });
                //   setValidated(false);
                //   setAddPackages("");
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
                      <h6 className="fs-4 fw-semibold mb-0">Video Link</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Title</h6>
                    </th>

                   
                    <th>Actions</th>

                    <th />
                  </tr>
                </thead>
                {/* <tbody>
                  {packagesList?.length ? (
                    <>
                      {packagesList.map((packages, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {(packages?.franchiseName &&
                              packages.franchiseName.toUpperCase()) ||
                              "--"}
                          </td>
                          <td>
                            {(packages?.packageName &&
                              packages.packageName.toUpperCase()) ||
                              "--"}
                          </td>
                          <td>{packages?.packageAmount || "0"}</td>
                          <td>
                            {" "}
                            <a
                              className="dropdown-item d-flex align-items-center gap-3"
                              onClick={() => {
                                setPackageModal({ show: true, id: null });
                                setAddPackages(packages);
                              }}
                            >
                              <i className="fs-4 ti ti-edit" />
                              Edit
                            </a>
                          </td>
                          <td></td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={20} style={{ textAlign: "center" }}>
                        <b>No Packages Found</b>{" "}
                      </td>
                    </tr>
                  )}
                </tbody> */}
              </table>
            </div>
          </div>
               )}
          <div className="me-2">
            {/* -------------------------pagination--------------------- */}
            {/* <Pagination
              pagination={pagination}
              params={params}
              setParams={setParams}
            /> */}
            {/* -------------------------pagination--------------------- */}
          </div>
        </div>
        </div>

    </div>
    </SlideMotion>
    <ModalComponent
          show={imageModal.show}
          onHide={() => {
            setImageModal({ show: false, id: null });
          }}
          title={
            <h5 style={{ color: '#F7AE15', margin: 0}}>
            Add Image
            </h5>
          }          
          
          centered
          width={"500px"}
        >
          <Form
            noValidate
            // validated={validated}
            // onSubmit={(e) => Check_Validation(e, addOrEdit, setValidated)}
          >
        

        <div className='mb-4'>
        <div className="col-6">
      <label htmlFor="fileInput" className="form-label">
        Upload Image
      </label>
      <div className="d-flex flex-row align-items-center">
        <label htmlFor="fileInput" className="upload-btn">
          {addImage?.image ? (
            <img
              src={addImage?.image}
              alt="Preview"
              style={{ width: '110px', height: '110px', objectFit: 'cover' }}
            />
          ) : (
            <img
              src="/public/dist/images/upload image.webp" // Replace with your default image path
              alt="Default"
              style={{ width: '110px', height: '110px', objectFit: 'cover' }}
            />
          )}
        </label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>
    </div>
        </div>
        <div className="col-6">
                  <p
                    style={{ overflow: "hidden" }}
                    className="my-auto ml-3 mt-2"
                  >
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
                        <span></span>
                      )}
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

    </>
  )
}

export default Uploads