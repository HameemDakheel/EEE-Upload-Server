import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBInput,
} from "mdb-react-ui-kit";
import Axios from "axios";
import { useAlert } from "react-alert";
export default function RegisterModal() {
  const [registerModal, setRegisterModal] = useState(false);
  const toggleShow = () => setRegisterModal(!registerModal);
  const [formValue, setFormValue] = useState({
    username: "",
    path: "",
    password: "",
  });
  const token = localStorage.getItem("token");
  const Alert = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: formValue.username,
      password: formValue.password,
      path: formValue.path,
      token,
    };
    try {
      const response = await Axios.post(
        "http://192.168.0.10/user/register",
        data
      );
      if (!response.data.error) {
        Alert.success("user has been registered");
      }
    } catch (error) {
      console.log(error);
      Alert.error("Something went wrong");
    }
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <>
      <MDBBtn onClick={toggleShow}>Add User</MDBBtn>
      {/* modal */}
      <MDBModal
        show={registerModal}
        getOpenState={(e) => setRegisterModal(e)}
        tabIndex='-1'
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalBody>
              <div className='p-5'>
                <div className='text-center'>
                  <form onSubmit={handleSubmit} id='form1'>
                    {/* Email input */}
                    <MDBInput
                      id='username'
                      name='username'
                      label='Username'
                      type='text'
                      required
                      className='mb-4'
                      validation='Looks good!'
                      value={formValue.username}
                      onChange={onChange}
                    />
                    {/* Password input */}
                    <MDBInput
                      id='password'
                      name='password'
                      label='Password'
                      type='password'
                      required
                      className='mb-4'
                      validation='Looks good!'
                      value={formValue.password}
                      onChange={onChange}
                    />
                    <MDBInput
                      label='Path'
                      id='path'
                      name='path'
                      type='text'
                      className='mb-4'
                      required
                      value={formValue.path}
                      onChange={onChange}
                    />
                    {/* Submit button */}
                    <button type='submit' className='btn btn-primary btn-block'>
                      Add User
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
