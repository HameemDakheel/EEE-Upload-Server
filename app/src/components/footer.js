import React from 'react'

export default function Footer() {
	return (
    <>
      {/*Footer*/}
      <footer
        className="
    page-footer
    pt-md-3 pt-2
    mt-2
    text-center text-md-left
    bg-white
    rounded-5
    mb-5
  "
      >
        {/*Footer Links*/}
        <div className="container wow fadeIn" data-wow-delay="0.3s">
          {/*First row*/}
          <div className="row mt-1 mb-1">
            {/*Grid column*/}
            <div className="col-lg-6 text-center">
              <p className="m-0">
                This project Designed &amp; made by
                <a className href>
                  Hameem Dakheel
                </a>
              </p>
            </div>
            {/*Grid column*/}
            <div className="col-lg-6">
              <ul className="list-unstyled d-flex justify-content-center mb-0">
                <li>
                  <p className="ps-2 ms-2 my-auto">Find me on:</p>
                </li>
                <li>
                  <a
                    href="https://github.com/"
                    className="ps-1 ms-1 my-auto fa-lg fb-ic text-black"
                  >
                    <i className="fab fa-github f" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/"
                    className="ps-1 ms-1 my-auto fa-lg tw-ic"
                    title="twitter"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/"
                    className="ps-1 ms-1 my-auto fa-lg li-ic"
                  >
                    <i className="fab fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>
            {/*/Grid column*/}
          </div>
          {/*/First row*/}
        </div>
        {/*/Footer Links*/}
        <hr className="border-5 w-75 my-md-3 my-2 mx-auto" />
        {/*Copyright*/}
        <div
          className="footer-copyright text-center mb-1 pb-md-3 pb-2 wow fadeIn"
          data-wow-delay="0.3s"
        >
          <div className="container-fluid">
            This website is licensed under MIT Licenses to see
            <a href> Source Code </a>
          </div>
        </div>
        {/*/Copyright*/}
      </footer>
      {/*/Footer*/}
    </>
  );
}
