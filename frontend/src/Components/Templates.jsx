import React, { useRef } from "react";
import Barcode from "react-barcode";
import "./Templatestyle.css";

function PdfTemplates({ invoiceData }) {
  const calculateGSTAmount = (amount) => {
    const gstRate = 18;
    const gstAmount = (amount * gstRate) / 100;
    return gstAmount;
  };

  const totalAmount = invoiceData?.packageAmount;
  const gstAmount = calculateGSTAmount(totalAmount);
  const totalWithGST = totalAmount + gstAmount;

  return (
    <>
      <div className="card py-6">
        <div
          className="container"
          style={{ paddingRight: "50px", paddingLeft: "50px" }}
        >
        <div className="w-100 d-flex flex-wrap justify-content-between">
  <div className="col-md-4 col-sm-12 brcode">
    <Barcode
      value={`4n%${invoiceData.ownSponsorId}+ut%`}
      width={1}
      height={50}
      displayValue={false}
    />
  </div>
  <div className="col-md-8 col-sm-12 text-end "> 
    <div className="align-items-center">
      <img
        src="/dist/images/Remj.png"
        alt=""
        width="15%"
        className=""
      />
    </div>
    <p className="text-end"> 
      <b>(+91) 8089530707</b>
    </p>
    <p className="text-end"> 
      <b>marketjourney.super@gmail.com</b>
    </p>
    <p className="text-end"> 
      <b>1st floor Hibon plaza Mavoor road, Calicut 673004</b>
    </p>
  </div>
</div>

          <div className="row">
            <div className="col-md-12 text-center">
              <h2 style={{ color: "#325aa8" }}>INVOICE</h2>
            </div>
          </div>
          <div className="table-container table-responsive rounded-2 mb-4">
            <table className="table border text-nowrap customize-table mb-0 align-middle">
              <thead className="text-dark fs-4 table-light">
                <tr>
                  <th>
                    <h6 className="fs-4 fw-semibold mb-0">Package Type</h6>
                  </th>
                  <th>
                    <h6 className="fs-4 fw-semibold mb-0">Package</h6>
                  </th>
                  <th>
                    <h6 className="fs-4 fw-semibold mb-0">Amount</h6>
                  </th>
                  <th />
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
                    <h4>₹{invoiceData?.packageAmount}</h4>
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
                      <strong>₹ 18%</strong>
                    </p>
                    <p>
                      <strong>₹ {gstAmount}</strong>
                    </p>
                    <p>
                      <strong>₹ {invoiceData?.packageAmount}</strong>
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
                      <strong>₹ {totalWithGST}</strong>
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-12">
            <br />
            <h5>
              <b>Name: {invoiceData?.name}</b>
            </h5>
            <h5>
              <b>Contact: {invoiceData?.phone}</b>
            </h5>
            <h5>
              <b>Email: {invoiceData?.email}</b>
            </h5>
            <h5>
              <b>User Id: {invoiceData?.ownSponserId}</b>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdfTemplates;
