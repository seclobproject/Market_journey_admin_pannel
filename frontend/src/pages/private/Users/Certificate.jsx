import React from 'react'
import CertificateTemplate from '../../../Components/CertificateTemplate'
import { useLocation } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import { SlideMotion } from '../../../libs/FramerMotion';

function Certificate() {
  const location = useLocation();
  const { data } = location.state || {};
  console.log(data,"dtaa");
  const { toPDF, targetRef } = usePDF({ filename: `${data.name}-invoiceSlip` });


  const generatePdf = async () => {
    try {
      const pdf = await toPDF(<CertificateTemplate userDetails={data} />);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
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

       
      </div>
      <div ref={targetRef}>
          <CertificateTemplate userDetails={data} />
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
      </SlideMotion>


       
          </>
  )
}

export default Certificate