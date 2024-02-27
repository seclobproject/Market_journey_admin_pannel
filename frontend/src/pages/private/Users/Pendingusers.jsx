import React, { useEffect, useState } from 'react'
import { SlideMotion } from '../../../libs/FramerMotion';
import { ApiCall } from '../../../Services/Api';
import { viewpendingmemberUrl } from '../../../utils/Constants';

function Pendingusers() {
    const [pendingModal, setPendingModals] = useState({ show: false, id: null });
    const [pendingMemberList,setPendingMemberList]=useState([])

 //-----------pending member --------
 const getpendingMenbers = async () => {
    try {
      const response = await ApiCall("get", viewpendingmemberUrl);
      console.log(response, "from api callssssssssssss");
      if (response.status === 200) {
        setPendingMemberList(response?.data?.packageData);
      } else {
        console.error(
          "Error fetching state list. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching state list:", error);
    }
  };


  useEffect(()=>{
    getpendingMenbers();
  },[])

  return (
    <>
     <SlideMotion>
        <div className="card w-100 position-relative overflow-hidden">
          {" "}
          <h5
            className="card-title fw-semibold mb-0 lh-sm px-4 mt-3"
            style={{ color: "#F7AE15" }}
          >
            Pending Members
          </h5>
          <div className="px-4 py-3 border-bottom d-flex  align-items-center justify-content-between">
            <div className=" d-flex align-items-center ">
              <form className="position-relative">
                <input
                  type="text"
                  className="form-control search-chat py-2 ps-5"
                  id="text-srh"
                  placeholder="Search "
                  // onChange={(e) =>
                  //   setParams({ ...params, query: e.target.value })
                  // }
                  // value={params?.query}
                />
                <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
              </form>
            </div>

            <div>
              <button
                className="btn btn-custom  ms-3 float-end"
                onClick={() => setPendingModals({ show: true, id: null })}
              >
                Add
              </button>
            </div>
          </div>
          <div className="card-body p-2">
            <div className="table-container table-responsive rounded-2 mb-4">
              <table className="table border text-nowrap customize-table mb-0 align-middle">
                <thead className="text-dark fs-4 table-light">
                  <tr>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Name</h6>
                    </th>

                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Phone</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Email</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Username</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Password</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">User Role</h6>
                    </th>

                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">Action</h6>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-1">
                            <h6 className="fs-4 fw-semibold mb-0"></h6>
                          </div>
                        </div>
                      </td>

                      <td></td>
                      <td>
                        <p className="mb-0 fw-normal"></p>
                      </td>
                      <td>
                        <span className="mb-0 fw-normal"></span>
                      </td>
                      <td>
                        <span className="mb-0 fw-normal"></span>
                      </td>

                      <td>
                        <div className="dropdown dropstart">
                          <a
                            href="#"
                            className="text-muted"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="ti ti-dots fs-5" />
                          </a>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li>
                              <a
                                className="dropdown-item d-flex align-items-center gap-3"
                                //   onClick={() => handleEdit(staff)}
                              >
                                <i className="fs-4 ti ti-edit" />
                                Edit
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item d-flex align-items-center gap-3"
                                href="#"
                                onClick={() =>
                                  setDeleteModal({
                                    show: true,
                                    // id: staff?._id,
                                  })
                                }
                              >
                                <i className="fs-4 ti ti-trash" />
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </>
                </tbody>
              </table>
            </div>
          </div>
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

     
      </SlideMotion>
    </>
  )
}

export default Pendingusers