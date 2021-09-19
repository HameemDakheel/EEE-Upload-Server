import React from 'react'

export default function UploadTable(props) {
	const contents = props.contents
	return (
    <div>
      <div className="table-responsive">
        <table className="table table-hover text-nowrap table-sm table-auto">
          <thead>
            <tr className="table-active">
              <th scope="col" colSpan={2}>
                name
              </th>
              <th scope="col" colSpan={1}>
                Size
              </th>
              <th scope="col" colSpan={2}>
                Date
              </th>
              {/* <th scope="col" colSpan={1}>
                  Actions
                </th> */}
            </tr>
          </thead>
          <tbody>
            {contents.map((content) => {
              if (content.type === "director") {
                content.size = "-";
              } else if (content.size >= 1024 * 1024 * 1024) {
                content.size =
                  Math.floor(content.size / (1024 * 1024 * 1024)) + " GB";
              } else if (content.size >= 1024 * 1024) {
                content.size = Math.floor(content.size / (1024 * 1024)) + " MB";
              } else {
                content.size = Math.floor(content.size / 1024) + " KB";
              }
              let date = new Date(content.atimeMs);
              console.log(date);
              return (
                <tr>
                  <td colSpan={2}>
                    <div className="form-check text-start">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue={content.name}
                        id="flexCheckDefault"
                      />
                      <a href="#" className="ms-2 text-default text-start">
                        {content.name}
                      </a>
                    </div>
                  </td>
                  <td>{content.size}</td>
                  <td colSpan={2}>
                    <p>{`${date.toLocaleString()}`}</p>
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
