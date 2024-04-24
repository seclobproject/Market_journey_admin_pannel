import React, { useEffect, useState } from "react";
import PdfTemplates from "../../../Components/templates";
import { useLocation } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { attachMailUrl } from "../../../utils/Constants";
import ModalComponent from "../../../Components/ModalComponet";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import { Base_url } from "../../../Services/Base_url";
import { SlideMotion } from "../../../libs/FramerMotion";
import Loader from "../../../Components/Loader";
function Invoice() {
  const location = useLocation();
  const { data } = location.state || {};
  const [uploadModal, setuploadModal] = useState({ show: false, id: null });
  const { toPDF, targetRef } = usePDF({ filename: `${data.name}-invoiceSlip` });
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceData, setInvoiceDataa] = useState(false);

  const generatePdf = async () => {
    try {
      const pdf = await toPDF(<PdfTemplates invoiceData={data} />);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const File = {
    name: "pdfFile",
    multiple: true,
    action: `${Base_url}${attachMailUrl}/${data?.id}`,
    onChange(info) {
      const { status } = info.file;
      console.log(status, "status");
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} Invoice sent to mail successfully.`);
        setuploadModal(false);
      } else if (status === "error") {
        message.error(`${info.file.name}  failed To send.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };


useEffect(()=>{
setIsLoading(true);
if(data){
 setInvoiceDataa(data);
setIsLoading(false);
}
},[location])
  return (
    <>
      <div className="mt-5" style={{ alignItems: "center" }}>
      {isLoading ? (
          <Loader />
        ) : (
          <SlideMotion>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="spacer">
          <button
            className="btn btn-custom float-end mt-4 hide-on-print "
            onClick={() => {
              setuploadModal({
                show: true,
              });
              generatePdf();
            }}
          >
            <i className="fas fa-envelope"></i> Send in email
          </button>
          <button
            className="btn btn-custom float-end mt-4 hide-on-print me-2"
            onClick={() => generatePdf()}
          >
            <i className="fa fa-download"></i> Download Invoice
          </button>
        </div>

        <div ref={targetRef}>
          <PdfTemplates invoiceData={data} />
        </div>
        <style>
          {`
                  @media print {
                      .hide-on-print {
                          display: none !important;
                      }
                  }
  
                  .spacer {
                      margin-bottom: 20px; 
                  }
              `}
        </style>
      </div>
      </SlideMotion>
        )}
        </div>
      <ModalComponent
        show={uploadModal.show}
        onHide={() => {
          setuploadModal({ show: false, id: null });
        }}
        centered
        width={"500px"}
      >
        <div className="modal-body">
          <Dragger {...File}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag invoice file to this area to upload
            </p>
          </Dragger>
        </div>
      </ModalComponent>
    </>
  );
}

export default Invoice;
