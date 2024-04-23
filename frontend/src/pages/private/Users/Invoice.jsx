
import React, { useEffect, useState } from "react";
import PdfTemplates from "../../../Components/Templates";
import { useLocation } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { ApiCall } from "../../../Services/Api";
import { attachMailUrl } from "../../../utils/Constants";

function Invoice() {
  const location = useLocation();
  const { data } = location.state || {};
  console.log(data, "data");

  const { toPDF, targetRef } = usePDF({ filename: `${data.name}-invoiceSlip` });
  const [pdfData, setPdfData] = useState(null);
  console.log(pdfData, "set");
  const [id, setId] = useState();
  console.log(id, "id");

  const handleSendEmail = async () => {
    generatePdf();
    if (pdfData) {
      console.log(pdfData,"pdfData");
      try {
        const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
        console.log(pdfBlob,"..pdfBlob..");

        const formData = new FormData();
        formData.append("pdfFile", pdfBlob, `${data.name}.pdf`);       
         console.log(formData, "....");
        const response = await ApiCall("post", `${attachMailUrl}/${data?.id}`, formData, "",
        "multipart/form-data");
        console.log("formData",formData);

        console.log("respone",response);
        if (response.ok) {
          console.log("PDF file uploaded successfully!");
          // Additional logic after successful upload
        } else {
          console.error("Failed to upload PDF file:", response.statusText);
          // Additional error handling
        }
      } catch (error) {
        console.error("Error converting PDF data to FormData:", error);
      }
    } else {
      console.error("PDF data is not available.");
    }
  };

  const generatePdf = async () => {
    try {
      const pdf = await toPDF(<PdfTemplates invoiceData={data} />);
      setPdfData(pdf);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // useEffect(() => {
  //   if(data){
  //     setId(id)
  //   }
  // }, [data]); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="spacer">
          <button
            className="btn btn-custom float-end mt-4 hide-on-print "
            onClick={() => handleSendEmail()}
          >
            <i className="fas fa-envelope"></i> Send in email
          </button>
          <button
            className="btn btn-custom float-end mt-4 hide-on-print me-2"
            onClick={() => toPDF()}
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
    </>
  );
}


export default Invoice;
