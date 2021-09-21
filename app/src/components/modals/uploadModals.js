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
  MDBInput
} from "mdb-react-ui-kit";
import $ from "jquery";

export default function UploadModal({query, username}) {
  const [uploadModal, setUploadModal] = useState(false);
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const toggleShow = () => setUploadModal(!uploadModal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target ;
    var formData = new FormData();
    formData.append("file",form[0].files[0])


      // for (let i = 0; i < form.elements.length; i++) {
      //   if (form.elements[i].type === "file") {
      //     for(let j = 0; j < form.elements[i].files.length; j++) {
      //       formdata.append(`file${j}`, form.elements[i].files[j]);
      //     }
      //   } else {
      //     formdata.append(form.elements[i].name, form.elements[i].value);
      //   }
      // }

    var url = `/upload/${username}?path=${query.get('path')}}`
    console.log(formData, form);
    // var ajax = new XMLHttpRequest();
    // ajax.upload.addEventListener("progress", progressHandler, false);
    // ajax.addEventListener("load", completeHandler, false);
    // ajax.addEventListener("error", errorHandler, false);
    // ajax.addEventListener("abort", abortHandler, false);
    // ajax.open("POST", url);
    // ajax.send(formdata);

  function progressHandler(event) {
    var percent = Math.round((event.loaded / event.total) * 100);
    $(".progress-bar").css("width", percent + "%");
  }

  function completeHandler(event) {
    $(".progress-bar").css("width", 0 + "%");
    alert("Upload Complete")
  }

  function errorHandler(event) {
    alert("Upload Failed");
  }

  function abortHandler(event) {
    alert("Upload Aborted");
  }
  }

  return (
    <>
      <MDBBtn onClick={toggleShow}>Upload Files</MDBBtn>
      <MDBModal
        show={uploadModal}
        getOpenState={(e) => setUploadModal(e)}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalBody>
              <MDBTabs pills justify className="mb-3">
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleJustifyClick("tab1")}
                    active={justifyActive === "tab1"}
                  >
                    Single Upload
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleJustifyClick("tab2")}
                    active={justifyActive === "tab2"}
                  >
                    Multiple Uploads
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
              <MDBTabsContent>
                <MDBTabsPane show={justifyActive === "tab1"}>
                  <form onSubmit={handleSubmit}>
                  <p class="note note-danger">
                    <strong>Please Make Sure Your in The Right Folder:</strong>{" "}
                    {`Uploading path '/${username}${query.get("path")}'`}
                  </p>

                  <MDBInput block className="mt-3 " type="file" />
                  <MDBProgress height="20" className="mt-3 rounded-2">
                    <MDBProgressBar
                      striped
                      animated
                      width="25"
                      valuemin={0}
                      valuemax={100}
                    >
                      25%
                    </MDBProgressBar>
                  </MDBProgress>
                  <hr />
                  <MDBBtn type="submit" block className="mt-3 " color="primary">
                    Upload
                  </MDBBtn>
                  </form>
                </MDBTabsPane>
                <MDBTabsPane show={justifyActive === "tab2"}>
                  <form onsubmit={handleSubmit}>
                    <p class="note note-danger">
                      <strong>
                        Please Make Sure Your in The Right Folder:
                      </strong>{" "}
                      {`Uploading path '/${username}${query.get("path")}'`}
                    </p>
                    <MDBInput
                      block
                      className="mt-3 "
                      type="file"
                      multiple={true}
                    />
                    <MDBProgress height="20" className="mt-3 rounded-2">
                      <MDBProgressBar
                        striped
                        animated
                        valuemin={0}
                        valuemax={100}
                      >

                      </MDBProgressBar>
                    </MDBProgress>
                    <hr />
                    <MDBBtn type="submit" block className="mt-1"color="primary">
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
