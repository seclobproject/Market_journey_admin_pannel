import React from "react";
import { SlideMotion } from "../../libs/FramerMotion";
import QRCode from "react-qr-code";
function Home() {
  return (
    <>
    <SlideMotion>
    <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 d-flex align-items-strech">
    
   
            </div>
   
          <div className="col-lg-4">
          <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "50%" }}
    value='hai'
    viewBox={`0 0 256 256`}
    />
       
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body p-4">
                <div className="mb-4">
                  <h5 className="card-title fw-semibold">
                    Recent Transactions
                  </h5>
                </div>
                <ul className="timeline-widget mb-0 position-relative mb-n5">
                  <li className="timeline-item d-flex position-relative overflow-hidden">
                    <div className="timeline-time text-dark flex-shrink-0 text-end">
                      09:30
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className="timeline-badge border-2 border border-primary flex-shrink-0 my-8" />
                      <span className="timeline-badge-border d-block flex-shrink-0" />
                    </div>
                    <div className="timeline-desc fs-3 text-dark mt-n1">
                      Payment received from John Doe of $385.90
                    </div>
                  </li>
                  <li className="timeline-item d-flex position-relative overflow-hidden">
                    <div className="timeline-time text-dark flex-shrink-0 text-end">
                      10:00 am
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className="timeline-badge border-2 border border-info flex-shrink-0 my-8" />
                      <span className="timeline-badge-border d-block flex-shrink-0" />
                    </div>
                    <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">
                      New sale recorded{" "}
                      <a
                        href="javascript:void(0)"
                        className="text-primary d-block fw-normal"
                      >
                        #ML-3467
                      </a>
                    </div>
                  </li>
                  <li className="timeline-item d-flex position-relative overflow-hidden">
                    <div className="timeline-time text-dark flex-shrink-0 text-end">
                      12:00 am
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className="timeline-badge border-2 border border-success flex-shrink-0 my-8" />
                      <span className="timeline-badge-border d-block flex-shrink-0" />
                    </div>
                    <div className="timeline-desc fs-3 text-dark mt-n1">
                      Payment was made of $64.95 to Michael
                    </div>
                  </li>
                  <li className="timeline-item d-flex position-relative overflow-hidden">
                    <div className="timeline-time text-dark flex-shrink-0 text-end">
                      09:30 am
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className="timeline-badge border-2 border border-warning flex-shrink-0 my-8" />
                      <span className="timeline-badge-border d-block flex-shrink-0" />
                    </div>
                    <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">
                      New sale recorded{" "}
                      <a
                        href="javascript:void(0)"
                        className="text-primary d-block fw-normal"
                      >
                        #ML-3467
                      </a>
                    </div>
                  </li>
                  <li className="timeline-item d-flex position-relative overflow-hidden">
                    <div className="timeline-time text-dark flex-shrink-0 text-end">
                      09:30 am
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className="timeline-badge border-2 border border-danger flex-shrink-0 my-8" />
                      <span className="timeline-badge-border d-block flex-shrink-0" />
                    </div>
                    <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">
                      New arrival recorded
                    </div>
                  </li>
                  <li className="timeline-item d-flex position-relative overflow-hidden">
                    <div className="timeline-time text-dark flex-shrink-0 text-end">
                      12:00 am
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className="timeline-badge border-2 border border-success flex-shrink-0 my-8" />
                    </div>
                    <div className="timeline-desc fs-3 text-dark mt-n1">
                      Payment Done
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body p-4">
                <h5 className="card-title fw-semibold mb-4">
                  Recent Transactions
                </h5>
                <div className="table-responsive">
                  <table className="table text-nowrap mb-0 align-middle">
                    <thead className="text-dark fs-4">
                      <tr>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Id</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Assigned</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Name</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Priority</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Budget</h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">1</h6>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-1">Sunil Joshi</h6>
                          <span className="fw-normal">Web Designer</span>
                        </td>
                        <td className="border-bottom-0">
                          <p className="mb-0 fw-normal">Elite Admin</p>
                        </td>
                        <td className="border-bottom-0">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-primary rounded-3 fw-semibold">
                              Low
                            </span>
                          </div>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0 fs-4">$3.9</h6>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">2</h6>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-1">
                            Andrew McDownland
                          </h6>
                          <span className="fw-normal">Project Manager</span>
                        </td>
                        <td className="border-bottom-0">
                          <p className="mb-0 fw-normal">Real Homes WP Theme</p>
                        </td>
                        <td className="border-bottom-0">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-secondary rounded-3 fw-semibold">
                              Medium
                            </span>
                          </div>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0 fs-4">$24.5k</h6>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">3</h6>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-1">
                            Christopher Jamil
                          </h6>
                          <span className="fw-normal">Project Manager</span>
                        </td>
                        <td className="border-bottom-0">
                          <p className="mb-0 fw-normal">MedicalPro WP Theme</p>
                        </td>
                        <td className="border-bottom-0">
    
</td>

                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0 fs-4">$12.8k</h6>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">4</h6>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-1">Nirav Joshi</h6>
                          <span className="fw-normal">Frontend Engineer</span>
                        </td>
                        <td className="border-bottom-0">
                          <p className="mb-0 fw-normal">Hosting Press HTML</p>
                        </td>
                        <td className="border-bottom-0">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-success rounded-3 fw-semibold">
                              Critical
                            </span>
                          </div>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0 fs-4">$2.4k</h6>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideMotion>
     
    </>
  );
}

export default Home;
