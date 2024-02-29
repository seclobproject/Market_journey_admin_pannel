import React, { useContext, useState } from 'react'
import { ApiCall } from '../../Services/Api';
import { update_PasswordURL } from '../../utils/Constants';
import { Link, useNavigate } from 'react-router-dom';
import { SlideMotion } from '../../libs/FramerMotion';
import { Button, Form } from 'react-bootstrap';
import { ContextData } from '../../Services/Context';
import { Show_Toast } from '../../utils/Toast';

function Resetpassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState({});
    const { Check_Validation } = useContext(ContextData);
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmPassword, setShowConfirmpassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
      setShowConfirmpassword(!showconfirmPassword);
    };
  
    const clearMessageDiv = () => {
      const messageDiv = document.getElementById("msg");
      if (messageDiv) {
        messageDiv.innerHTML = "";
      }
    };
  
    const updatePassword = async () => {
      const messageDiv = document.getElementById("msg");
  
      if (
        typeof password?.password === "string" &&
        typeof formData?.newPassword === "string" &&
        password?.password.trim() !== formData?.newPassword.trim()
      ) {
        messageDiv.innerHTML = "Password and confirm password do not match";
        Show_Toast("Password and confirm password do not match", false);
        return;
      }
  
      try {
        setIsLoading(true)
        const res = await ApiCall("post", update_PasswordURL, formData);
        if (res?.status === 200) {
          Show_Toast("Successfully updated password", true);
          setIsLoading(false)
  
          navigate("/dashboard");
        } else {
          console.log("Invalid user");
        }
      } catch (error) {
        Show_Toast(error, false);
      }
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
      Check_Validation(e, updatePassword, setValidated);
    };
  return (
<>
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <div
          className="position-relative overflow-hidden  min-vh-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#2a3547" }}
        >
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-6 col-xxl-3">
                <SlideMotion>
                  <div className="card mb-0">
                    <div className="card-body">
                    <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                    <img src="public/dist/images/marketlogo.png" alt="Logo" width="130" height="90" />
</a>

                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleLogin}
                      >
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
Username                          </label>
                          <input
                            //   value={formData?.username}
                            type="email"
                            required

                            placeholder="Enter Username"

                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              });
                              clearMessageDiv();
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter the Username
                          </Form.Control.Feedback>
                        </div>
                      
                        <div className="mb-3">
                          <label className="form-label">New Password</label>
                          <div className="input-group auth-pass-inputgroup">
                            <input
                              className="form-control"
                              placeholder="Enter new password"
                              aria-label="Password"
                              aria-describedby="password-addon"
                              required
                              value={formData?.password}
                              type={showPassword ? "text" : "password"}
                              onChange={(e) => {
                                setPassword({
                                  ...password,
                                  password: e.target.value,
                                });
                                clearMessageDiv();
                              }}
                            />
                            <button
                              className="btn btn-light "
                              type="button"
                              id="password-addon"
                              onClick={handlePasswordToggle}
                            >
                              {showPassword ? (
                                <i className="fa-solid fa-eye-slash"></i>
                              ) : (
                                <i className="fa-sharp fa-solid fa-eye"></i>
                              )}
                            </button>
                            <Form.Control.Feedback type="invalid">
                              Please enter the password
                            </Form.Control.Feedback>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">
                            {" "}
                            Confirm New Password
                          </label>
                          <div className="input-group auth-pass-inputgroup">
                            <input
                              className="form-control"
                              placeholder="Enter new password"
                              aria-label="Password"
                              aria-describedby="password-addon"
                              required
                              value={formData?.newPassword}
                              type={showPassword ? "text" : "password"}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  newPassword: e.target.value,
                                });
                                clearMessageDiv();
                              }}
                            />
                            <button
                              className="btn btn-light "
                              type="button"
                              id="password-addon"
                              onClick={handlePasswordToggle}
                            >
                              {showPassword ? (
                                <i className="fa-solid fa-eye-slash"></i>
                              ) : (
                                <i className="fa-sharp fa-solid fa-eye"></i>
                              )}
                            </button>
                            <Form.Control.Feedback type="invalid">
                              Please enter the password
                            </Form.Control.Feedback>
                          </div>
                        </div>

                        <div id="msg" style={{ color: "red" }}></div>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                          <div className="form-check"></div>
                          {/* <Link
                            className="fw-medium"
                            style={{ color: "#926c15", fontSize: "15px" }} // Change the color property to red
                            to={"/"}
                          >
                            Have a account?.Login
                          </Link> */}
                        </div>
                        <div className="row">
  <div className="col-md-6 mb-4">
    <Button
      className={'btn btn-cancel w-100 py-8 rounded-2'}
      type="submit"
      onClick={() => {
       
        navigate('/dashboard'); 
      }}   
    >
        Cancel
     
    </Button>
  </div>
  <div className="col-md-6 mb-4">
  <Button
      className={`btn btn-custom w-100 py-8 rounded-2 ${isLoading ? 'loading' : ''}`}
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? 'Updating...' : 'Save'}
    </Button>  </div>
</div>

                      </Form>
                    </div>
                  </div>
                </SlideMotion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>  )
}

export default Resetpassword