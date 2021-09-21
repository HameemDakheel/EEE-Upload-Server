import React from "react";
import {
  MDBBtn,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import { Link,useHistory } from "react-router-dom";
import LoginModal from "./modals/loginModal";
export default function Navbar({ loggedIn, setLoggedIn,user }) {
console.log(user);
const history = useHistory()
  function BtnGroup() {
    const logOut = () => {
      localStorage.removeItem("token");
      setLoggedIn(false);
      history.push("/")
    };
    return (
      <>
        <MDBDropdown className="mx-2">
          <MDBDropdownToggle>Go To</MDBDropdownToggle>
          <MDBDropdownMenu className="mt-1">
            <li>
              <Link className="dropdown-item" to="/">
                Home Page
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to={`/users/${user.username}?path=/`}>
                Upload Page
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                Admin Panel
              </Link>
            </li>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBBtn className="mx-2" color="danger" onClick={logOut}>
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
            <a
              className="navbar-brand me-2 ms-md-auto"
              href="https://mdbgo.com/"
            >
              <img
                src="/logo.png"
                alt="logo"
                loading="lazy"
                style={{ marginTop: "-1px" }}
                height={58}
              />
            </a>
            <ul className="navbar-nav me-auto mb-md-2 mb-lg-0 me">
              <li className="nav-item">
                <a href="/" className="nav-link fs-4 text-break">
                  Electrical Engineering Digital Library
                </a>
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
            <div className="form-check form-switch me-3">
              <input
                className="form-check-input mt-1"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Dark Theme
              </label>
            </div>
            {loggedIn ? <BtnGroup /> : <LoginModal setLoggedIn={setLoggedIn}/>}
          </div>
        </div>
      </nav>
      {/* Navbar */}
    </>
  );
}
