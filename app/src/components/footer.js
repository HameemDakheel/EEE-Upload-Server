import React from "react";

export default function Footer() {
  return (
    <>
      {/*Footer*/}
      <footer
        className='
    page-footer
    mt-2
    text-center text-md-left
    bg-white
    rounded-5
    mb-5
  '
      >
        {/*Footer Links*/}

        {/*Copyright*/}
        <div
          className='footer-copyright text-center mb-1  py-4 wow fadeIn'
          data-wow-delay='0.3s'
        >
          <div className='row container-fluid lobster-font'>
            <div className=' col-12 col-md-8'>
              <i className='far fa-copyright' />
              &nbsp;{`${new Date().getFullYear()}`} Copyright: Designed By&nbsp;
              <a className href='https://hameemdakheel.herokuapp.com/'>
                Hameem Dakheel
              </a>
            </div>
            <div className='col-12 col-md-4'>
              <ul className='list-unstyled d-flex justify-content-center mb-0 '>
                <li>
                  <p className='ps-2 ms-2 my-auto'>Find me on:</p>
                </li>
                <li>
                  <a
                    href='https://github.com/HameemDakheel/'
                    className='ps-1 ms-1 my-auto fa-lg fb-ic text-black'
                    title='github'
                  >
                    <i className='fab fa-github f' />
                  </a>
                </li>
                <li>
                  <a
                    href='https://twitter.com/HameemDkl'
                    className='ps-1 ms-1 my-auto fa-lg tw-ic'
                    title='twitter'
                  >
                    <i className='fab fa-twitter' />
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.linkedin.com/in/hameem-dakheel/'
                    className='ps-1 ms-1 my-auto fa-lg li-ic text-black'
                    title='linkedin'
                  >
                    <i className='fab fa-linkedin-in' />
                  </a>
                </li>
              </ul>
            </div>{" "}
          </div>
        </div>
        {/*/Copyright*/}
      </footer>
      {/*/Footer*/}
    </>
  );
}
