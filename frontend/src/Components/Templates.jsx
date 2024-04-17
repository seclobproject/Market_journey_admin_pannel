import React, { useRef } from "react";
import Barcode from "react-barcode";
import "./Templatestyle.css";
import { jsPDF } from "jspdf";
import ReactToPrint from "react-to-print";

function PdfTemplates({ invoiceData }) {
  const componentRef = useRef();

  const calculateGSTAmount = (amount) => {
    const gstRate = 18;
    const gstAmount = (amount * gstRate) / 100;
    return gstAmount;
  };

  const totalAmount = invoiceData?.packageAmount;
  const gstAmount = calculateGSTAmount(totalAmount);
  const totalWithGST = totalAmount + gstAmount;

  const handleDownload = () => {
    const printableContent = componentRef.current;

    if (!printableContent) {
      console.error("Printable content is missing.");
      return;
    }

    const pdf = new jsPDF("landscape", "px", "a4", false);
    pdf.html(printableContent, {
      callback: () => {
        pdf.save("invoice.pdf");
      },
    });
  };

  return (
    <>
      <div ref={componentRef} className="container">
        <div className="row">
          <div className="col-md-4 brcode">
            <Barcode
              value={`4n%${invoiceData.ownSponsorId}+ut%`}
              width={1}
              height={50}
              displayValue={false}
            />
          </div>
          <div className="col-md-3 text-right bbc">
            <h4 style={{ color: "#325aa8" }}>
              <strong>MARKET JOURNEY</strong>
            </h4>
            <p>(+91) 1234567890</p>
            <p>sample@gmail.com</p>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 style={{ color: "#325aa8" }}>INVOICE</h2>
          </div>
        </div>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>
                <h5>Package Type</h5>
              </th>
              <th>
                <h5>Package</h5>
              </th>
              <th>
                <h5>Amount</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-md-9">
                <h4>{invoiceData?.packageType}</h4>
              </td>
              <td className="col-md-9">
                <h4>{invoiceData?.franchise}</h4>
              </td>
              <td className="col-md-9">
                <h4>{invoiceData?.packageAmount}</h4>
              </td>
            </tr>
            <tr>
              <td className="text-right">
                <p>
                  <strong>GST:</strong>
                </p>
                <p>
                  <strong>GST Amount:</strong>
                </p>
                <p>
                  <strong>Package Amount:</strong>
                </p>
              </td>
              <td>
                <p>
                  <strong>
                    <i className="fas fa-rupee-sign"></i> 18%
                  </strong>
                </p>
                <p>
                  <strong>
                    <i className="fas fa-rupee-sign"></i> ₹ {gstAmount}
                  </strong>
                </p>
                <p>
                  <strong>
                    <i className="fas fa-rupee-sign"></i> ₹{" "}
                    {invoiceData?.packageAmount}
                  </strong>
                </p>
              </td>
            </tr>
            <tr style={{ color: "#F81D2D" }}>
              <td className="text-right">
                <h4>
                  <strong>Total:</strong>
                </h4>
              </td>
              <td className="text-left">
                <h4>
                  <strong>
                    <i className="fas fa-rupee-sign"></i> ₹ {totalWithGST}
                  </strong>
                </h4>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="col-md-12">
          <br />
          <p>
            <b>Name: {invoiceData?.name}</b>
          </p>
          <p>
            <b>Contact: {invoiceData?.phone}</b>
          </p>
          <p>
            <b>Email: {invoiceData?.email}</b>
          </p>
        </div>
      </div>
      <button onClick={handleDownload}>Download PDF</button>
      <ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => componentRef.current}
        documentTitle={`INVOICE`}
      />
    </>
  );
}

export default PdfTemplates;
