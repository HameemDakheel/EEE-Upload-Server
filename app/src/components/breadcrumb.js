import React from 'react'

export default function Breadcrumb() {
	return (
    <>
      {/* breadcrumb */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-5 mt-4">
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Library</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <a href="#">Data</a>
              </li>
            </ol>
          </nav>
        </div>
      </nav>
      {/* /breadcrumb */}
    </>
  );
}
