import React, { useContext, useState } from "react";
import { ContextData } from "../../Services/Context";
import { Button, Form } from "react-bootstrap";
import { ApiCall } from "../../Services/Api";
import { login_PageURL } from "../../utils/Constants";
import { Link, useNavigate } from "react-router-dom";
import { Show_Toast } from "../../utils/Toast";
import { SlideMotion } from "../../libs/FramerMotion";

function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const { Check_Validation, setIsLoggedIn, getToken,loginFun } = useContext(ContextData);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const Login = async () => {
    try {
      let res = await ApiCall("post", login_PageURL, formData);
      console.log(res, "res,res");
      if (res.status === 200) {
        setIsLoggedIn(true);

        localStorage.setItem("User", res?.data?.access_token);
        navigate("/dashboard");
        loginFun()

        Show_Toast("Login Successfull", true);
      } else {
        console.log("invalid user");
      }
    } catch (error) {
      Show_Toast(error, false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    Check_Validation(e, Login, setValidated);
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
                      <a
                        href="./index.html"
                        className="text-nowrap logo-img text-center d-block py-3 w-100"
                      >
                        <h2 className="align-item-center">MJ</h2>
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
Username                         
 </label>
                          <input
                            value={formData?.username}
                            type="email"
                            required
                            placeholder="Enter Username"

                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                username: e.target.value,
                              })
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter the username
                          </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <div className="input-group auth-pass-inputgroup">
                            <input
                              className="form-control"
                              placeholder="Enter password"
                              aria-label="Password"
                              aria-describedby="password-addon"
                              required
                              value={formData?.password}
                              type={showPassword ? "text" : "password"}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  password: e.target.value,
                                })
                              }
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
                          <Link
                            className="fw-medium mb-3"
                            style={{ color: "#926c15", fontSize: "15px" }} // Change the color property to red
                            to={"/forgotpassword"}
                          >
                            Forgot password?
                          </Link>
                        </div>

                        <Button
                          className="btn btn-custom w-100 py-8 mb-4 rounded-2"
                          type="submit"
                        >
                          login
                        </Button>
                      </Form>
                    </div>
                  </div>
                </SlideMotion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
