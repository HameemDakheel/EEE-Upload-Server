import React from "react";
import { useParams, Redirect } from "react-router-dom";
import Breadcrumb from "./breadcrumb";
import UploadTable from "./tables/uploadTable";

export default function UserPanel(props) {
  const { username } = useParams();
  const { loggedIn, user } = props;
if (loggedIn && user.username === username) {
    return (
      <>
        <Breadcrumb username={username} />
        <UploadTable username={username} />
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
}
