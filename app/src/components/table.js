import React from 'react'

export default function table() {
	return (
		<>
			        <div className="table-responsive">
          <table className="table table-hover text-nowrap table-sm table-auto">
            <thead>
              <tr className="table-active">
                <th scope="col" colSpan={2} />
                <th scope="col" colSpan={1}>
                  Size
                </th>
                <th scope="col" colSpan={2}>
                  Date
                </th>
                <th scope="col" colSpan={1}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row" colSpan={2}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="flexCheckDefault"
                    />
                    <a href="#" className="ml-5 text-default">
                      some file some file{" "}
                    </a>
                  </div>
                </td>
                <td>Amet</td>
                <td colSpan={2}>
                  <p>Amet some Lorem ipsum dolor sit</p>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn mx-2 btn-danger btn-sm px-2"
                  >
                    <i className="fas fa-lg fa-trash-alt" />
                  </button>
                  <button
                    type="button"
                    className="btn mx-2 btn-success btn-sm mt-2 px-2"
                  >
                    <i className="fas fa-lg fa-edit" />
                  </button>
                </td>
              </tr>
              <tr>
                <td scope="row" colSpan={2}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="flexCheckDefault"
                    />
                    <a href="#" className="ml-5 text-default">
                      some file{" "}
                    </a>
                  </div>
                </td>
                <td>Elit</td>
                <td colSpan={2} className="text-over">
                  Elit
                </td>
                <td>
                  <button
                    type="button"
                    className="btn mx-2 btn-danger btn-sm px-2"
                  >
                    <i className="fas fa-lg fa-trash-alt" />
                  </button>
                  <button
                    type="button"
                    className="btn mx-2 btn-success mt-2 btn-sm px-2"
                  >
                    <i className="fas fa-lg fa-edit" />
                  </button>
                </td>
              </tr>
              <tr>
                <td scope="row" colSpan={2}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="flexCheckDefault"
                    />
                    <a href="#" className="ml-5 text-default">
                      some file{" "}
                    </a>
                  </div>
                </td>
                {/* <td>Hic</td> */}
                <td>Fugiat</td>
                <td colSpan={2}>Fugiat</td>
                <td>
                  <button
                    type="button"
                    className="btn mx-2 btn-danger btn-sm px-2"
                  >
                    <i className="fas fa-lg fa-trash-alt" />
                  </button>
                  <button
                    type="button"
                    className="btn mx-2 btn-success mt-2 btn-sm px-2"
                  >
                    <i className="fas fa-lg fa-edit" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
		</>
	)
}
