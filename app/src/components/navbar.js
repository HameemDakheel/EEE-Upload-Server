import React from 'react'

export default function Navbar() {
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
                <a className="nav-link fs-4 text-break">
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
            <button
              type="button"
              className="btn btn-primary shadow-4-primary me-3"
              data-mdb-toggle="modal"
              data-mdb-target="#exampleModal"
              role="button"
            >
              Login
            </button>
          </div>
        </div>
      </nav>
      {/* Navbar */}
    </>
  );
}
