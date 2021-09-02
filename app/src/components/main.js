import React from 'react';
import Breadcrumb from './breadcrumb';
import LoginModal from './modals/login-modal';
import Table from "./table";

export default function main() {
	return (
    <>
      <Breadcrumb />
      <LoginModal />
      {/* Table */}
      <section className="mb-4 mt-2">
        <div className="card">
          <div className="card-header text-center py-3">
            <h5 className="mb-0 text-center d-flex">
              <div className="input-group">
                <div
                  className="
              d-flex
              align-items-center
              me-auto
              ms-auto ms-sm-0
              mt-2 mt-sm-0
            "
                >
                  <div className="form-outline">
                    <input
                      id="search-input"
                      type="search"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="search-input">
                      Search
                    </label>
                  </div>
                  <button
                    id="search-button"
                    type="button"
                    className="btn btn-success"
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
                <div
                  className="
              d-flex
              align-items-center
              mx-auto
              ms-sm-auto
              me-sm-0
              mt-2 mt-sm-0
            "
                >
                  <button
                    type="button"
                    className="btn btn-danger shadow-4-primary me-3"
                  >
                    Download All
                  </button>
                </div>
              </div>
            </h5>
          </div>
          <div className="card-body pt-0">
			<Table/>
		  </div>
        </div>
      </section>
      {/* /Table */}
    </>
  );
}
