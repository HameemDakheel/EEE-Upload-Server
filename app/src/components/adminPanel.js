import React from "react";
import { useParams,Redirect } from "react-router-dom";
import AdminTable from "./tables/adminTable";

export default function AdminPanel(props) {
  const { username } = useParams();
  const { loggedIn, user } = props;
  if (loggedIn && user.username === username && user.privileges === "admin" ) {
    return (
      <>
        <AdminTable />
      </>
    );
  } else {
    return <Redirect to="/"></Redirect>
  }
}
