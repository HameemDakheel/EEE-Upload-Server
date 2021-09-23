import React from "react";
import {
  MDBBtn,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import { Link, useHistory } from "react-router-dom";
import LoginModal from "./modals/loginModal";
export default function Navbar({ loggedIn, setLoggedIn, user }) {
  console.log(user);
  const history = useHistory();
  function BtnGroup() {
    const logOut = () => {
      localStorage.removeItem("token");
      setLoggedIn(false);
      history.push("/");
    };
    return (
      <>
        <MDBDropdown className="mx-2">
          <MDBDropdownToggle className="btn-lg ">Go To</MDBDropdownToggle>
          <MDBDropdownMenu className="mt-1">
            <li>
              <Link className="dropdown-item" to="/">
                Home Page
              </Link>
            </li>
            {loggedIn ? (
              <>
                <li>
                  <Link
                    className="dropdown-item"
                    to={`/users/${user.username}?path=/`}
                  >
                    Upload Page
                  </Link>
                </li>
                {user.privileges === "admin" ? (
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"/admin-panel/" + user.username}
                    >
                      Admin Panel
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBBtn className="mx-2 btn-lg" color="danger" onClick={logOut}>
          Logout
        </MDBBtn>
      </>
    );
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-5 mt-4">
        {/* Container wrapper */}
        <div className="container py-md-0">
          <div className="d-flex mx-auto ms-lg-0">
            {/* Navbar brand */}
            <Link
              className="navbar-brand me-2 ms-md-auto"
              to="/"
            >
              <img
                src="/logo.png"
                alt="logo"
                loading="lazy"
                style={{ marginTop: "-1px" }}
                height={58}
              />
            </Link>
            <ul className="navbar-nav me-auto mb-md-2 mb-lg-0 me">
              <li className="nav-item">
                <Link to="/" className="nav-link fs-2 text-break lobster-font ">
                  Electrical Engineering Digital Library
                </Link>
              </li>
            </ul>
          </div>
          {/* Left links */}
          <div
            className="
        d-flex
        align-items-center
        mx-auto mx-lg-0
        justify-content-center
      "
          >
            {loggedIn ? <BtnGroup /> : <LoginModal setLoggedIn={setLoggedIn} />}
          </div>
        </div>
      </nav>
      {/* Navbar */}
    </>
  );
}
