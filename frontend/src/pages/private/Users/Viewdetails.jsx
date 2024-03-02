import React, { useEffect, useState } from 'react'
import { SlideMotion } from '../../../libs/FramerMotion'
import { useLocation, useNavigate } from 'react-router-dom';
import { Show_Toast } from '../../../utils/Toast';
import { edituserUrl } from '../../../utils/Constants';
import { ApiCall } from '../../../Services/Api';

function Viewdetails() {
  const navigate =useNavigate()
  const location = useLocation();
  const { data } = location.state || {};
  const [password, setPassword] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [editUser,setEditUser]=useState({})
  const [update,setUpdate]=useState({})
  console.log('update :', data);

  console.log('editUser :', editUser);

  
  console.log('Received data:', );

  ///----------update user details--------

  const updateUser = async () => {
    // const messageDiv = document.getElementById("msg");

    if (
      typeof password?.confirmpassword === "string" &&
      typeof editUser?.password === "string" &&
      password?.confirmpassword.trim() !== editUser?.password.trim()
    ) {
      // messageDiv.innerHTML = "Password and confirm password do not match";
      Show_Toast("Password and confirm password do not match", false);
      return;
    }

    try {
      // setIsLoading(true)
      const res = await ApiCall("post",`${edituserUrl}/${editUser._id}`, editUser);
      console.log(res,"res")
      if (res?.status === 200) {
        Show_Toast("Successfully updated password", true);
        // setIsLoading(false)

        // navigate("/dashboard");
      } else {
        console.log("Invalid user");
      }
    } catch (error) {
      Show_Toast(error, false);
    }
  };
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  useEffect(()=>{
if(data){
  setEditUser(data)
}
  },[data])
  return (
    <>
    
<SlideMotion>
 <div className="container-fluid">
 <button className='mt-3'
      onClick={() => {
        navigate('/member')
      }}
      style={{
        backgroundColor: '#00335B',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Icon */}
      <i className="fas fa-arrow-left " style={{ marginRight: '5px' }} />

    </button>
  <div className='row mt-2'>
    <div className='col-lg-6 col-md-12'>
    <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
          <div className="row">
            <div className="">
              <div className="card shadow-none border">
                <div className="card-body">
                  <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
      <img src="../../dist/images/profile/user-7.jpg" className="rounded-circle" width={100} height={100} alt />
      </a>
      <div className='row mt-3'>
        <div className='col-3'>
        {data?.userStatus === "readyToApprove" ? (
                              <span className="badge bg-danger rounded-3 fw-semibold">
                                Ready to Approve
                              </span>
                            ) : data?.userStatus === "pending" ? (
                              <span className="badge bg-primary rounded-3 fw-semibold">
                                Pending
                              </span>
                            ) : (
                              <span className="badge bg-success rounded-3 fw-semibold">
                                Approved
                              </span>
                            )}
        </div>
   
      </div>
  
      <div className="mt-4">
  <h5 className="fs-5 mb-0 fw-semibold" style={{ textTransform: 'uppercase' }}>
    Name: <span style={{ color: 'rgb(247, 174, 21)' }}>{data?.name || '--'}</span>
  </h5>
</div>

<ul className="list-unstyled mt-3">
  <li className="d-flex align-items-center gap-3 mb-4">
    <i className="fas fa-map-marker-alt text-dark fs-6" />
    <h6 className="fs-4 fw-semibold mb-0">Address: <span style={{ color: 'rgb(247, 174, 21)' }}>{data?.address || "--"}</span></h6>
  </li>

  <li className="d-flex align-items-center gap-3 mb-4">
    <i className="fas fa-envelope text-dark fs-6" />
    <h6 className="fs-4 fw-semibold mb-0">Email: <span style={{ color: 'rgb(247, 174, 21)' }}>{data?.email || "--"}</span></h6>
  </li>

  <li className="d-flex align-items-center gap-3 mb-4">
    <i className="fas fa-phone text-dark fs-6" />
    <h6 className="fs-4 fw-semibold mb-0">Phone: <span style={{ color: 'rgb(247, 174, 21)' }}>{data?.phone || "--"}</span></h6>
  </li>

  <li className="d-flex align-items-center gap-3 mb-4">
    <i className="fas fa-user text-dark fs-6" />
    <h6 className="fs-4 fw-semibold mb-0">Sponsor Name: <span style={{ color: 'rgb(247, 174, 21)' }}>{data?.sponserName || "--"}</span></h6>
  </li>

  <li className="d-flex align-items-center gap-3 mb-4">
    <i className="fas fa-store text-dark fs-6" />
    <h6 className="fs-4 fw-semibold mb-0">Franchise Type: <span style={{ color: 'rgb(247, 174, 21)' }}>{data?.franchise || "--"}</span></h6>
  </li>

  <li className="d-flex align-items-center gap-3 mb-4">
    <i className="fas fa-building text-dark fs-6" />
    <h6 className="fs-4 fw-semibold mb-0">Franchise Name: <span style={{ color: 'rgb(247, 174, 21)' }}>{data?.franchiseName || "--"}</span></h6>
  </li>

 
</ul>

                </div>
              </div>
           
            </div>
         
          </div>
        </div>
     
      </div>    </div>
    <div className='col-lg-6 col-md-12'>
    <div className="card">
  <div className="card-body">
  <h5 className="card-title fw-semibold mb-4" style={{ color: 'rgba(247, 174, 21)' }}>Edit Details</h5>
    <div className="card">
      <div className="card-body">
      <form onSubmit={(e) => {
  e.preventDefault(); 
  updateUser();
}}>        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name </label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            value={editUser?.name}
            onChange={(e) =>
              setEditUser({
                ...editUser,
                name: e.target.value,
              })
            }
             />
          </div>
          <div className="mb-3">
  <label htmlFor="exampleTextarea" className="form-label">Address</label>
  <textarea className="form-control" id="exampleTextarea" rows="3" 
   value={editUser?.address}
   onChange={(e) =>
     setEditUser({
       ...editUser,
       address: e.target.value,
     })
   }
  ></textarea>
</div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
            <label
                      htmlFor="transactionPassword"
                      className="form-label"
                      onClick={handlePasswordToggle}
                    >
                      {showPassword ? (
                        <i className="fas fa-eye-slash"></i>
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}{" "}
                    </label>
            <input                    type={showPassword ? "text" : "password"}
 className="form-control" id="exampleInputPassword1"
            placeholder='**********'
            onChange={(e) => {
              setPassword({
                ...password,
                confirmpassword: e.target.value,
              });
              // clearMessageDiv();
            }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
            <label
                      htmlFor="transactionPassword"
                      className="form-label"
                      onClick={handlePasswordToggle}
                    >
                      {showPassword ? (
                        <i className="fas fa-eye-slash"></i>
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}{" "}
                    </label>
            <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" 
             placeholder='**********'
                onChange={(e) =>
              setEditUser({
                ...password,
                password: e.target.value,
              })
            }
             />
          </div>
       
          <button type="submit" className="btn btn-custom">Update </button>
        </form>
      </div>
    </div>
    
  </div>
</div>    </div>
  </div>
</div>
</SlideMotion>





      
    

      

    </>
  )
}

export default Viewdetails