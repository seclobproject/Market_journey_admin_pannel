import React from "react";
import "./Certificatestyle.css";

function CertificateTemplate({ userDetails }) {

  return (
    <>
      <div className="container-certificate">
        <div className="col">
          <img
            src="/dist/images/CertificateTemplates.png"
            alt="Certificate Template"
          />
        </div>

        <div className="content-certificate">
          <h1>{userDetails?.name && userDetails.name.toUpperCase()}</h1>
          <div className="paragragh">
            <p>
              <b>
                This Certificate is proudly presented for the Membership of{" "}
                <b>{userDetails?.franchise}</b> in Market Journey.We welcome you
                warmly into our community and look forward to your active
                participation and valuable contributions.
              </b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CertificateTemplate;
