import React, { useState } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBInput,
} from "mdb-react-ui-kit";
import Axios from "axios";
import { useAlert } from "react-alert";
export default function UpdateModal({ username, path }) {
  const [updateModal, setUpdateModal] = useState(false);
  const toggleShow = () => setUpdateModal(!updateModal);
  const [formValue, setFormValue] = useState({
    username,
    path,
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
      const response = await Axios.post("http://192.168.0.10/user/edit", data);
      if (!response.data.error) {
        Alert.success("user has been updated");
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
      <button
        type='button'
        className='btn mx-2 btn-success btn-sm px-2 mt-md-0 mt-2'
        onClick={toggleShow}
      >
        <i className='fas fa-lg fa-edit' />
      </button>
      {/* modal */}
      <MDBModal
        show={updateModal}
        getOpenState={(e) => setUpdateModal(e)}
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
                      Update User
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
