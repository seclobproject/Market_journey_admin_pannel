import React from "react";
import { SlideMotion } from "../../libs/FramerMotion";
import QRCode from "react-qr-code";
function Home() {
  return (
    <>
    <SlideMotion>
    <div className="container-fluid">
      

  <div class="row">
    <div class="col-md-6 col-lg-3 mb-4">
    <div class="card " style={{background:"#00335B"}}>
      <div className="row align-items-center  p-4">
      <div className="col-8">
        <h5 className="card-title mb-9 fw-semibold"
         style={{color:"white"}}
         >
          Yearly Breakup
        </h5>
        <div className="d-flex align-items-center mb-3">
        <h4 className="fw-semibold mb-3"style={{color:"rgb(247, 174, 21)"}}>$36,358</h4>

     
        </div>
      
      </div>
    
    </div>      
    </div>
    </div>
    <div class="col-md-6 col-lg-3 mb-4">
    <div class="card " style={{background:"#00335B"}}>
      <div className="row align-items-center  p-4">
      <div className="col-8">
        <h5 className="card-title mb-9 fw-semibold"
         style={{color:"white"}}
         >
          Yearly Breakup
        </h5>
        <div className="d-flex align-items-center mb-3">
        <h4 className="fw-semibold mb-3"style={{color:"rgb(247, 174, 21)"}}>$36,358</h4>

     
        </div>
      
      </div>
    
    </div>      
    </div>
    </div>
    <div class="col-md-6 col-lg-3 mb-4">
    <div class="card " style={{background:"#00335B"}}>
      <div className="row align-items-center  p-4">
      <div className="col-8">
        <h5 className="card-title mb-9 fw-semibold"
         style={{color:"white"}}
         >
          Yearly Breakup
        </h5>
        <div className="d-flex align-items-center mb-3">
        <h4 className="fw-semibold mb-3"style={{color:"rgb(247, 174, 21)"}}>$36,358</h4>

     
        </div>
      
      </div>
    
    </div>      
    </div>
    </div>
    <div class="col-md-6 col-lg-3 mb-4">
    <div class="card " style={{background:"#00335B"}}>
      <div className="row align-items-center p-4">
      <div className="col-8">
        <h5 className="card-title mb-9 fw-semibold"
         style={{color:"white"}}
         >
          Yearly Breakup
        </h5>
        <div className="d-flex align-items-center mb-3">
        <h4 className="fw-semibold mb-3"style={{color:"rgb(247, 174, 21)"}}>$36,358</h4>

     
        </div>
      
      </div>
    
    </div>      
    </div>
    </div>
  </div>



    


  
 




        <div className="row">
        <div className="col-6 mb-3 mx-auto">
  <div className="card w-100">
    <QRCode
      size={200}
      style={{ height: "auto", maxWidth: "100%", width: "50%" }}
      value="hai"
      viewBox={`0 0 256 256`}
    />
  </div>
</div>

          <div className="col-lg-6 d-flex align-items-stretch">
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
        <div className="row mt-3">
    <div class="col-md-6 col-lg-3 mb-4">
    <div class="card " style={{background:"#00335B"}}>
      <div className="row align-items-center  p-4">
      <div className="col-8">
        <h5 className="card-title mb-9 fw-semibold"
         style={{color:"white"}}
         >
          Yearly Breakup
        </h5>
        <div className="d-flex align-items-center mb-3">
        <h4 className="fw-semibold mb-3"style={{color:"rgb(247, 174, 21)"}}>$36,358</h4>

     
        </div>
      
      </div>
    
    </div>      
    </div>
    </div>
    <div class="col-md-6 col-lg-3 mb-4">
    <div class="card " style={{background:"#00335B"}}>
      <div className="row align-items-center  p-4">
      <div className="col-8">
        <h5 className="card-title mb-9 fw-semibold"
         style={{color:"white"}}
         >
          Yearly Breakup
        </h5>
        <div className="d-flex align-items-center mb-3">
        <h4 className="fw-semibold mb-3"style={{color:"rgb(247, 174, 21)"}}>$36,358</h4>

     
        </div>
      
      </div>
    
    </div>      
    </div>
    </div>
    <div class="col-md-6 col-lg-3 mb-4">
    <div class="card " style={{background:"#00335B"}}>
      <div className="row align-items-center  p-4">
      <div className="col-8">
        <h5 className="card-title mb-9 fw-semibold"
         style={{color:"white"}}
         >
          Yearly Breakup
        </h5>
        <div className="d-flex align-items-center mb-3">
        <h4 className="fw-semibold mb-3"style={{color:"rgb(247, 174, 21)"}}>$36,358</h4>

     
        </div>
      
      </div>
    
    </div>      
    </div>
    </div>
    <div class="col-md-6 col-lg-3 mb-4">
    <div class="card " style={{background:"#00335B"}}>
      <div className="row align-items-center p-4">
      <div className="col-8">
        <h5 className="card-title mb-9 fw-semibold"
         style={{color:"white"}}
         >
          Yearly Breakup
        </h5>
        <div className="d-flex align-items-center mb-3">
        <h4 className="fw-semibold mb-3"style={{color:"rgb(247, 174, 21)"}}>$36,358</h4>

     
        </div>
      
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
