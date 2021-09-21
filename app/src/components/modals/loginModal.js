import React, { useState} from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useHistory } from "react-router-dom";
import Axios from "axios";
export default function LoginModal({ setLoggedIn }) {
  const [loginModal, setLoginModal] = useState(false);
  const toggleShow = () => setLoginModal(!loginModal);
  const [formValue, setFormValue] = useState({ username: "", password: "" });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    try {
      const response = await Axios.post(
        "http://localhost:8080/user/login",
        data
      );
      if (response.data.token && !response.data.error) {
        localStorage.setItem("token", response.data.token);
        setLoggedIn(true);
        history.push(`/users/${response.data.username}?path=/`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <>
      <MDBBtn onClick={toggleShow}>Login</MDBBtn>
      {/* modal */}
      <MDBModal
        show={loginModal}
        getOpenState={(e) => setLoginModal(e)}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalBody>
              <div className="p-5">
                <div className="text-center">
                  <h4 className="text-dark mb-4">Welcome Back!</h4>
                  <form onSubmit={handleSubmit} id="form1">
                    {/* Email input */}
                    <MDBInput
                      id="username"
                      name="username"
                      label="Username"
                      type="text"
                      required
                      className="mb-4"
                      validation="Looks good!"
                      value={formValue.username}
                      onChange={onChange}
                    />
                    {/* Password input */}
                    <MDBInput
                      label="Password"
                      id="Password"
                      name="password"
                      type="password"
                      className="mb-4"
                      required
                      value={formValue.password}
                      onChange={onChange}
                    />
                    {/* 2 column grid layout for inline styling */}
                    <div className="row mb-4">
                      <div className="col">
                        {/* Simple link */}
                        <a
                          href="#"
                          onClick={() =>
                            alert("Please contact your Adminterator!")
                          }
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {/* /modal */}
    </>
  );
}
