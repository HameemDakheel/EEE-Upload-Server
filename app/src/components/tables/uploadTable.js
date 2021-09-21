import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation} from "react-router-dom";
import { MDBInput } from "mdb-react-ui-kit";
import Axios from "axios";
import Path from "path";
import Loading from '../loading'
import UploadModal from '../modals/uploadModals'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function UploadTable({username}) {
  const query = useQuery();
  const [dirTree, setDirTree] = useState([]);
  const [loading, setLoading] = useState("true");
  const [path, setPath] = useState(
    query.get("path") ? `/Compressed${query.get("path")}` : "/Compressed"
  );
  console.log(path, "pathhhhh", query.get("path"));


  useEffect(() => {
    setPath(
      query.get("path") ? `/Compressed${query.get("path")}` : "/Compressed"
    );
  }, [query]);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8080/dir-tree?path=${path || "/"}`
        );
        setDirTree(response.data);
        setLoading("false");
        console.log();
      } catch (error) {
        // alert("Some thing went wrong please refresh the page");
        console.error(error);
      }
    };
    makeRequest();
  }, [path]);
   const search = () => {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("Table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  return (
    <section className="mb-4 mt-2">
      <div className="card">
        <div className="card-header text-center py-3">
          <h5 className="mb-0 text-center d-flex">
            <div
              className="
              d-flex
              align-items-center
              me-auto
              ms-auto ms-sm-0
              mt-2 mt-sm-0
            "
            >
              <MDBInput
                id="search-input"
                type="search"
                label="Search"
                onChange={search}
              />
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
              <UploadModal query= {query} username={username}/>
            </div>
          </h5>
        </div>
        <div className="card-body pt-0">
          {loading === "true" ? (
            <Loading />
          ) : (
            <div className="table-responsive">
              <table
                id="Table"
                className="table table-hover text-nowrap table-sm table-auto"
              >
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
                    <th scope="col" colSpan={1}>
                       Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dirTree.map((content, index) => {
                    if (content.type === "director") {
                      content.size = "-";
                    } else if (content.size >= 1024 * 1024 * 1024) {
                      content.size =
                        Math.floor(content.size / (1024 * 1024 * 1024)) + " GB";
                    } else if (content.size >= 1024 * 1024) {
                      content.size =
                        Math.floor(content.size / (1024 * 1024)) + " MB";
                    } else {
                      content.size = Math.floor(content.size / 1024) + " KB";
                    }
                    let date = new Date(content.atimeMs);
                    return (
                      <tr key={index}>
                        <td colSpan={2}>
                          <div className=" text-start">
                            {/* <input
                              className="form-check-input"
                              type="checkbox"
                              onClick={handelCheckbox}
                              value={content.name}
                              id="flexCheckDefault"
                            /> */}
                            {Path.extname(content.name) ? (
                              <a
                                href={`http://localhost:8080/download?file=${
                                  path || "/"
                                }${content.name}`}
                                className="ms-2 text-default text-start"
                                download
                              >
                                {content.name}
                              </a>
                            ) : (
                              <Link
                                to={`/?path=${path || "/"}${content.name}/`}
                                className="ms-2 text-default text-start"
                              >
                                {content.name}
                              </Link>
                            )}
                          </div>
                        </td>
                        <td>{content.size}</td>
                        <td colSpan={2}>
                          <p className="mb-0">{`${date.toLocaleString()}`}</p>
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
                            className="btn mx-2 btn-success btn-sm mt-2 mt-md-0 px-2"
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
          )}
        </div>
      </div>
    </section>

  );
}
