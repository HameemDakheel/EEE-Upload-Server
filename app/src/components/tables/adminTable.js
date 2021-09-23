import React, { useState, useEffect } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import Axios from "axios";
import { useAlert } from "react-alert";
import Loading from "../loading";
import RegisterModal from "../modals/registerModal";
import UpdateModal from "../modals/updateModal";

export default function AdminTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState("true");
  const token = localStorage.getItem("token");
  const Alert = useAlert();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await Axios.post(
          `http://localhost:8080/user/get-users`,
          { token }
        );
        setUsers(response.data.data);
        setLoading("false");
      } catch (error) {
        Alert.error("Some thing went wrong please refresh the page");
        console.error(error);
      }
    };
    makeRequest();
  }, [token,Alert]);
  const search = () => {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("Table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };
  const handelDelete = async (username) => {
    try {
      const response = await Axios.post("http://localhost:8080/user/delete/" , {
        token: localStorage.getItem("token"),
        username
      });
      if (!response.data.error) {
        Alert.success(username + " has been deleted successfully.");
        setUsers([]);
      }
    } catch (error) {
      Alert.error(username + " has not been deleted");
    }
  };
  const Table = ({ users }) => {
    console.log(users);
    if (users) {
      return (
        <div className="table-responsive">
          <table
            id="Table"
            className="table table-hover text-nowrap table-sm table-auto"
          >
            <thead>
              <tr>
                <th>Username</th>
                <th>Default Path</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                console.log(user);
                return (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.path}</td>
                    <td>
                      <button
                        type="button"
                        className="btn mx-2 btn-danger btn-sm px-2"
                        onClick={()=>{
                          handelDelete(user.username);
                        }}
                      >
                        <i className="fas fa-lg fa-trash-alt" />
                      </button>
                      <UpdateModal username={user.username} path={user.path} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="w-100 my-4 mx-3 text-center">
          There is no users try add some
        </div>
      );
    }
  };
  return (
    <section className="mb-4 mt-4">
      <div className="card">
        <div className="card-header text-center py-3">
          <h5 className="mb-0 text-center d-flex">
            <div
              className="
              d-flex
              align-items-center
              me-auto
              ms-auto ms-sm-0
              mt-2 mt-sm-0
            "
            >
              <MDBInput
                id="search-input"
                type="search"
                label="Search"
                onChange={search}
              />
            </div>
            <div
              className="
              d-flex
              align-items-center
              mx-auto
              ms-sm-auto
              me-sm-0
              mt-2 mt-sm-0"
            >
              <RegisterModal />
            </div>
          </h5>
        </div>
        <div className="card-body pt-2">
          {loading === "true" ? (
            <Loading />
          ) : (
            <Table users={users} />
            //    <div className="table-responsive">
            //     <table
            //       id="Table"
            //       className="table table-hover text-nowrap table-sm table-auto"
            //     >
            // <thead>
            //   <tr>
            //     <th>Username</th>
            //     <th>Default Path</th>
            //     <th>Actions</th>
            //   </tr>
            // </thead>
            //       <tbody>
            //         {users.map((user, index) => {
            //           console.log(user);
            //           return (
            //             <>

            //               <tr key={index} >
            //                 <td>{user.username}</td>

            //                 <td>{user.path}</td>
            //                 <td>
            //                   <button
            //                     type="button"
            //                     className="btn mx-2 btn-danger btn-sm px-2"
            //                     onclick={handelDelete}
            //                   >
            //                     <i className="fas fa-lg fa-trash-alt" />
            //                   </button>
            //                   <UpdateModal username={user.username} path={user.path}/>
            //                 </td>
            //               </tr>
            //             </>
            //           );
            //         })}
            //       </tbody>
            //     </table>
            // </div>
          )}
        </div>
      </div>
    </section>
  );
}
