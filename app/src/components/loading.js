import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

export default function Loading() {
  return (
    <div>
      <div className="d-flex justify-content-center mt-4">
        <MDBSpinner color="primary" role="status" className=" d-block">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
        <div className=" d-flex justify-content-center mt-2 text-primary">{"   "}Loading...</div>
    </div>
  );
}
