import React, { useState } from "react";
import "./Certificatestyle.css";
import ModalComponent from "../../../Components/ModalComponet";
import { Form } from "react-bootstrap";
function Certificate() {
  const [userName, setuserName] = useState("");
  const [content, setContent] = useState("");
  const [modal, setModal] = useState({ show: false, id: null });

  return (
    <>
      <div className="container-certificate">
        <div className="row">
          <button
            className="btn btn-custom"
            onClick={() => {
              setModal({
                show: true,
              });
            }}
          >
            Add Content
          </button>
          <div className="col">
            <img
              src="/dist/images/Certificatetemplate.png"
              height={500}
              alt="Certificate Template"
            />
          </div>
        </div>
        <div className="content-certificate">
          <h1>{userName||"Name"}</h1>
          <div className="paragragh">
            <p>
            {content ? content : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quibusdam odit magnam necessitatibus totam, omnis ducimus cupiditate mollitia possimus ea consequatur corrupti, ipsam temporibus dicta! Dolorum unde praesentium nulla labore?"}

            </p>
          </div>
        </div>
      </div>
      <ModalComponent
        show={modal.show}
        onHide={() => {
          setModal({ show: false, id: null });
        }}
        title={<h5 style={{ color: "#F7AE15", margin: 0 }}>Add Alerts</h5>}
        centered
        width={"500px"}
      >
        <Form
       
        >
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Alert Content
            </label>
            <textarea
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter  name"
              style={{ height: "100px" }}
              value={userName}
              onChange={(e) => {
                setuserName(e.target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
               Content
            </label>
            <textarea
              id="packageAmountInput"
              className="form-control form-control-lg"
              placeholder="Enter content"
              style={{ height: "100px" }}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-custom float-end ms-1">
              {/* {addAlerts?._id ? "Update" : "Send"} */}
            </button>
          </div>
        </Form>
        <button
          className="btn btn-cancel float-end me-1"
          onClick={() => {
            setModal({ show: false, id: null });
          }}
        >
          Cancel
        </button>
      </ModalComponent>
    </>
  );
}

export default Certificate;
