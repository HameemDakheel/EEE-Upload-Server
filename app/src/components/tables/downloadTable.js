import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MDBInput } from "mdb-react-ui-kit";
import Axios from "axios";
import Path from "path";
import Loading from "../loading";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Table() {
  const query = useQuery();
  const [dirTree, setDirTree] = useState([]);
  const [loading, setLoading] = useState("true");
  const [path, setPath] = useState(query.get("path") ? query.get("path") : "/");
  let options = useRef([]);
  const [data, setData] = useState(
    JSON.stringify({
      path: path,
      names: options.current,
    })
  );

  useEffect(() => {
    setPath(query.get("path"));
  }, [query]);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8080/dir-tree?path=${path || "/"}`
        );
        setDirTree(response.data);
        setLoading("false");
      } catch (error) {
        // alert("Some thing went wrong please refresh the page");
        console.error(error);
      }
    };
    makeRequest();
  }, [path]);
  const handelCheckbox = (e) => {
    if (e.target.checked) {
      options.current.push(e.target.value);
    } else {
      options.current = options.current.filter(
        (value) => !(value === e.target.value)
      );
    }
    setData(
      JSON.stringify({
        path: path,
        names: options.current,
      })
    );
  };
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
  let parentPath = path || "/";
  if (parentPath !== "/") {
    parentPath = parentPath.split("/");
    parentPath.pop();
    parentPath.shift();
    parentPath.pop();
    parentPath = parentPath.join("/") ? "/" + parentPath.join("/") + "/" : "/";
  }
  return (
    <section className="mb-4 mt-2">
      <div className="card">
        <div className="card-header text-center py-3 px-2 px-sm-3">
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
              ms-2
              mx-auto
              ms-sm-auto
              me-sm-0
              mt-2 mt-sm-0
            "
            >
              <a
                href={`http://localhost:8080/download-all?data=${data}`}
                type="submit"
                className="btn btn-danger shadow-4-primary me-sm-3"
                download
              >
                Download All
              </a>
            </div>
          </h5>
        </div>
        <div className="card-body pt-0">
          <div className="table-responsive">
            <table
              id="Table"
              className="table table-hover text-nowrap table-sm table-auto mb-0"
            >
              {loading === "true" ? null : (
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
                  </tr>
                </thead>
              )}
              {loading === "true" ? (
                <Loading />
              ) : (
                <tbody>
                  <tr key={0}>
                    <td colSpan={2}>
                      <div className="form-check text-start">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                        />
                        {}
                        <Link
                          to={`/?path=${parentPath}`}
                          className="ms-2 text-default text-start"
                        >
                          ..
                        </Link>
                      </div>
                    </td>
                    <td> - </td>
                    <td colSpan={2}>
                      <p> - </p>
                    </td>
                  </tr>
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
                      <tr key={index + 1}>
                        <td colSpan={2}>
                          <div className="form-check text-start">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onClick={handelCheckbox}
                              value={content.name}
                              id="flexCheckDefault"
                            />
                            {Path.extname(content.name) ? (
                              <a
                                href={`http://localhost:8080/download?path=${
                                  path || "/"
                                }&filename=${content.name}`}
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
                          <p>{`${date.toLocaleString()}`}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
