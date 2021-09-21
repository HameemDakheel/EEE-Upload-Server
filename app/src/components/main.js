import React from "react";
import { useParams,useLocation } from "react-router-dom";
import Breadcrumb from "./breadcrumb";
import DownloadTable from "./tables/downloadTable";
import UploadTable from "./tables/uploadTable";

export default function Main(props) {
 const { username } = useParams();
 const location = useLocation();
  if (location.pathname === "/") {
    console.log(location);
    return (
      <>
        <Breadcrumb />
        <DownloadTable />
      </>
    );
  }
  const {loggedIn, user }= props;
  console.log(props,username);
  if (loggedIn && (user.username===username)) {
    return (
      <>
        <Breadcrumb username={username} />
        <UploadTable username={username} />
      </>
    );
  }else{
    return (<h1>what the hell</h1>)
  }

}
