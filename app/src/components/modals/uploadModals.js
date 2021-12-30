import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBProgress,
  MDBProgressBar,
  MDBInput,
} from "mdb-react-ui-kit";
import { useAlert } from "react-alert";

export default function UploadModal({ query, username }) {
  const [uploadModal, setUploadModal] = useState(false);
  const [ActiveTab, setActiveTab] = useState("tab1");
  const [present, setPresent] = useState("0");
  const [Files, setFiles] = useState([]);
  const Alert = useAlert();

  const handleTabClick = (value) => {
    if (value === ActiveTab) {
      return;
    }

    setActiveTab(value);
  };

  const toggleShow = () => setUploadModal(!uploadModal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    var formData = new FormData();

    for (let j = 0; j < Files.length; j++) {
      formData.append(`file${j}`, Files[j]);
    }

    var url = `http://192.168.0.10/upload/${username}?path=${
      query.get("path") || "/"
    }`;
    console.log(Files.length, form);
    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", url);
    ajax.setRequestHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    ajax.send(formData);

    function progressHandler(event) {
      setPresent(`${Math.round((event.loaded / event.total) * 100)}`);
    }

    function completeHandler(event) {
      setPresent("0");
      Alert.success("Upload Complete");
    }

    function errorHandler(event) {
      Alert.error("Upload Failed");
    }

    function abortHandler(event) {
      Alert.info("Upload Aborted");
    }
  };

  return (
    <>
      <MDBBtn onClick={toggleShow}>Upload Files</MDBBtn>
      <MDBModal
        show={uploadModal}
        getOpenState={(e) => setUploadModal(e)}
        tabIndex='-1'
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalBody>
              <MDBTabs pills justify className='mb-3'>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleTabClick("tab1")}
                    active={ActiveTab === "tab1"}
                  >
                    Single Upload
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleTabClick("tab2")}
                    active={ActiveTab === "tab2"}
                  >
                    Multiple Uploads
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
              <MDBTabsContent>
                <MDBTabsPane show={ActiveTab === "tab1"}>
                  <form onSubmit={handleSubmit}>
                    <p class='note note-danger'>
                      <strong>NOTE: </strong>{" "}
                      {`Please Make Sure Your are in The Right Folder: '/${username}${
                        query.get("path") || "/"
                      }'`}
                    </p>

                    <MDBInput
                      block
                      className='mt-3 '
                      type='file'
                      required
                      onChange={(e) => {
                        setFiles(e.target.files);
                      }}
                    />
                    <MDBProgress height='20' className='mt-3 rounded-2'>
                      <MDBProgressBar
                        striped
                        animated
                        width={present}
                        valuemin={0}
                        valuemax={100}
                      >
                        {present === "0" ? "" : present + " %"}
                      </MDBProgressBar>
                    </MDBProgress>
                    <hr />
                    <MDBBtn
                      type='submit'
                      className='mt-3  btn-block'
                      color='primary'
                    >
                      Upload
                    </MDBBtn>
                  </form>
                </MDBTabsPane>
                <MDBTabsPane show={ActiveTab === "tab2"}>
                  <form onSubmit={handleSubmit}>
                    <p class='note note-danger'>
                      <strong>NOTE: </strong>{" "}
                      {`Please Make Sure Your are in The Right Folder: '/${username}${
                        query.get("path") || "/"
                      }'`}
                    </p>
                    <MDBInput
                      className='mt-3 '
                      type='file'
                      multiple={true}
                      required
                      onChange={(e) => {
                        setFiles(e.target.files);
                      }}
                    />
                    <MDBProgress height='20' className='mt-3 rounded-2'>
                      <MDBProgressBar
                        striped
                        animated
                        width={present}
                        valuemin={0}
                        valuemax={100}
                      >
                        {present === "0" ? "" : present + " %"}
                      </MDBProgressBar>
                    </MDBProgress>
                    <hr />
                    <MDBBtn
                      type='submit'
                      block
                      className='mt-1'
                      color='primary'
                    >
                      Upload
                    </MDBBtn>
                  </form>
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
