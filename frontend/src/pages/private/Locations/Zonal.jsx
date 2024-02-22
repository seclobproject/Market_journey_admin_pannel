import React, { useContext, useEffect, useState } from "react";
import { SlideMotion } from "../../../libs/FramerMotion";
import { ContextData } from "../../../Services/Context";
import ModalComponent from "../../../Components/ModalComponet";
import { Form } from "react-bootstrap";
import {
  districtlistinZonalUrl,
  statelistPageUrl,
} from "../../../utils/Constants";
import { ApiCall } from "../../../Services/Api";
import Select from "react-select";

function Zonal() {
  const [zonalModal, setZonalModal] = useState({ show: false, id: null });
  const { Check_Validation } = useContext(ContextData);
  const [validated, setValidated] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [districtList, setdistrictList] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  const [addzonal, setAddZonal] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  console.log(selectedId,"id")

  //-----------list state in drop down--------
  const getStateList = async () => {
    try {
      const response = await ApiCall("get", statelistPageUrl);

      if (response.status === 200) {
        setStateList(response?.data?.states);
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

  //-----------list state in drop down--------
  const getDistrictList = async () => {
   
    try {
      const response = await ApiCall("get", `${districtlistinZonalUrl}/${selectedId}`);
console.log(response,"from api call")
      if (response.status === 200) {
        setdistrictList(response?.data?.states);
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

  useEffect(() => {
    getStateList();
  }, []);
  return (
    <>
      <SlideMotion>
        <div className="card w-100 position-relative overflow-hidden">
          <h5 className="card-title fw-semibold mb-0 lh-sm px-4 mt-3">Zonal</h5>
          <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <form className="position-relative">
                <input
                  type="text"
                  className="form-control search-chat py-2 ps-5"
                  id="text-srh"
                  placeholder="Search"
                  // onChange={(e) => setParams({ ...params, query: e.target.value })}
                  // value={params?.query}
                />
                <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
              </form>
            </div>

            <div>
              <button
                className="btn btn-custom ms-3 float-end"
                onClick={() => {
                  setZonalModal({ show: true, id: null });
                  setValidated(false);
                  setAddState("");
                }}
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
                      <h6 className="fs-4 fw-semibold mb-0">SL.NO</h6>
                    </th>
                    <th>
                      <h6 className="fs-4 fw-semibold mb-0">State Name</h6>
                    </th>
                    <th />
                  </tr>
                </thead>
                {/* <tbody>
          {stateList?.length ? (
            <>
              {stateList.map((states, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{states?.name && states.name.toUpperCase()}</td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={20} style={{ textAlign: "center" }}>
                <b>No State Found</b>{" "}
              </td>
            </tr>
          )}
        </tbody> */}
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

        <ModalComponent
          show={zonalModal.show}
          onHide={() => {
            setZonalModal({ show: false, id: null });
          }}
          title={<h5>Add Zonal</h5>}
          centered
          width={"500px"}
        >
          <Form
            Validate
            validated={validated}
            onSubmit={(e) => Check_Validation(e, addStateFun, setValidated)}
          >
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                State
              </label>

              <Select
                required
                options={stateList?.map((state) => ({
                  value: state?.id,
                  label: state?.name,
                }))}
                value={selectedState?.stateName}
                onChange={(selectedOption) => {
                    console.log(selectedOption,"selectedoptions")
                setSelectedId(selectedOption?.value)
                    setAddZonal({
                      ...addzonal,
                      stateName: selectedOption?.label,
                    });
                    getDistrictList(); // This action will be executed after setting the state
                  }}
                  
                placeholder="Select a state"
                isSearchable={true}
              />

              <Form.Control.Feedback type="invalid">
                Please select a state.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                District
              </label>
              <input
              readOnly
                  required
                  className="form-control form-control-lg "
                  rows="4"
                  type="number"
                  placeholder="Enter a district name"
                //   value={addDistrict?.packageAmount}
                //   onChange={(e) =>
                //     setAddDistrict({
                //       ...addDistrict,
                //       packageAmount: e.target.value,
                //     })
                //   }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a package Amount.
                </Form.Control.Feedback>
                </div>

              <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Package Amount
                </label>
                <input
                  required
                  className="form-control form-control-lg "
                  rows="4"
                  type="number"
                  placeholder="Enter a district name"
                //   value={addDistrict?.packageAmount}
                //   onChange={(e) =>
                //     setAddDistrict({
                //       ...addDistrict,
                //       packageAmount: e.target.value,
                //     })
                //   }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a package Amount.
                </Form.Control.Feedback>
              </div>

             

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-custom float-end ms-1">
                {/* {addState?._id ? 'Update' : 'Save'} */}
              </button>
            </div>
          </Form>
        </ModalComponent>
      </SlideMotion>
    </>
  );
}

export default Zonal;
