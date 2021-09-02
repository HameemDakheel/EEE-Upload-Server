import React from 'react'

export default function loginModal() {
	return (
    <>
      {/* modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-scrollable">
          <div className="modal-content">
            {/* winter is coming
			 <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button
          type="button"
          class="btn-close"
          data-mdb-dismiss="modal"
          aria-label="Close"
        ></button>
      </div> */}
            <div className="modal-body">
              <div className="p-5">
                <div className="text-center">
                  <h4 className="text-dark mb-4">Welcome Back!</h4>
                  <form>
                    {/* Email input */}
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form1Example1"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form1Example1">
                        Email address
                      </label>
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form1Example2"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form1Example2">
                        Password
                      </label>
                    </div>
                    {/* 2 column grid layout for inline styling */}
                    <div className="row mb-4">
                      <div className="col">
                        {/* Simple link */}
                        <a href="#!">Forgot password?</a>
                      </div>
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
              {/* <div class="modal-footer">
        </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* /modal */}
    </>
  );
}
